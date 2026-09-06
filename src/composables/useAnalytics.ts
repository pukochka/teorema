import { useSiteStore } from "@/stores/site";
import { isClient } from "@/utils/ssr";

type YandexMetrika = ((...args: unknown[]) => void) & {
  a?: unknown[];
  l?: number;
};

declare global {
  interface Window {
    ym?: YandexMetrika;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type AnalyticsParams = Record<string, string | number | boolean>;

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (!isClient) return;
  const site = useSiteStore();
  const safeParams = { ...params };

  if (site.config.yandexMetrikaId && typeof window.ym === "function") {
    window.ym(Number(site.config.yandexMetrikaId), "reachGoal", name, safeParams);
  }

  if (site.config.gaMeasurementId && typeof window.gtag === "function") {
    window.gtag("event", name, safeParams);
  }
}

export function useAnalytics() {
  return { trackEvent };
}
