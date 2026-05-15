import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Missing Supabase env vars. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your .env (see .env.example)."
  );
}

export const supabase: SupabaseClient<Database> = createClient<Database>(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});

export function createSupabaseClient(
  overrideUrl: string,
  overrideKey: string
): SupabaseClient<Database> {
  return createClient<Database>(overrideUrl, overrideKey);
}
