import { defineBoot } from "#q-app";
import { isClient } from "@/utils/ssr";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth";

export { supabase };

export default defineBoot(async () => {
  if (!supabase && isClient) {
    console.info(
      "Supabase временно отключён. Сайт работает на локальных данных."
    );
  }

  const auth = useAuthStore();
  await auth.init();
});
