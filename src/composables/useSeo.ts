import { computed } from "vue";
import { useMeta } from "quasar";
import { useRoute } from "vue-router";
import { seoDefaults, siteConfig } from "@/config/site";

interface SeoInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  robots?: string;
}

function absoluteUrl(path: string, siteUrl: string): string {
  if (!siteUrl) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl.replace(/\/$/, "")}${normalized}`;
}

export function useSeo(input: SeoInput = {}) {
  const route = useRoute();

  const title = computed(
    () =>
      input.title ||
      (route.meta.title as string | undefined) ||
      seoDefaults.title
  );
  const description = computed(
    () =>
      input.description ||
      (route.meta.description as string | undefined) ||
      seoDefaults.description
  );
  const path = computed(() => input.path || route.path || "/");
  const canonical = computed(() =>
    absoluteUrl(path.value, seoDefaults.siteUrl)
  );
  const image = computed(() =>
    absoluteUrl(input.image || seoDefaults.ogImage, seoDefaults.siteUrl)
  );
  const robots = computed(
    () =>
      input.robots ||
      (route.meta.robots as string | undefined) ||
      seoDefaults.robots
  );

  useMeta(() => ({
    title: title.value,
    titleTemplate: (current?: string) => {
      if (!current) return siteConfig.name;
      return current.includes(siteConfig.name) ? current : current;
    },
    meta: {
      description: { name: "description", content: description.value },
      robots: { name: "robots", content: robots.value },
      ogTitle: { property: "og:title", content: title.value },
      ogDescription: { property: "og:description", content: description.value },
      ogType: { property: "og:type", content: "website" },
      ogLocale: { property: "og:locale", content: seoDefaults.locale },
      ogSiteName: { property: "og:site_name", content: siteConfig.name },
      ogImage: { property: "og:image", content: image.value },
      ogUrl: {
        property: "og:url",
        content: canonical.value || path.value
      },
      twitterCard: {
        name: "twitter:card",
        content: "summary_large_image"
      },
      twitterTitle: { name: "twitter:title", content: title.value },
      twitterDescription: {
        name: "twitter:description",
        content: description.value
      },
      twitterImage: { name: "twitter:image", content: image.value }
    },
    link: {
      canonical: seoDefaults.siteUrl
        ? { rel: "canonical", href: canonical.value }
        : { rel: "canonical", href: path.value }
    }
  }));

  return { title, description, canonical };
}
