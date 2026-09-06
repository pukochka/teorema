export interface SitePhone {
  raw: string;
  display: string;
  label?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export type MessengerId = "telegram" | "viber";

export interface MessengerLink {
  id: MessengerId;
  name: string;
  handle: string;
  icon: string;
  enabled: boolean;
  prefillMessage: string;
}

export interface BusinessLocation {
  address: string;
  lat: number | null;
  lng: number | null;
}

export interface WorkingHours {
  display: string;
  closed: string;
  schema: string[];
}

export interface SeoDefaults {
  title: string;
  description: string;
  siteUrl: string;
  ogImage: string;
  locale: string;
  robots: string;
}

export interface SiteCta {
  call: string;
  book: string;
  bookShort: string;
  estimate: string;
  estimateShort: string;
  sendPhotos: string;
  getEstimate: string;
  fleet: string;
  telegram: string;
  viber: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  source: string;
  date: string;
}

export interface ApiResult<T = unknown> {
  ok: boolean;
  data?: T;
  message: string;
}
