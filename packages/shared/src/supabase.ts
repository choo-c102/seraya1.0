import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// `process.env` is provided at runtime by Metro / Expo. Local declaration
// keeps this package strict-TS clean without pulling in @types/node.
declare const process: { env: Record<string, string | undefined> };

let cached: SupabaseClient<Database> | null = null;

/**
 * Lazily create (and memoise) the Supabase client. Reads env vars at first
 * call, not at module load. Throws only if the caller tries to use Supabase
 * without configuring credentials.
 *
 * Screens that only consume mock data (see `lib/mock-data.ts` in each app)
 * never call this, so the dev preview boots without a real Supabase project.
 */
export function getSupabase(): SupabaseClient<Database> {
  if (cached) return cached;
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase env vars. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your .env (see .env.example)."
    );
  }
  cached = createClient<Database>(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });
  return cached;
}

/**
 * Proxy that defers all access to the real client until first property read.
 * Lets existing call sites continue to write `supabase.from(...)` without
 * triggering the lazy init at import time.
 */
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop, receiver) {
    const client = getSupabase();
    const value = Reflect.get(client as object, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
}) as SupabaseClient<Database>;

export function createSupabaseClient(
  overrideUrl: string,
  overrideKey: string
): SupabaseClient<Database> {
  return createClient<Database>(overrideUrl, overrideKey);
}
