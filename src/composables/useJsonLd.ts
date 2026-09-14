import { computed } from "vue";
import { toTelegramHref } from "@/composables/useMessengers";
import { BUSINESS_AREA_SERVED } from "@/config/site";
import { useSiteStore } from "@/stores/site";
import type { FaqItem, ManagedPage } from "@/types/page";
import { absoluteUrl } from "@/utils/paths";

export function stringifyJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function yandexMapsSearchUrl(address: string): string {
  return `https://yandex.ru/maps/?text=${encodeURIComponent(address)}`;
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
    const mapUrl = location.mapsUrl || yandexMapsSearchUrl(location.address);
    const image = absoluteUrl(
      site.config.seo.ogImage || site.config.logo,
      site.config.seo.siteUrl
    );
    const ratedReviews = site.reviews.filter(
      review => review.rating > 0 && review.text.trim() && review.name.trim()
    );
    const ratingSum = ratedReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const areaServed = [
      location.city || BUSINESS_AREA_SERVED[0],
      location.neighborhood,
      location.district
    ].filter(Boolean);

    return {
      "@type": "AutoRepair",
      "@id": `${site.config.seo.siteUrl || ""}/#autorepair`,
      name: site.config.name,
      telephone: telephone.length === 1 ? telephone[0] : telephone,
      url: site.config.seo.siteUrl || undefined,
      image: image || undefined,
      hasMap: mapUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: location.street || location.address,
        addressLocality: location.city || site.config.city || undefined,
        addressRegion: location.city || site.config.city || undefined,
        postalCode: location.postalCode || undefined,
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
      areaServed: areaServed.length
        ? areaServed.map(name => ({
            "@type": "Place",
            name
          }))
        : undefined,
      openingHours: site.config.workingHours.schema,
      sameAs: sameAs.length ? sameAs : undefined,
      aggregateRating: ratedReviews.length
        ? {
            "@type": "AggregateRating",
            ratingValue: Number((ratingSum / ratedReviews.length).toFixed(1)),
            reviewCount: ratedReviews.length,
            bestRating: 5,
            worstRating: 1
          }
        : undefined,
      review: ratedReviews.length
        ? ratedReviews.map(review => ({
            "@type": "Review",
            author: {
              "@type": "Person",
              name: review.name
            },
            reviewBody: review.text,
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating,
              bestRating: 5
            },
            datePublished: review.date || undefined
          }))
        : undefined
    };
  });
}

export function useWebSiteJsonLd() {
  const site = useSiteStore();

  return computed(() => ({
    "@type": "WebSite",
    "@id": `${site.config.seo.siteUrl || ""}/#website`,
    name: site.config.name,
    url: site.config.seo.siteUrl || undefined,
    inLanguage: "ru"
  }));
}

export function useSiteGraphJsonLd() {
  const autoRepair = useAutoRepairJsonLd();
  const website = useWebSiteJsonLd();

  return computed(() => ({
    "@context": "https://schema.org",
    "@graph": [autoRepair.value, website.value]
  }));
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
