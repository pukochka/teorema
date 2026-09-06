export type PageStatus = "draft" | "published";

export type ManagedPageType = "home" | "service" | "static";

export type ServiceId =
  | "maintenance"
  | "repair"
  | "body-repair"
  | "painting"
  | "tires"
  | "ac"
  | "polishing";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContentBlock {
  id: string;
  title: string;
  text: string;
}

export interface ManagedPage {
  id: string;
  type: ManagedPageType;
  name: string;
  slug: string;
  path: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  subtitle: string;
  intro: string;
  blocks: ContentBlock[];
  faq: FaqItem[];
  image: string;
  imageAlt: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  status: PageStatus;
  robotsIndex: boolean;
  canonical: string;
  updatedAt: string;
  serviceId?: ServiceId;
  icon?: string;
  cta?: string;
  estimatePreferred?: boolean;
  relatedIds?: string[];
  cardTitle?: string;
  cardDescription?: string;
  showOnHome?: boolean;
}

export interface RedirectRule {
  id: string;
  fromPath: string;
  toPath: string;
  createdAt: string;
}

export interface SeoTemplateVars {
  name: string;
  city: string;
  cityPrepositional: string;
}
