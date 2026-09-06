import type { MessengerLink, Review, SitePhone, SocialLink, WorkingHours } from "./contact";
import type {
  ContentBlock,
  FaqItem,
  ManagedPage,
  ManagedPageType,
  PageStatus,
  RedirectRule,
  ServiceId
} from "./page";
import type { WorkCategory, WorkProject } from "./work";

export interface SiteSettingsRow {
  id: string;
  phones: SitePhone[];
  email: string | null;
  address: string | null;
  working_hours: WorkingHours | null;
  messengers: MessengerLink[];
  name?: string | null;
  city?: string | null;
  city_prepositional?: string | null;
  street?: string | null;
  lat?: number | null;
  lng?: number | null;
  maps_url?: string | null;
  socials?: SocialLink[] | null;
  logo?: string | null;
  og_image?: string | null;
  title_template?: string | null;
  title_template_no_city?: string | null;
  yandex_verification?: string | null;
  google_verification?: string | null;
  yandex_metrika_id?: string | null;
  ga_measurement_id?: string | null;
  updated_at: string;
}

export interface PageRow {
  id: string;
  type: ManagedPageType;
  name: string;
  slug: string;
  path: string;
  seo_title: string;
  seo_description: string;
  h1: string;
  subtitle: string;
  intro: string;
  blocks: ContentBlock[];
  faq: FaqItem[];
  image: string | null;
  image_alt: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  status: PageStatus;
  robots_index: boolean;
  canonical: string | null;
  updated_at: string;
  service_id: ServiceId | null;
  icon: string | null;
  cta: string | null;
  estimate_preferred: boolean | null;
  related_ids: string[] | null;
  card_title: string | null;
  card_description: string | null;
  show_on_home: boolean | null;
}

export interface RedirectRow {
  id: string;
  from_path: string;
  to_path: string;
  created_at: string;
}

export interface WorkRow {
  id: string;
  brand: string;
  model: string;
  category: Exclude<WorkCategory, "all">;
  damage: string;
  works: string[];
  before_url: string | null;
  process_url: string | null;
  after_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
}

export interface ReviewRow {
  id: string;
  name: string;
  text: string;
  rating: number;
  source: string;
  date: string;
  published: boolean;
  sort_order: number;
  created_at: string;
}

export interface BookingRow {
  id: string;
  name: string;
  phone: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  vehicle_type: string | null;
  service: string;
  preferred_date: string | null;
  preferred_time: string | null;
  comment: string | null;
  created_at: string;
}

export interface EstimateRow {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  vehicle_type: string | null;
  brand: string | null;
  model: string | null;
  year: number | null;
  plate: string | null;
  vin: string | null;
  service_type: string;
  description: string | null;
  photo_paths: string[];
  created_at: string;
}

export interface FleetRow {
  id: string;
  company: string;
  contact_name: string;
  phone: string;
  email: string | null;
  vehicle_count: string | null;
  vehicle_types: string | null;
  services: string[];
  comment: string | null;
  created_at: string;
}

export function mapWorkRow(row: WorkRow): WorkProject {
  return {
    id: row.id,
    isDemo: false,
    brand: row.brand,
    model: row.model,
    category: row.category,
    damage: row.damage,
    works: row.works ?? [],
    before: row.before_url || "",
    process: row.process_url || "",
    after: row.after_url || ""
  };
}

export function mapReviewRow(row: ReviewRow): Review {
  return {
    id: row.id,
    name: row.name,
    text: row.text,
    rating: row.rating,
    source: row.source,
    date: row.date
  };
}

export function mapPageRow(row: PageRow): ManagedPage {
  return {
    id: row.id,
    type: row.type,
    name: row.name,
    slug: row.slug || "",
    path: row.path,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    h1: row.h1,
    subtitle: row.subtitle || "",
    intro: row.intro || "",
    blocks: Array.isArray(row.blocks) ? row.blocks : [],
    faq: Array.isArray(row.faq) ? row.faq : [],
    image: row.image || "",
    imageAlt: row.image_alt || "",
    ogTitle: row.og_title || "",
    ogDescription: row.og_description || "",
    ogImage: row.og_image || "",
    status: row.status,
    robotsIndex: row.robots_index,
    canonical: row.canonical || "",
    updatedAt: row.updated_at,
    serviceId: row.service_id || undefined,
    icon: row.icon || undefined,
    cta: row.cta || undefined,
    estimatePreferred: Boolean(row.estimate_preferred),
    relatedIds: row.related_ids || [],
    cardTitle: row.card_title || undefined,
    cardDescription: row.card_description || undefined,
    showOnHome: Boolean(row.show_on_home)
  };
}

export function toPageRow(page: ManagedPage): PageRow {
  return {
    id: page.id,
    type: page.type,
    name: page.name,
    slug: page.slug,
    path: page.path,
    seo_title: page.seoTitle,
    seo_description: page.seoDescription,
    h1: page.h1,
    subtitle: page.subtitle,
    intro: page.intro,
    blocks: page.blocks,
    faq: page.faq,
    image: page.image || null,
    image_alt: page.imageAlt || null,
    og_title: page.ogTitle || null,
    og_description: page.ogDescription || null,
    og_image: page.ogImage || null,
    status: page.status,
    robots_index: page.robotsIndex,
    canonical: page.canonical || null,
    updated_at: page.updatedAt,
    service_id: page.serviceId || null,
    icon: page.icon || null,
    cta: page.cta || null,
    estimate_preferred: page.estimatePreferred ?? false,
    related_ids: page.relatedIds || [],
    card_title: page.cardTitle || null,
    card_description: page.cardDescription || null,
    show_on_home: page.showOnHome ?? false
  };
}

export function mapRedirectRow(row: RedirectRow): RedirectRule {
  return {
    id: row.id,
    fromPath: row.from_path,
    toPath: row.to_path,
    createdAt: row.created_at
  };
}

export function mergePages(
  defaults: ManagedPage[],
  incoming: ManagedPage[]
): ManagedPage[] {
  const map = new Map(defaults.map(page => [page.id, page]));
  for (const page of incoming) {
    const current = map.get(page.id);
    map.set(page.id, {
      ...current,
      ...page,
      image: page.image || current?.image || "",
      imageAlt: page.imageAlt || current?.imageAlt || ""
    });
  }
  return [...map.values()];
}

export function mergeRedirects(
  defaults: RedirectRule[],
  incoming: RedirectRule[]
): RedirectRule[] {
  const map = new Map(defaults.map(rule => [rule.fromPath, rule]));
  for (const rule of incoming) {
    map.set(rule.fromPath, rule);
  }
  return [...map.values()];
}
