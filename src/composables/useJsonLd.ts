import { computed } from "vue";
import { toTelegramHref } from "@/composables/useMessengers";
import { useSiteStore } from "@/stores/site";
import type { FaqItem, ManagedPage } from "@/types/page";
import { absoluteUrl } from "@/utils/paths";

export function stringifyJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function useAutoRepairJsonLd() {
  const site = useSiteStore();

  return computed(() => {
    const location = site.config.businessLocation;
    const telephone = site.config.phones.map(phone => phone.raw);
    const sameAs = [
      ...site.config.messengers
        .filter(item => item.enabled && item.handle.trim() && item.id === "telegram")
        .map(item => toTelegramHref(item.handle)),
      ...site.config.socials.map(item => item.url).filter(Boolean)
    ];

    return {
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      name: site.config.name,
      telephone: telephone.length === 1 ? telephone[0] : telephone,
      url: site.config.seo.siteUrl || undefined,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.street || location.address,
        addressLocality: location.city || site.config.city || undefined,
        addressCountry: "BY"
      },
      geo:
        location.lat !== null && location.lng !== null
          ? {
              "@type": "GeoCoordinates",
              latitude: location.lat,
              longitude: location.lng
            }
          : undefined,
      openingHours: site.config.workingHours.schema,
      sameAs: sameAs.length ? sameAs : undefined
    };
  });
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
  siteUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, siteUrl)
    }))
  };
}

export function serviceJsonLd(page: ManagedPage, siteUrl: string, providerName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.name,
    description: page.intro || page.seoDescription,
    url: absoluteUrl(page.path, siteUrl),
    provider: {
      "@type": "AutoRepair",
      name: providerName,
      url: siteUrl
    }
  };
}

export function faqJsonLd(items: FaqItem[]) {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
