import { getRedis } from "./client";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Fixed-window rate limiter using Redis INCR + EXPIRE.
 *
 * @param identifier - unique key (e.g. IP address or email)
 * @param namespace  - key prefix to scope by feature (e.g. "contact")
 * @param limit      - max requests per window
 * @param windowSec  - window size in seconds
 */
export async function checkRateLimit(
  identifier: string,
  namespace: string,
  limit = 5,
  windowSec = 60,
): Promise<RateLimitResult> {
  const redis = getRedis();
  if (!redis) {
    return {
      allowed: true,
      remaining: limit,
      resetInSeconds: windowSec,
    };
  }

  const key = `ratelimit:${namespace}:${identifier}`;

  // INCR is atomic — safe under concurrent requests
  const count = await redis.incr(key);

  // Set TTL only on first increment so the window is anchored to the first request
  if (count === 1) {
    await redis.expire(key, windowSec);
  }

  const ttl = await redis.ttl(key);

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    resetInSeconds: ttl > 0 ? ttl : windowSec,
  };
}
