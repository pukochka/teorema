import type {
  BusinessLocation,
  MessengerLink,
  SeoDefaults,
  SiteCta,
  SitePhone,
  SocialLink,
  WorkingHours
} from "@/types/contact";
import {
  DEFAULT_TITLE_TEMPLATE,
  DEFAULT_TITLE_TEMPLATE_NO_CITY
} from "@/utils/seoTemplates";

export const PHONE_PRIMARY_RAW = "+375445189432";
export const PHONE_PRIMARY_DISPLAY = "+375 44 518 94 32";

export const BUSINESS_CITY = "Минск";
export const BUSINESS_CITY_PREPOSITIONAL = "Минске";
export const BUSINESS_STREET = "ул. Солтыса, 108, корпус 3";
export const BUSINESS_ADDRESS = `г. ${BUSINESS_CITY}, ${BUSINESS_STREET}`;
export const BUSINESS_POSTAL_CODE = "220070";
export const BUSINESS_DISTRICT = "Партизанский район";
export const BUSINESS_NEIGHBORHOOD = "Дражня";
export const BUSINESS_LAT_DEFAULT = 53.89247;
export const BUSINESS_LNG_DEFAULT = 27.65518;
export const BUSINESS_AREA_SERVED = [
  BUSINESS_CITY,
  BUSINESS_NEIGHBORHOOD,
  BUSINESS_DISTRICT
];
export const SEO_KEYWORDS =
  "автосервис Минск, СТО Минск, Солтыса, Дражня, кузовной ремонт, покраска автомобиля, шиномонтаж";

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
  street: BUSINESS_STREET,
  city: BUSINESS_CITY,
  postalCode: BUSINESS_POSTAL_CODE,
  district: BUSINESS_DISTRICT,
  neighborhood: BUSINESS_NEIGHBORHOOD,
  lat: envNumber("BUSINESS_LAT") ?? BUSINESS_LAT_DEFAULT,
  lng: envNumber("BUSINESS_LNG") ?? BUSINESS_LNG_DEFAULT,
  mapsUrl: ""
};

export const siteCta: SiteCta = {
  call: "Позвонить",
  book: "Записаться в сервис",
  bookShort: "Записаться",
  clarifyPrice: "Уточнить стоимость",
  clarifyPriceShort: "Стоимость",
  estimate: "Рассчитать ремонт по фото",
  estimateShort: "Фотооценка",
  sendPhotos: "Отправить фотографии",
  getEstimate: "Получить оценку",
  fleet: "Обсудить обслуживание автопарка",
  telegram: "Написать в Telegram",
  viber: "Написать в Viber"
};

export const seoDefaults: SeoDefaults = {
  title: "Автосервис в Минске на Солтыса — СТО | Teorema Service",
  description:
    "СТО в Минске на ул. Солтыса, 108, корпус 3 (Дражня): ремонт, кузовной ремонт, покраска, шиномонтаж и полировка. Запись по телефону или на сайте.",
  siteUrl: envText("PUBLIC_SITE_URL") || DEFAULT_SITE_URL,
  ogImage: "/logo.png",
  ogImageAlt: "Логотип автосервиса Teorema Service в Минске",
  keywords: SEO_KEYWORDS,
  locale: "ru_BY",
  robots: "index, follow",
  titleTemplate: DEFAULT_TITLE_TEMPLATE,
  titleTemplateNoCity: DEFAULT_TITLE_TEMPLATE_NO_CITY
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
  city: string;
  cityPrepositional: string;
  street: string;
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
  yandexVerification: string;
  googleVerification: string;
  yandexMetrikaId: string;
  gaMeasurementId: string;
}

export const siteConfig: SiteConfig = {
  name: "Teorema Service",
  legalName: "Teorema Service",
  tagline:
    "Обслуживание и ремонт легковых автомобилей и лёгкого коммерческого транспорта",
  shortDescription:
    "Автосервис в Минске на ул. Солтыса, 108, корпус 3: легковые автомобили и лёгкий коммерческий транспорт. Ремонт, кузовные работы, покраска, шиномонтаж, заправка кондиционеров и полировка.",
  about:
    "Teorema Service — автосервис в Минске на ул. Солтыса, 108, корпус 3 (Дражня). Обслуживаем легковые автомобили и лёгкий коммерческий транспорт, включая небольшие грузовики.",
  city: BUSINESS_CITY,
  cityPrepositional: BUSINESS_CITY_PREPOSITIONAL,
  street: BUSINESS_STREET,
  email: "",
  phones: sitePhones,
  address: businessLocation.address,
  workingHours,
  socials: [],
  messengers: mergeMessengers(),
  businessLocation,
  cta: siteCta,
  seo: seoDefaults,
  logo: "/logo.png",
  yandexVerification: "",
  googleVerification: "",
  yandexMetrikaId: "",
  gaMeasurementId: ""
};

export function composeAddress(city: string, street: string): string {
  const parts = [city ? `г. ${city}` : "", street].filter(Boolean);
  return parts.join(", ");
}

export function cloneSiteConfig(source: SiteConfig = siteConfig): SiteConfig {
  return structuredClone(source);
}
