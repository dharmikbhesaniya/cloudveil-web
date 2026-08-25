import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 *
 * This module must only ever be imported from route handlers. It uses the
 * SERVICE ROLE key, which bypasses RLS.
 *
 * It previously used the anon key — which is public by construction, since it is
 * also exposed as NEXT_PUBLIC_*. For the server-side inserts in /api/contact,
 * /api/waitlist and /api/track to have worked, RLS must have permitted anon
 * writes, meaning anyone holding the public key could write to those tables
 * directly and bypass every validation and rate limit in the route handlers.
 * See docs/Tickets/issues/IS-007.
 *
 * With the service role key in use, RLS should now DENY anon insert and select
 * on `contacts`, `waitlist` and `page_visits`.
 */
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (typeof window !== "undefined") {
  throw new Error("lib/supabase.ts is server-only — it holds a service role key.");
}

// Placeholders keep `next build` working when the env is absent; every caller
// must gate on isSupabaseConfigured() before touching the client.
export const supabase = createClient(
  supabaseUrl || "https://placeholder-project-id.supabase.co",
  supabaseServiceRoleKey || "placeholder-service-role-key",
  { auth: { persistSession: false, autoRefreshToken: false } },
);

export function isSupabaseConfigured(): boolean {
  return !!supabaseUrl && !!supabaseServiceRoleKey;
}
