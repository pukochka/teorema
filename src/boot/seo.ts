import { defineBoot } from "#q-app";
import { siteConfig } from "@/config/site";
import { isClient } from "@/utils/ssr";

export default defineBoot(({ router }) => {
  router.afterEach(to => {
    if (!isClient) return;
    document.title = to.meta.title
      ? String(to.meta.title)
      : siteConfig.seo.title;
  });
});
