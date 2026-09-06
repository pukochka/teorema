import { defineBoot } from "#q-app";
import { useSiteStore } from "@/stores/site";
import { isClient } from "@/utils/ssr";

function injectScript(src: string, extra?: Record<string, string>) {
  if (!isClient || document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      script.setAttribute(key, value);
    }
  }
  document.head.appendChild(script);
}

export default defineBoot(() => {
  if (!isClient) return;
  const site = useSiteStore();

  const metrikaId = site.config.yandexMetrikaId.trim();
  if (metrikaId) {
    injectScript("https://mc.yandex.ru/metrika/tag.js");
    window.ym =
      window.ym ||
      function ym(...args: unknown[]) {
        (window.ym.a = window.ym.a || []).push(args);
      };
    window.ym.l = Date.now();
    window.ym(Number(metrikaId), "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true
    });
  }

  const gaId = site.config.gaMeasurementId.trim();
  if (gaId) {
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`);
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
    window.gtag("js", new Date());
    window.gtag("config", gaId);
  }
});
