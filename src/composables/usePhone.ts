import { computed } from "vue";
import {
  PHONE_PRIMARY_DISPLAY,
  PHONE_PRIMARY_RAW,
  sitePhones
} from "@/config/site";
import { useSiteStore } from "@/stores/site";

export function toTelHref(rawPhone: string): string {
  return `tel:${rawPhone}`;
}

export function usePhone() {
  const site = useSiteStore();
  const primary = computed(
    () =>
      site.config.phones[0] ??
      sitePhones[0] ?? {
        raw: PHONE_PRIMARY_RAW,
        display: PHONE_PRIMARY_DISPLAY
      }
  );

  return {
    primaryRaw: computed(() => primary.value.raw || PHONE_PRIMARY_RAW),
    primaryDisplay: computed(
      () => primary.value.display || PHONE_PRIMARY_DISPLAY
    ),
    phones: computed(() =>
      site.config.phones.length ? site.config.phones : sitePhones
    ),
    toTelHref
  };
}
