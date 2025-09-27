import Redis from "ioredis";

type Primitive = string | number;

class MemoryRedis {
  private maps = new Map<string, Map<string, string>>();
  private sets = new Map<string, Set<string>>();
  private kv = new Map<string, { value: string; expiresAt?: number }>();
  private zsets = new Map<string, Map<string, number>>();
  private lists = new Map<string, string[]>();

  private cleanupNow(): void {
    const now = Date.now();
    let cleaned = 0;
    for (const [k, v] of this.kv) {
      if (v.expiresAt && v.expiresAt <= now) {
        this.kv.delete(k);
        cleaned++;
      }
    }
    // Aggressive cleanup if memory usage is high
    if (this.kv.size > 10000) {
      console.warn(`[MemoryRedis] High memory usage: ${this.kv.size} keys, cleaned ${cleaned} expired keys`);
      this.aggressiveCleanup();
    }
  }

  private aggressiveCleanup(): void {
    // Clean up old lists (keep only last 100 items)
    for (const [key, list] of this.lists) {
      if (list.length > 100) {
        this.lists.set(key, list.slice(0, 100));
      }
    }
    
    // Clean up old zsets (keep only top 1000 scores)
    for (const [key, zset] of this.zsets) {
      if (zset.size > 1000) {
        const sorted = Array.from(zset.entries()).sort((a, b) => b[1] - a[1]);
        const newZset = new Map(sorted.slice(0, 1000));
        this.zsets.set(key, newZset);
      }
    }
  }

  async hset(key: string, field: string, value: Primitive): Promise<number> {
    let m = this.maps.get(key);
    if (!m) {
      m = new Map();
      this.maps.set(key, m);
    }
    const existed = m.has(field);
    m.set(field, String(value));
    return existed ? 0 : 1;
  }
  async hget(key: string, field: string): Promise<string | null> {
    const m = this.maps.get(key);
    return m?.get(field) ?? null;
  }
  async hgetall(key: string): Promise<Record<string, string>> {
    const m = this.maps.get(key);
    const obj: Record<string, string> = {};
    if (!m) return obj;
    for (const [f, v] of m.entries()) obj[f] = v;
    return obj;
  }
  
  async hmset(key: string, obj: Record<string, Primitive>): Promise<"OK"> {
    let m = this.maps.get(key);
    if (!m) {
      m = new Map();
      this.maps.set(key, m);
    }
    for (const [field, value] of Object.entries(obj)) {
      m.set(field, String(value));
    }
    return "OK";
  }
  async sadd(key: string, member: string): Promise<number> {
    let s = this.sets.get(key);
    if (!s) {
      s = new Set();
      this.sets.set(key, s);
    }
    const sizeBefore = s.size;
    s.add(member);
    return s.size > sizeBefore ? 1 : 0;
  }
  async sismember(key: string, member: string): Promise<number> {
    const s = this.sets.get(key);
    return s?.has(member) ? 1 : 0;
  }
  async smembers(key: string): Promise<string[]> {
    const s = this.sets.get(key);
    return s ? Array.from(s) : [];
  }
  async setex(key: string, ttlSec: number, value: Primitive): Promise<"OK"> {
    this.kv.set(key, { value: String(value), expiresAt: Date.now() + ttlSec * 1000 });
    return "OK";
  }
  async incr(key: string): Promise<number> {
    this.cleanupNow();
    const current = this.kv.get(key)?.value ?? "0";
    const next = Number(current) + 1;
    const expiresAt = this.kv.get(key)?.expiresAt;
    this.kv.set(key, { value: String(next), expiresAt });
    return next;
  }
  async expire(key: string, ttlSec: number): Promise<number> {
    const entry = this.kv.get(key);
    if (!entry) return 0;
    this.kv.set(key, { value: entry.value, expiresAt: Date.now() + ttlSec * 1000 });
    return 1;
  }
  async get(key: string): Promise<string | null> {
    this.cleanupNow();
    const entry = this.kv.get(key);
    if (!entry) return null;
    if (entry.expiresAt && entry.expiresAt <= Date.now()) {
      this.kv.delete(key);
      return null;
    }
    return entry.value;
  }
  
  async set(key: string, value: Primitive): Promise<"OK"> {
    this.kv.set(key, { value: String(value) });
    return "OK";
  }
  
  async exists(key: string): Promise<number> {
    this.cleanupNow();
    return this.kv.has(key) ? 1 : 0;
  }
  async del(key: string): Promise<number> {
    const had = this.kv.delete(key) ? 1 : 0;
    this.maps.delete(key);
    this.sets.delete(key);
    this.zsets.delete(key);
    this.lists.delete(key);
    return had;
  }
  async zadd(key: string, score: number, member: string): Promise<number> {
    let z = this.zsets.get(key);
    if (!z) {
      z = new Map();
      this.zsets.set(key, z);
    }
    const existed = z.has(member);
    z.set(member, score);
    return existed ? 0 : 1;
  }
  
  async zincrby(key: string, inc: number, member: string): Promise<string> {
    let z = this.zsets.get(key);
    if (!z) {
      z = new Map();
      this.zsets.set(key, z);
    }
    const next = (z.get(member) ?? 0) + inc;
    z.set(member, next);
    return String(next);
  }
  async zrevrange(key: string, start: number, stop: number, withScores?: "WITHSCORES"): Promise<string[]> {
    const z = this.zsets.get(key) ?? new Map();
    const arr = Array.from(z.entries()).sort((a, b) => b[1] - a[1]);
    const slice = arr.slice(start, stop + 1);
    if (withScores === "WITHSCORES") {
      return slice.flatMap(([m, s]) => [m, String(s)]);
    }
    return slice.map(([m]) => m);
  }

  async zscore(key: string, member: string): Promise<string | null> {
    const z = this.zsets.get(key);
    if (!z) return null;
    const val = z.get(member);
    return typeof val === "number" ? String(val) : null;
  }

  // List operations
  async lpush(key: string, ...values: string[]): Promise<number> {
    let list = this.lists.get(key);
    if (!list) {
      list = [];
      this.lists.set(key, list);
    }
    list.unshift(...values);
    return list.length;
  }

  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    const list = this.lists.get(key) || [];
    if (stop === -1) stop = list.length - 1;
    return list.slice(start, stop + 1);
  }

  async ltrim(key: string, start: number, stop: number): Promise<"OK"> {
    const list = this.lists.get(key);
    if (list) {
      if (stop === -1) stop = list.length - 1;
      const trimmed = list.slice(start, stop + 1);
      this.lists.set(key, trimmed);
    }
    return "OK";
  }
}

let redis: Redis | MemoryRedis | null = null;

export function getRedis(): Redis | MemoryRedis {
  if (redis) return redis;
  const url = process.env.REDIS_URL;
  if (url) {
    redis = new Redis(url, { lazyConnect: false, maxRetriesPerRequest: 2 });
  } else {
    // eslint-disable-next-line no-console
    console.warn("[api] REDIS_URL not set; using in-memory Redis fallback (non-persistent)");
    redis = new MemoryRedis();
  }
  return redis;
}


