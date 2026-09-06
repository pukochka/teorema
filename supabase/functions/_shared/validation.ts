const MIN_FILL_MS = 2500;

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

export function getClientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}
