import { computed } from "vue";
import { useMeta } from "quasar";
import { useRoute } from "vue-router";
import { seoDefaults, siteConfig } from "@/config/site";
import { useSiteStore } from "@/stores/site";
import { absoluteUrl, normalizePath } from "@/utils/paths";
import { hasUnresolvedPlaceholders } from "@/utils/seoTemplates";

interface SeoInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

function firstNonEmpty(...values: Array<string | undefined>): string {
  return values.find(value => Boolean(value && value.trim())) || "";
}

export function useSeo(input: SeoInput = {}) {
  const route = useRoute();
  const site = useSiteStore();

  const page = computed(() => {
    const path = normalizePath(input.path || route.path || "/");
    return site.pageByPath(path);
  });

  const title = computed(() => {
    const raw = firstNonEmpty(
      input.title,
      page.value?.seoTitle,
      route.meta.title as string | undefined,
      site.config.seo.title,
      seoDefaults.title
    );
    return hasUnresolvedPlaceholders(raw) ? site.config.name : raw;
  });

  const description = computed(() => {
    const raw = firstNonEmpty(
      input.description,
      page.value?.seoDescription,
      route.meta.description as string | undefined,
      site.config.seo.description,
      seoDefaults.description
    );
    return hasUnresolvedPlaceholders(raw) ? site.config.shortDescription : raw;
  });

  const path = computed(() =>
    normalizePath(input.path || page.value?.path || route.path || "/")
  );

  const canonical = computed(() => {
    const explicit = firstNonEmpty(input.canonical, page.value?.canonical);
    if (explicit) {
      return /^https?:\/\//i.test(explicit)
        ? explicit
        : absoluteUrl(explicit, site.config.seo.siteUrl || seoDefaults.siteUrl);
    }
    return absoluteUrl(path.value, site.config.seo.siteUrl || seoDefaults.siteUrl);
  });

  const ogTitle = computed(() =>
    firstNonEmpty(input.ogTitle, page.value?.ogTitle, title.value)
  );
  const ogDescription = computed(() =>
    firstNonEmpty(input.ogDescription, page.value?.ogDescription, description.value)
  );
  const image = computed(() => {
    const relative = firstNonEmpty(
      input.ogImage,
      input.image,
      page.value?.ogImage,
      page.value?.image,
      site.config.seo.ogImage,
      site.config.logo,
      seoDefaults.ogImage
    );
    return absoluteUrl(relative, site.config.seo.siteUrl || seoDefaults.siteUrl);
  });
  const robots = computed(() => {
    if (input.robots) return input.robots;
    if (route.meta.robots) return String(route.meta.robots);
    if (page.value && !page.value.robotsIndex) return "noindex, follow";
    return site.config.seo.robots || seoDefaults.robots;
  });

  useMeta(() => {
    const meta: Record<string, { name?: string; property?: string; content: string }> =
      {
        description: { name: "description", content: description.value },
        robots: { name: "robots", content: robots.value },
        ogTitle: { property: "og:title", content: ogTitle.value },
        ogDescription: { property: "og:description", content: ogDescription.value },
        ogType: { property: "og:type", content: "website" },
        ogLocale: { property: "og:locale", content: seoDefaults.locale },
        ogSiteName: { property: "og:site_name", content: site.config.name },
        ogImage: { property: "og:image", content: image.value },
        ogUrl: { property: "og:url", content: canonical.value || path.value },
        twitterCard: { name: "twitter:card", content: "summary_large_image" },
        twitterTitle: { name: "twitter:title", content: ogTitle.value },
        twitterDescription: {
          name: "twitter:description",
          content: ogDescription.value
        },
        twitterImage: { name: "twitter:image", content: image.value }
      };

    if (site.config.yandexVerification) {
      meta.yandexVerification = {
        name: "yandex-verification",
        content: site.config.yandexVerification
      };
    }
    if (site.config.googleVerification) {
      meta.googleVerification = {
        name: "google-site-verification",
        content: site.config.googleVerification
      };
    }

    return {
      title: title.value,
      titleTemplate: (current?: string) => {
        if (!current) return site.config.name || siteConfig.name;
        return current;
      },
      meta,
      link: {
        canonical: {
          rel: "canonical",
          href: canonical.value || path.value
        }
      }
    };
  });

  return { title, description, canonical, image, robots, page };
}
