import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Server-only client. Uses the service role key so it must never be imported
// into a "use client" component or exposed to the browser.
//
// Required env vars (see .env.example):
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//
// When these are not set (e.g. local dev without a Supabase project yet),
// getSupabaseAdmin() returns null and the API route falls back to a
// non-persistent fallback mode instead of throwing.

let cached: SupabaseClient | null | undefined;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    cached = null;
    return cached;
  }

  cached = createClient(url, key, {
    auth: { persistSession: false },
  });
  return cached;
}
