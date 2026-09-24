# web/ — API Routes Reference (exact behaviour)

> Line-level truth for every public API route + the supporting lib modules.
> Everything here was verified by reading source during the 2026-09-24 review.

---

## 1. `/api/track` (POST) — page-visit analytics — `src/app/api/track/route.ts`

**Purpose:** one Supabase row per page view, with privacy-safe IP handling.

Flow:
1. `if (!isSupabaseConfigured())` → **503** `{error:"Database tracking not configured"}`.
2. Parse JSON (bad JSON → **400**).
3. Validate required: `visitor_id` (non-empty string), `session_id`
   (non-empty string), `path` (non-empty string). Missing → **400**.
4. **IP extraction:** `x-real-ip` → `x-forwarded-for` first value → `0.0.0.0`.
5. **IP hashing (IS-007):** `hashIp(ip)`:
   - salt = `process.env.IP_HASH_SALT`; if unset **or** ip === `"0.0.0.0"` → returns
     `null` → the `ip` column is **dropped** (fails safe).
   - else `sha256(salt:ip)`, hex, truncated to 32 chars.
6. **Rate limit:** `checkRateLimit(ip, "track", 60, 60)` — 60 req/min/IP.
   Exceeded → **429**.
7. Insert into `page_visits` with sanitization:
   - `visitor_id`/`session_id`: `[^\w-]` strip, ≤256 chars.
   - `path`: trim ≤2048; UTM/gclid/braid/gad_source/referrer: string?→trim
     + cap (1024 / referrer 2048); `user_agent` ≤2048.
   - DB error → **500** `{error:"Failed to write tracking log"}`.
8. Success → **201** `{success:true}`.

**Security notes:** rate-limited (was previously unlimited — IS-007); salted
hash of IP is the *only* personal identifier stored; never the raw IP.

---

## 2. `/api/contact` (POST) — contact form — `src/app/api/contact/route.ts`

**Purpose:** validate message → save to Supabase `contacts` **and/or** deliver
to webhook; send feedback to user.

Flow:
1. **IP extraction** (same as track) for rate limiting only.
2. **Rate limit:** 5/IP per 600s window; on block → **429** with headers
   `X-RateLimit-Limit:5`, `X-RateLimit-Remaining:0`, `Retry-After`.
3. JSON parse (bad → **400**).
4. `validateBody()`:
   - `name` ≥2 chars; `email` regex `^[^\s@]+@[^\s@]+\.[^\s@]+$` (trim +
     lowercase); `subject` must be in `VALID_SUBJECTS`
     (`General support|Billing / refund|Privacy request|Enterprise
     inquiry|Bug report|Other`); `message` ≥10 and ≤5000 chars.
   - Any failure → **400** with the specific message.
5. **Attribution:** reads UTM/gclid/gbraid/wbraid/gad_source/referrer from the
   body; each trimmed + capped (1024 / referrer 2048); null if not a string.
6. **Supabase write** (only when configured): insert into `contacts` with
   name/email/subject/message + visitor_id/session_id (each capped 256).
   DB failure is **logged, not fatal** (`dbSaved=false`).
