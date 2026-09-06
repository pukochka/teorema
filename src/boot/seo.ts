import { defineBoot } from "#q-app";
import { useSiteStore } from "@/stores/site";
import { normalizePath } from "@/utils/paths";
import { isClient } from "@/utils/ssr";

export default defineBoot(({ router }) => {
  router.afterEach(to => {
    if (!isClient) return;
    const site = useSiteStore();
    const page = site.pageByPath(normalizePath(to.path));
    document.title =
      page?.seoTitle ||
      (to.meta.title ? String(to.meta.title) : site.config.seo.title);
  });
});
