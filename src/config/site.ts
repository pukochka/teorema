import type {
  BusinessLocation,
  MessengerLink,
  SeoDefaults,
  SiteCta,
  SitePhone,
  SocialLink,
  WorkingHours
} from "@/types/contact";

export const PHONE_PRIMARY_RAW = "+375445189432";
export const PHONE_PRIMARY_DISPLAY = "+375 44 518 94 32";

export const BUSINESS_CITY = "Минск";
export const BUSINESS_STREET = "ул. Солтыса, 108";
export const BUSINESS_ADDRESS = `г. ${BUSINESS_CITY}, ${BUSINESS_STREET}`;
export const BUSINESS_LAT_DEFAULT = 53.89247;
export const BUSINESS_LNG_DEFAULT = 27.65518;

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

function envNumber(key: keyof ImportMetaEnv): number | null {
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
  }
];

export const workingHours: WorkingHours = {
  display: "9:00–18:00",
  closed: "Воскресенье — выходной",
  schema: ["Mo-Sa 09:00-18:00"]
};

export const businessLocation: BusinessLocation = {
  address: BUSINESS_ADDRESS,
  lat: envNumber("BUSINESS_LAT") ?? BUSINESS_LAT_DEFAULT,
  lng: envNumber("BUSINESS_LNG") ?? BUSINESS_LNG_DEFAULT
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
  title: "СТО Teorema Service — ремонт, стапель, покраска и полировка",
  description:
    "СТО Teorema Service в Минске: ремонт любой сложности, стапель, покрасочная камера и полировка. ул. Солтыса, 108.",
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
  tagline: "СТО, ремонт любой сложности, стапель, покраска и полировка",
  shortDescription:
    "СТО в Минске: ремонт любой сложности, стапель, покрасочная камера и полировка.",
  about:
    "Teorema Service — автосервис в Минске. Делаем СТО и ремонт любой сложности, работаем на стапеле, красим в камере и полируем кузов.",
  email: "",
  phones: sitePhones,
  address: businessLocation.address,
  workingHours,
  socials: [],
  messengers: mergeMessengers(),
  businessLocation,
  cta: siteCta,
  seo: seoDefaults,
  logo: "/logo.png"
};

export function cloneSiteConfig(source: SiteConfig = siteConfig): SiteConfig {
  return structuredClone(source);
}
