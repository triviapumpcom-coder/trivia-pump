import { getRedis } from "../lib/redis";

// Use Redis for persistent round state across dyno restarts
export async function setCurrentRoundId(id: string): Promise<void> {
  const redis = getRedis();
  const roundStartTs = Date.now();
  await (redis as any).set("current:round:id", id);
  await (redis as any).set("current:round:start", roundStartTs.toString());
}

export async function getCurrentRoundId(): Promise<string | null> {
  const redis = getRedis();
  return await (redis as any).get("current:round:id");
}

export async function getRoundStartTs(): Promise<number | null> {
  const redis = getRedis();
  const ts = await (redis as any).get("current:round:start");
  return ts ? parseInt(ts) : null;
}

// Fallback for sync calls (deprecated)
let _fallbackRoundId: string | null = null;
let _fallbackStartTs: number | null = null;

export function setCurrentRoundIdSync(id: string): void {
  _fallbackRoundId = id;
  _fallbackStartTs = Date.now();
  // Also update Redis async
  setCurrentRoundId(id).catch(console.error);
}

export function getCurrentRoundIdSync(): string | null {
  return _fallbackRoundId;
}

export function getRoundStartTsSync(): number | null {
  return _fallbackStartTs;
}


