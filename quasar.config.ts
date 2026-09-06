// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from "#q-app";

export default defineConfig(ctx => {
  return {
    boot: ["i18n", "supabase", "content", "seo"],

    css: ["app.scss"],

    extras: ["mdi-v7"],

    build: {
      target: {},

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
        SUPABASE_URL: process.env.SUPABASE_URL || "",
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
        PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL || "",
        BUSINESS_LAT: process.env.BUSINESS_LAT || "",
        BUSINESS_LNG: process.env.BUSINESS_LNG || ""
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

    ssg: {},

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
