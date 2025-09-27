import type { Request, Response, NextFunction } from "express";
import { getRedis } from "../lib/redis";

export function rateLimit({ windowSec = 2, limit = 30 }: { windowSec?: number; limit?: number }) {
  const redis = getRedis();
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const ip = (req.headers["x-forwarded-for"] as string) ?? req.socket.remoteAddress ?? "unknown";
      const key = `ratelimit:${ip}`;
      const count = await (redis as any).incr(key);
      if (count === 1) {
        await (redis as any).expire(key, windowSec);
      }
      if (count > limit) {
        return res.status(429).json({ 
          error: "rate_limited", 
          message: `Too many requests. Limit: ${limit}/${windowSec}s`,
          retryAfter: windowSec 
        });
      }
      next();
    } catch (error) {
      console.error("Rate limit error:", error);
      // If Redis fails, allow the request but log the error
      next();
    }
  };
}

// Specialized rate limiter for chat commands
export function chatRateLimit() {
  return rateLimit({ windowSec: 5, limit: 10 }); // Max 10 commands per 5 seconds per IP
}

// Specialized rate limiter for API endpoints
export function apiRateLimit() {
  return rateLimit({ windowSec: 60, limit: 100 }); // Max 100 requests per minute per IP
}


