export function consentRule(value: boolean) {
  return value || "Нужно согласие на обработку данных";
}

export function requiredRule(message: string) {
  return (value: unknown) => {
    if (typeof value === "string") return Boolean(value.trim()) || message;
    if (Array.isArray(value)) return value.length > 0 || message;
    return (
      (value !== null && value !== undefined && value !== false) || message
    );
  };
}

export function phoneRule(value: string) {
  const digits = (value || "").replace(/\D/g, "");
  return digits.length >= 11 || "Введите корректный номер телефона";
}

export function optionalEmailRule(value: string) {
  if (!value) return true;
  return /.+@.+\..+/.test(value) || "Введите корректный email";
}

export function yearRule(value: number | string | null) {
  if (value === null || value === undefined || value === "") return true;
  const year = Number(value);
  const current = new Date().getFullYear() + 1;
  return (year >= 1980 && year <= current) || "Укажите корректный год";
}

export const MAX_PHOTO_COUNT = 10;
export const MAX_PHOTO_SIZE = 10 * 1024 * 1024;
export const ALLOWED_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg"
];
