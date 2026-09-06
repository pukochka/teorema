// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "#q-app";

function normalizePublicPath(value = ""): string {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "/") return "/";
  const withLeading = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

function rewritePublishedSeoFiles(distDir: string) {
  const siteUrl = (
    process.env.PUBLIC_SITE_URL || "https://teorema-service.site"
  ).replace(/\/$/, "");
  const publicPath = normalizePublicPath(process.env.PUBLIC_PATH);
  const adminPath =
    publicPath === "/" ? "/admin" : `${publicPath.replace(/\/$/, "")}/admin`;

  const robotsPath = join(distDir, "robots.txt");
  if (existsSync(robotsPath)) {
    const sitemapLine = `Sitemap: ${siteUrl}/sitemap.xml`;
    writeFileSync(
      robotsPath,
      `User-agent: *\nAllow: /\nDisallow: ${adminPath}\n\n${sitemapLine}\n`
    );
  }

  const sitemapPath = join(distDir, "sitemap.xml");
  if (existsSync(sitemapPath)) {
    const sitemap = readFileSync(sitemapPath, "utf8").replaceAll(
      "<loc>/",
      `<loc>${siteUrl}/`
    );
    writeFileSync(sitemapPath, sitemap);
  }

  writeFileSync(join(distDir, ".nojekyll"), "");
  writeFileSync(join(distDir, "CNAME"), "teorema-service.site\n");
}

export default defineConfig(ctx => {
  return {
    boot: ["i18n", "supabase", "content", "seo"],

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
        rewritePublishedSeoFiles(distDir);
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
