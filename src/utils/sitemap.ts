import { existsSync } from "node:fs";
import { join } from "node:path";
import { CONTENT_UPDATED_AT, DEFAULT_SITEMAP_PATHS } from "@/seo/manifest";
import { normalizePath } from "./paths";

export interface SitemapEntry {
  path: string;
  lastmod: string;
}

function distHasPage(distDir: string, path: string): boolean {
  if (path === "/") {
    return existsSync(join(distDir, "index.html"));
  }
  const relative = path.replace(/^\//, "");
  return (
    existsSync(join(distDir, relative, "index.html")) ||
    existsSync(join(distDir, `${relative}.html`))
  );
}

export function buildSitemapXml(
  siteUrl: string,
  entries: SitemapEntry[]
): string {
  const origin = siteUrl.replace(/\/$/, "");
  const urls = entries
    .map(entry => {
      const loc =
        entry.path === "/" ? `${origin}/` : `${origin}${normalizePath(entry.path)}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function defaultSitemapEntries(): SitemapEntry[] {
  return DEFAULT_SITEMAP_PATHS.map(path => ({
    path,
    lastmod: CONTENT_UPDATED_AT
  }));
}

export function filterExistingSitemapEntries(
  distDir: string,
  entries: SitemapEntry[]
): SitemapEntry[] {
  return entries.filter(entry => distHasPage(distDir, entry.path));
}
