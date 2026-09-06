import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export function createServiceClient() {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) {
    throw new Error("Не заданы SUPABASE_URL или SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

export async function assertRateLimit(
  table: string,
  phone: string,
  ip: string
): Promise<void> {
  const supabase = createServiceClient();
  const since = new Date(Date.now() - 60_000).toISOString();
  const { count, error } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true })
    .or(`phone.eq.${phone}`)
    .gte("created_at", since);

  if (error) {
    console.error("Rate limit check failed", error, ip);
    return;
  }

  if ((count || 0) >= 3) {
    throw new Error(
      "Слишком много заявок. Подождите минуту и попробуйте снова."
    );
  }
}
