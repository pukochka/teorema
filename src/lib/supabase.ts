import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isClient } from "@/utils/ssr";

const supabaseUrl = import.meta.env.SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || "";

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: isClient,
          autoRefreshToken: isClient,
          detectSessionInUrl: isClient
        }
      })
    : null;
