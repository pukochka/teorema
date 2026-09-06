import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isClient } from "@/utils/ssr";

function envFlag(value: string | undefined): boolean {
  return ["1", "true", "yes", "on"].includes((value || "").trim().toLowerCase());
}

const supabaseEnabled = envFlag(import.meta.env.SUPABASE_ENABLED);
const supabaseUrl = import.meta.env.SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || "";

export const supabase: SupabaseClient | null =
  supabaseEnabled && supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: isClient,
          autoRefreshToken: isClient,
          detectSessionInUrl: isClient
        }
      })
    : null;
