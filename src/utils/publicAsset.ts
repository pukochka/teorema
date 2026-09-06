export function publicAsset(path: string): string {
  const value = path.trim();
  if (!value) return value;
  if (
    /^(https?:)?\/\//i.test(value) ||
    value.startsWith("data:") ||
    value.startsWith("blob:")
  ) {
    return value;
  }

  const base = import.meta.env.BASE_URL || "/";
  return `${base}${value.replace(/^\/+/, "")}`;
}
