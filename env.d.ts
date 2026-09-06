/**
 * Add types (that are not auto-magically added by Quasar CLI already)
 * for your custom variables to avoid TypeScript errors, like dynamic
 * process.env variables or definitions in dotenv files configured ONLY
 * for the /quasar.config file itself.
 *
 * https://quasar.dev/quasar-cli-vite/handling-import-meta-env#type-inference
 */
interface ImportMetaEnv {
  readonly SUPABASE_URL?: string;
  readonly SUPABASE_ANON_KEY?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly BUSINESS_LAT?: string;
  readonly BUSINESS_LNG?: string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    SUPABASE_URL?: string;
    SUPABASE_ANON_KEY?: string;
    PUBLIC_SITE_URL?: string;
    BUSINESS_LAT?: string;
    BUSINESS_LNG?: string;
  }
}
