/**
 * https://quasar.dev/quasar-cli-vite/developing-ssg/ssg-renderer
 *
 * Runs only for `quasar build -m ssg`.
 * Packages imported here must be listed in /src-ssg/package.json.
 */

import { defineSsgGetPages, defineSsgRenderPreloadTag } from "#q-app";
import routes from "@/router/routes";

async function draftPaths(): Promise<string[]> {
  const enabled = ["1", "true", "yes", "on"].includes(
    (process.env.SUPABASE_ENABLED || "").trim().toLowerCase()
  );
  const url = (process.env.SUPABASE_URL || "").replace(/\/$/, "");
  const key = process.env.SUPABASE_ANON_KEY || "";
  if (!enabled || !url || !key) return [];

  try {
    const response = await fetch(
      `${url}/rest/v1/page_visibility?status=eq.draft&select=path`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`
        }
      }
    );
    if (!response.ok) return [];
    const rows = (await response.json()) as Array<{ path: string }>;
    return rows.map(row => row.path);
  } catch {
    return [];
  }
}

export const getSsgPages = defineSsgGetPages(
  async ({ parseVueRouterRoutes }) => {
    const hidden = await draftPaths();
    const { ssgPages } = await parseVueRouterRoutes({
      routes,
      verbose: true
    });

    return ssgPages.filter(page => {
      const raw = JSON.stringify(page);
      if (raw.includes("/:")) return false;
      return !hidden.some(path => raw.includes(`"${path}"`) || raw.includes(path));
    });
  }
);

const jsRE = /\.js$/;
const cssRE = /\.css$/;
const woffRE = /\.woff$/;
const woff2RE = /\.woff2$/;
const gifRE = /\.gif$/;
const jpgRE = /\.jpe?g$/;
const pngRE = /\.png$/;

export const renderPreloadTag = defineSsgRenderPreloadTag(
  (file /* , { ssrContext } */) => {
    if (jsRE.test(file)) {
      return `<link rel="modulepreload" href="${file}" crossorigin>`;
    }

    if (cssRE.test(file)) {
      return `<link rel="stylesheet" href="${file}" crossorigin>`;
    }

    if (woffRE.test(file)) {
      return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
    }

    if (woff2RE.test(file)) {
      return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
    }

    if (gifRE.test(file)) {
      return `<link rel="preload" href="${file}" as="image" type="image/gif" crossorigin>`;
    }

    if (jpgRE.test(file)) {
      return `<link rel="preload" href="${file}" as="image" type="image/jpeg" crossorigin>`;
    }

    if (pngRE.test(file)) {
      return `<link rel="preload" href="${file}" as="image" type="image/png" crossorigin>`;
    }

    return "";
  }
);
