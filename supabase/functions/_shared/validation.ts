const MIN_FILL_MS = 2500;

export const ALLOWED_SERVICE_IDS = [
  "auto-service",
  "repair",
  "frame-repair",
  "painting",
  "polishing"
] as const;

const ALLOWED_SERVICE_TITLES = [
  "СТО",
  "Ремонт любой сложности",
  "Стапель",
  "Покрасочная камера",
  "Полировка"
];

export function isHoneypot(website?: string): boolean {
  return Boolean(website && website.trim());
}

export function isTooFast(startedAt?: number): boolean {
  if (!startedAt) return false;
  return Date.now() - startedAt < MIN_FILL_MS;
}

export function requireText(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Поле «${field}» обязательно`);
  }
  return value.trim();
}

export function optionalText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function requirePhone(value: unknown): string {
  const phone = requireText(value, "Телефон");
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 11) {
    throw new Error("Введите корректный телефон");
  }
  return phone;
}

export function requireService(value: unknown): string {
  const service = requireText(value, "Услуга");
  const allowedIds = ALLOWED_SERVICE_IDS as readonly string[];
  if (
    allowedIds.includes(service) ||
    ALLOWED_SERVICE_TITLES.includes(service)
  ) {
    return service;
  }
  throw new Error("Выберите услугу");
}

export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
