import type {
  BusinessLocation,
  MessengerLink,
  SeoDefaults,
  SiteCta,
  SitePhone,
  SocialLink,
  WorkingHours
} from "@/types/contact";

export const PHONE_PRIMARY_RAW = "+375256669313";
export const PHONE_PRIMARY_DISPLAY = "+375 25 666 93 13";
export const PHONE_SECONDARY_RAW = "+375445189432";
export const PHONE_SECONDARY_DISPLAY = "+375 44 518 94 32";

export const SITE_DOMAIN = "teorema-service.site";
export const DEFAULT_SITE_URL = `https://${SITE_DOMAIN}`;

export const DEFAULT_MESSENGER_PREFILL =
  "Здравствуйте! Хочу записаться в Teorema Service.";

export const ESTIMATE_MESSENGER_PREFILL =
  "Здравствуйте! Хочу оценить ремонт по фото — отправлю снимки.";

function envText(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key];
  return typeof value === "string" ? value.trim() : "";
}

function envNumber(key: string): number | null {
  const value = envText(key);
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export const sitePhones: SitePhone[] = [
  {
    raw: PHONE_PRIMARY_RAW,
    display: PHONE_PRIMARY_DISPLAY,
    label: "Основной"
  },
  {
    raw: PHONE_SECONDARY_RAW,
    display: PHONE_SECONDARY_DISPLAY,
    label: "Дополнительный"
  }
];

export const workingHours: WorkingHours = {
  display: "9:00–18:00",
  closed: "Воскресенье — выходной",
  schema: ["Mo-Sa 09:00-18:00"]
};

export const businessLocation: BusinessLocation = {
  address: "ул. Солтыса, 10В",
  lat: envNumber("BUSINESS_LAT"),
  lng: envNumber("BUSINESS_LNG")
};

export const siteCta: SiteCta = {
  call: "Позвонить",
  book: "Записаться на сервис",
  bookShort: "Записаться",
  estimate: "Рассчитать ремонт по фото",
  estimateShort: "Фотооценка",
  sendPhotos: "Отправить фотографии",
  getEstimate: "Получить оценку",
  fleet: "Обсудить обслуживание автопарка",
  telegram: "Написать в Telegram",
  viber: "Написать в Viber"
};

export const seoDefaults: SeoDefaults = {
  title: "СТО Teorema Service — ремонт, кузовные работы и покраска автомобилей",
  description:
    "СТО Teorema Service: техническое обслуживание автомобилей, кузовной ремонт, покраска в покрасочной камере, стапельные работы и обслуживание коммерческого транспорта.",
  siteUrl: envText("PUBLIC_SITE_URL") || DEFAULT_SITE_URL,
  ogImage: "/images/og-cover.jpg",
  locale: "ru_BY",
  robots: "index, follow"
};

export const defaultMessengers: MessengerLink[] = [
  {
    id: "telegram",
    name: "Telegram",
    handle: "",
    icon: "mdi-telegram",
    enabled: false,
    prefillMessage: DEFAULT_MESSENGER_PREFILL
  },
  {
    id: "viber",
    name: "Viber",
    handle: "",
    icon: "mdi-chat",
    enabled: false,
    prefillMessage: DEFAULT_MESSENGER_PREFILL
  }
];

export function mergeMessengers(
  incoming?: MessengerLink[] | null
): MessengerLink[] {
  return defaultMessengers.map(defaults => {
    const found = incoming?.find(item => item.id === defaults.id);
    if (!found) return { ...defaults };
    return {
      ...defaults,
      ...found,
      id: defaults.id,
      name: defaults.name,
      icon: defaults.icon
    };
  });
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  about: string;
  email: string;
  phones: SitePhone[];
  address: string;
  workingHours: WorkingHours;
  socials: SocialLink[];
  messengers: MessengerLink[];
  businessLocation: BusinessLocation;
  cta: SiteCta;
  seo: SeoDefaults;
  logo: string;
}

export const siteConfig: SiteConfig = {
  name: "Teorema Service",
  legalName: "Teorema Service",
  tagline: "СТО, кузовной ремонт и покраска автомобилей",
  shortDescription:
    "Техническое обслуживание, кузовной ремонт и покраска легковых автомобилей и коммерческого транспорта.",
  about:
    "Teorema Service — комплексный автосервис, где технический ремонт, кузовные работы, стапель и покраска доступны в одном месте.",
  email: "",
  phones: sitePhones,
  address: businessLocation.address,
  workingHours,
  socials: [],
  messengers: mergeMessengers(),
  businessLocation,
  cta: siteCta,
  seo: seoDefaults,
  logo: "/logo.svg"
};

export function cloneSiteConfig(source: SiteConfig = siteConfig): SiteConfig {
  return structuredClone(source);
}
