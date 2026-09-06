import { computed } from "vue";
import { useSiteStore } from "@/stores/site";

export function useSiteConfig() {
  const site = useSiteStore();
  return computed(() => site.config);
}
