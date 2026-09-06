export function normalizePath(path: string): string {
  const trimmed = path.trim();
  if (!trimmed || trimmed === "/") return "/";
  const withLeading = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeading.replace(/\/+$/, "");
}

export function servicePath(slug: string): string {
  const clean = slug.replace(/^\/+|\/+$/g, "");
  return `/uslugi/${clean}`;
}

export function absoluteUrl(path: string, siteUrl: string): string {
  if (!siteUrl) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = normalizePath(path);
  const origin = siteUrl.replace(/\/$/, "");
  return normalized === "/" ? `${origin}/` : `${origin}${normalized}`;
}

export function slugFromPath(path: string): string {
  const normalized = normalizePath(path);
  const prefix = "/uslugi/";
  if (normalized.startsWith(prefix)) {
    return normalized.slice(prefix.length);
  }
  return normalized.replace(/^\//, "");
}
