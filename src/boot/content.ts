import { defineBoot } from "#q-app";
import { useSiteStore } from "@/stores/site";

export default defineBoot(async () => {
  const site = useSiteStore();
  await site.loadContent();
});
