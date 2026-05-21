import { redis } from "./client";

export async function getCached<T>(key: string): Promise<T | null> {
  const raw = await redis.get(key);
  if (raw === null || raw === undefined) return null;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }
  return raw as T;
}

export async function setCached<T>(
  key: string,
  value: T,
  ttlSeconds: number,
): Promise<void> {
  await redis.setex(key, ttlSeconds, JSON.stringify(value));
}

export async function deleteCached(key: string): Promise<void> {
  await redis.del(key);
}

// ── Namespaced helpers ────────────────────────────────────────────────────────

/** Cache plans data from the backend (or constants) — short TTL so updates propagate. */
export const PLANS_CACHE_KEY = "web:plans";
export const PLANS_CACHE_TTL = 300; // 5 minutes

/** Cache sitemap data — longer TTL since it changes infrequently. */
export const SITEMAP_CACHE_KEY = "web:sitemap";
export const SITEMAP_CACHE_TTL = 3600; // 1 hour