7. **Webhook delivery** `deliverContactMessage()`:
   - If `CONTACT_WEBHOOK_URL` missing → returns 503
     "Contact delivery is not configured. Please email support@intractify.com."
   - POSTs JSON `{...contact, source:"intractify-contact-form",
     receivedAt:ISO}` — **submitter IP deliberately NOT forwarded** (IS-007;
     privacy policy doesn't disclose it to third parties).
   - Non-2xx or network error → 502 generic message.
8. If **both** DB and webhook failed → error with delivered status.
   Otherwise → **201** `{success:true}` + `X-RateLimit-Remaining`.

---

## 3. `/api/waitlist` (POST) — waitlist registration — `src/app/api/waitlist/route.ts`

Flow:
1. IP extraction (rate limit only).
2. **Rate limit:** 3/IP per 300s window; block → **429** with same header
   pattern (limit 3).
3. `if (!isSupabaseConfigured())` → **503** "Waitlist registration is not
   configured yet."
4. JSON parse (bad → **400**).
5. `validateBody()`: `email` regex; `plan` must be in
   `["free","starter","pro","enterprise"]` (invalid → **400**).
6. Insert into `waitlist` with email (lowercased), plan, visitor_id/session_id
   (≤256 each).
   - `error.code === "23505"` (duplicate) → **409** "already been registered".
   - other error → **500** generic (raw Supabase message is **not** leaked).
7. Success → **201** + `X-RateLimit-Output`.

---

## 4. `/api/md` (GET) — markdown renderer for AI crawlers — `src/app/api/md/route.ts`

**Purpose:** serve any allowlisted page as clean markdown (Accept:
text/markdown) — SSRF-safe (IS-007).

1. Read `path` query param (default `/`).
2. **Allowlist:** `MARKDOWN_PAGES` (/, privacy, terms, refund, data-deletion,
   contact). Not in set → **400** `{error:"Invalid path target"}`.
3. **Dynamic fetch** (with 5s `AbortSignal.timeout`): build
   `new URL(path, BASE_URL)` → fetch HTML `Accept:text/html`.
   - On success: `htmlToMarkdown()` via **Turndown** service:
     - extracts `<main>…</main>` (fallback `<body>`),
     - custom absoluteLinks rule (relative → `https://intractify.com${href}`),
     - strips `script, style, svg, iframe, noscript, head`,
     - normalizes newlines.
   - On any error: logs, falls back to **static pre-rendered** markdown in
     `PAGE_MARKDOWN` (curated, honest copy for every allowlisted page).
4. Response:
   - `Content-Type: text/markdown; charset=utf-8`
   - `x-markdown-tokens: ceil(len/4)`
   - `x-markdown-dynamic: true|false`
   - `Cache-Control: public, max-age=3600, stale-while-revalidate=86400`
   - `Vary: Accept`

**SSRF history (IS-007):** old check rejected paths containing a dot, which
stopped dotted hostnames but not single-label ones — `?path=//localhost:6379/`
resolved through `new URL()` to a different host, was fetched server-side, and
returned. Now a hard allowlist instead of a parser.

---

## 5. Rate limiting — `src/lib/redis/rate-limit.ts`

`checkRateLimit(identifier, namespace, limit, windowSec, opts)`:

- `failOpen` default **false** → fails **closed**.
- `redis` from `getRedis()`; missing → logs + returns denied/permitted per
  `failOpen`.
- Key: `ratelimit:<namespace>:<identifier>`.
- **Atomic creation (IS-007):** `redis.set(key, 0, {nx:true, ex:windowSec})`
  then `incr`. If `created` was false, belt-and-braces: check TTL; if negative,
  `expire`. Then read TTL.
- Returns `{allowed: count <= limit, remaining: max(0, limit-count),
  resetInSeconds: ttl>0 ? ttl : windowSec}`.
- Any exception → logs + returns per `failOpen`.

### Per-endpoint config matrix

| Endpoint | limit | window | failOpen |
|----------|-------|--------|----------|
| `/api/track` | 60 | 60 s | default false |
| `/api/contact` | 5 | 600 s | default false |
| `/api/waitlist` | 3 | 300 s | default false |

---

## 6. Redis client — `src/lib/redis/client.ts`

```ts
getRedis(): url && token from UPSTASH_REDIS_REST_URL/TOKEN
  → new Redis({url, token})   or   null
```

No env → null → rate limiter denies (fail closed).

---

## 7. Supabase client — `src/lib/supabase.ts`

- Server-only guard: `throw` if `typeof window !== "undefined"` (holds
  service-role key).
- Uses **`SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`**; placeholders keep
  `next build` green; **every caller gates on `isSupabaseConfigured()`**.
- Client created with `persistSession:false, autoRefreshToken:false`.
- History: previously used anon key (`NEXT_PUBLIC_*`), which by RLS-perm design
  allowed anonymous writes → anyone with the public key could bypass
  validation/rate limits (IS-007). Now with service-role, **RLS should deny
  anon insert/select** on `contacts`, `waitlist`, `page_visits`.

---

## 8. Tracking contract (client → server)

`UTMTracker.tsx` (client, in layout body):
- Reads tracking URL params: `utm_source/medium/campaign/term/content`,
  `gclid`, `gbraid`, `wbraid`, `gad_source`.
- Records external referrer only (hostname !== self).
- Persists `intractify_visitor_id` (localStorage, `v_...`),
  `intractify_session_id` (sessionStorage, `s_...`),
  `intractify_attribution` (localStorage JSON — merged new params over old).
- Fires fire-and-forget `POST /api/track` with visitor_id, session_id, path,
  referrer, + attribution.
- All wrapped in try/catch so tracking can never break the page.

`ContactForm.tsx` + `PricingSection.tsx` read the same storage keys before
submitting `/api/contact` / `/api/waitlist`.

---

## 9. Response-code summary

| Code | Meaning (cross-route) |
|------|------------------------|
| 201 | success (all three POSTs) |
| 400 | invalid body / validation / bad path (md) |
| 409 | duplicate waitlist email |
| 429 | rate limited (with Retry-After) |
| 500 | DB write failure / generic |
| 502 | webhook delivery failed |
| 503 | feature not configured (track/contact/waitlist) |