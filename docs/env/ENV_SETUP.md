# Environment Setup — `web/.env` (current state & actions needed)

> Companion to `docs/reviews/WEB_FULL_REVIEW.md`. Documents every variable the
> `web/` submodule reads, the current local state, and what to set for prod.

**File:** `web/.env` (gitignored — 1.5 KB)
**Reference template:** `web/.env.example`

---

## Variables in use (from code)

| Variable                        | Read by                        | Purpose                                        | Required?            |
|---------------------------------|--------------------------------|------------------------------------------------|----------------------|
| `UPSTASH_REDIS_REST_URL`        | `lib/redis/client.ts`          | Rate-limit Redis (contact/waitlist/track)      | Yes for limits       |
| `UPSTASH_REDIS_REST_TOKEN`      | `lib/redis/client.ts`          | Upstash auth                                   | Yes                 |
| `SUPABASE_URL`                  | `lib/supabase.ts`              | Server-side analytics/waitlist DB              | Yes for tracking     |
| `SUPABASE_SERVICE_ROLE_KEY`     | `lib/supabase.ts`              | Service-role key (bypasses RLS, **server only**) | Yes for tracking  |
| `IP_HASH_SALT`                  | `app/api/track/route.ts`       | Salt for IP hashing (`hashIp`)                 | **Yes — see below**  |
| `CONTACT_WEBHOOK_URL`           | `app/api/contact/route.ts`     | Contact-form delivery target                   | Optional (comes 503) |
| `NEXT_PUBLIC_APP_URL`           | various (nav/CTA)              | Link to https://app.intractify.com             | Yes (prod)           |

---

## ❗ Local `web/.env` is stale

Current local `.env` **still contains** (legacy, unused):

```
SUPABASE_ANON_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

…but is **missing**:

- `SUPABASE_SERVICE_ROLE_KEY`
- `IP_HASH_SALT`

### Consequence today (safe, but silent)
- `isSupabaseConfigured()` returns `false` → `/api/track`, `/api/contact`,
  `/api/waitlist` **skip their Supabase writes and return 503** (tracking toasts
  an error state).
  → The site behaves correctly & fails safe, but **no data is captured locally**.
- Password/account flow unaffected (Clerk handles auth; not in this project).
- Rate limiting still works if Upstash vars are set.

---

## How to fix (do this)

1. From `supabase.com` → project → Settings → API:
   - copy **Project URL** → `SUPABASE_URL`
   - copy **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`
2. Generate a salt:
   ```bash
   openssl rand -hex 32
   ```
   → paste into `IP_HASH_SALT`.
3. (Optional) set `CONTACT_WEBHOOK_URL` to the webhook that should receive
   contact messages.
4. **Never** expose the service-role key as `NEXT_PUBLIC_*`.

Copy the `.env.example` shape when rewriting:

```
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
CONTACT_WEBHOOK_URL=...
NEXT_PUBLIC_APP_URL=https://app.intractify.com
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
IP_HASH_SALT=...
```

---

## Production checklist

- [ ] `SUPABASE_SERVICE_ROLE_KEY` configured (privacy: deny-anon RLS on
      `contacts`, `waitlist`, `page_visits`).
- [ ] `IP_HASH_SALT` set — otherwise IP column is dropped entirely
      (safe, but loses abuse/unique-visitor estimates).
- [ ] `CONTACT_WEBHOOK_URL` if contact route should deliver.
- [ ] `UPSTASH_REDIS_REST_URL/TOKEN` — else rate limits deny-all (fail closed).
- [ ] `NEXT_PUBLIC_APP_URL` points to real app domain.

### Legacy-vars cleanup
Remove `SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — nothing reads them anymore.