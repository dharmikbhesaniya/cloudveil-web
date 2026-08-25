import { getRedis } from "./client";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Fixed-window rate limiter.
 *
 * Two defects fixed here (see docs/Tickets/issues/IS-007):
 *
 * 1. It was not atomic. `INCR` followed by a separate `EXPIRE` leaves a key with
 *    no TTL if the process dies between them — blocking that identifier
 *    permanently. The TTL is now set in the same round trip that creates the key.
 *
 * 2. It failed open on every error, including "Redis not configured", so an
 *    outage silently disabled all rate limiting. `failOpen` is now an explicit
 *    per-call decision.
 */
export async function checkRateLimit(
  identifier: string,
  namespace: string,
  limit = 5,
  windowSec = 60,
  opts: { failOpen?: boolean } = {},
): Promise<RateLimitResult> {
  const failOpen = opts.failOpen ?? false;
  const denied = { allowed: false, remaining: 0, resetInSeconds: windowSec };
  const permitted = { allowed: true, remaining: limit, resetInSeconds: windowSec };

  const redis = getRedis();
  if (!redis) {
    console.error(`[rate-limit] Redis not configured — ${namespace} ${failOpen ? "ALLOWED" : "DENIED"}`);
    return failOpen ? permitted : denied;
  }

  const key = `ratelimit:${namespace}:${identifier}`;

  try {
    // SET NX EX creates the key *with* its TTL in one operation. If it already
    // exists this is a no-op and INCR simply advances the existing window, so
    // there is no moment where the key can exist without an expiry.
    const created = await redis.set(key, 0, { nx: true, ex: windowSec });
    const count = await redis.incr(key);

    // Belt and braces: if the key somehow predates this logic and carries no
    // TTL, give it one rather than leaving it to block forever.
    if (!created) {
      const ttl = await redis.ttl(key);
      if (ttl < 0) await redis.expire(key, windowSec);
    }

    const ttl = await redis.ttl(key);
    return {
      allowed: count <= limit,
      remaining: Math.max(0, limit - count),
      resetInSeconds: ttl > 0 ? ttl : windowSec,
    };
  } catch (error) {
    console.error(`[rate-limit] Redis error on ${namespace} — ${failOpen ? "ALLOWED" : "DENIED"}:`, error);
    return failOpen ? permitted : denied;
  }
}
