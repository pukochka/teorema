import { computed } from "vue";
import type { MessengerId, MessengerLink } from "@/types/contact";
import { useSiteStore } from "@/stores/site";

export function normalizeTelegramHandle(handle: string): string {
  return (
    handle
      .trim()
      .replace(/^@/, "")
      .replace(/^https?:\/\/(t\.me|telegram\.me)\//i, "")
      .split(/[/?#]/)[0] || ""
  );
}

export function normalizeViberPhone(handle: string): string {
  const digits = handle.replace(/\D/g, "");
  return digits;
}

export function toTelegramHref(handle: string, text = ""): string {
  const username = normalizeTelegramHandle(handle);
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://t.me/${username}${query}`;
}

export function toViberHref(handle: string): string {
  return `viber://chat?number=${normalizeViberPhone(handle)}`;
}

export function messengerHref(
  messenger: MessengerLink,
  message?: string
): string {
  const text = message ?? messenger.prefillMessage;
  if (messenger.id === "telegram") {
    return toTelegramHref(messenger.handle, text);
  }
  return toViberHref(messenger.handle);
}

export function isMessengerReady(messenger: MessengerLink): boolean {
  return messenger.enabled && Boolean(messenger.handle.trim());
}

export function useMessengers() {
  const site = useSiteStore();

  const all = computed(() => site.config.messengers);
  const messengers = computed(() => all.value.filter(isMessengerReady));
  const hasMessengers = computed(() => messengers.value.length > 0);
  const telegram = computed(() =>
    messengers.value.find(item => item.id === "telegram")
  );
  const viber = computed(() =>
    messengers.value.find(item => item.id === "viber")
  );

  function byId(id: MessengerId) {
    return messengers.value.find(item => item.id === id);
  }

  function hrefFor(messenger: MessengerLink, message?: string) {
    return messengerHref(messenger, message);
  }

  return {
    all,
    messengers,
    hasMessengers,
    telegram,
    viber,
    byId,
    hrefFor
  };
}
