// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "#q-app";
import {
  CONTENT_UPDATED_AT,
  DEFAULT_SITEMAP_PATHS
} from "./src/seo/manifest";

function normalizePublicPath(value = ""): string {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "/") return "/";
  const withLeading = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

function distHasPage(distDir: string, path: string): boolean {
  if (path === "/") return existsSync(join(distDir, "index.html"));
  const relative = path.replace(/^\//, "");
  return (
    existsSync(join(distDir, relative, "index.html")) ||
    existsSync(join(distDir, `${relative}.html`))
  );
}

async function loadSitemapLastmods(): Promise<Record<string, string>> {
  const enabled = ["1", "true", "yes", "on"].includes(
    (process.env.SUPABASE_ENABLED || "").trim().toLowerCase()
  );
  const url = (process.env.SUPABASE_URL || "").replace(/\/$/, "");
  const key = process.env.SUPABASE_ANON_KEY || "";
  if (!enabled || !url || !key) return {};

  try {
    const response = await fetch(
      `${url}/rest/v1/pages?status=eq.published&robots_index=eq.true&select=path,updated_at`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`
        }
      }
    );
    if (!response.ok) return {};
    const rows = (await response.json()) as Array<{
      path: string;
      updated_at: string;
    }>;
    return Object.fromEntries(
      rows.map(row => [
        row.path === "/" ? "/" : row.path.replace(/\/+$/, ""),
        row.updated_at.slice(0, 10)
      ])
    );
  } catch {
    return {};
  }
}

async function rewritePublishedSeoFiles(distDir: string) {
  const siteUrl = (
    process.env.PUBLIC_SITE_URL || "https://teorema-service.site"
  ).replace(/\/$/, "");
  const publicPath = normalizePublicPath(process.env.PUBLIC_PATH);
  const adminPath =
    publicPath === "/" ? "/admin" : `${publicPath.replace(/\/$/, "")}/admin`;

  const robotsPath = join(distDir, "robots.txt");
  writeFileSync(
    robotsPath,
    `User-agent: *\nAllow: /\nDisallow: ${adminPath}\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  );

  const lastmods = await loadSitemapLastmods();
  const entries = DEFAULT_SITEMAP_PATHS.filter(path =>
    distHasPage(distDir, path)
  ).map(path => {
    const loc = path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
    const lastmod = lastmods[path] || CONTENT_UPDATED_AT;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  });

  writeFileSync(
    join(distDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`
  );

  writeFileSync(join(distDir, ".nojekyll"), "");
  writeFileSync(join(distDir, "CNAME"), "teorema-service.site\n");
}

export default defineConfig(ctx => {
  const logoFrom = join(ctx.appPaths.appDir, "src/assets/logo.png");
  const logoTo = join(ctx.appPaths.appDir, "public/logo.png");
  if (existsSync(logoFrom)) {
    copyFileSync(logoFrom, logoTo);
  }

  return {
    boot: ["i18n", "supabase", "content", "seo", "analytics"],

    css: ["app.scss"],

    extras: ["mdi-v7"],

    build: {
      target: {},
      publicPath: normalizePublicPath(process.env.PUBLIC_PATH),

      typescript: {
        strict: true,
        vueShim: true,
        extendTsConfig(tsConfig) {
          tsConfig.exclude = [...(tsConfig.exclude || []), "./../supabase"];
        }
      },

      filenameBasedRouting: false,
      vueRouterMode: "history",

      defineEnv: {
        SUPABASE_ENABLED: process.env.SUPABASE_ENABLED || "false",
        SUPABASE_URL: process.env.SUPABASE_URL || "",
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
        PUBLIC_SITE_URL:
          process.env.PUBLIC_SITE_URL || "https://teorema-service.site",
        BUSINESS_LAT: process.env.BUSINESS_LAT || "",
        BUSINESS_LNG: process.env.BUSINESS_LNG || ""
      },

      afterBuild({ quasarConf }) {
        if (!ctx.mode.ssg) return;
        const distDir =
          typeof quasarConf.build.distDir === "string"
            ? quasarConf.build.distDir
            : join(ctx.appPaths.appDir, "dist/ssg");
        return rewritePublishedSeoFiles(distDir);
      },

      vitePlugins: [
        [
          "@intlify/unplugin-vue-i18n/vite",
          {
            ssr: ctx.mode.ssr || ctx.mode.ssg,
            include: [ctx.appPaths.resolve.app("src/i18n")]
          }
        ]
      ]
    },

    devServer: {
      open: true
    },

    framework: {
      config: {
        notify: {
          position: "top",
          timeout: 4000
        }
      },

      iconSet: "mdi-v7",
      lang: "ru",

      plugins: ["Notify", "Loading", "Dialog", "Meta"]
    },

    animations: [],

    ssr: {
      prodPort: 3000,
      middlewares: ["render"]
    },

    ssg: {
      pwa: false,
      error404HtmlFilename: "404.html",
      ssgRendererDirectoryIndexes: true
    },

    pwa: {
      workboxMode: "GenerateSW"
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      preloadScripts: ["electron-preload"],
      inspectPort: 5858,
      bundler: "packager",
      packager: {},
      builder: {
        appId: "teorema-service"
      }
    },

    bex: {
      extraScripts: []
    }
  };
});
