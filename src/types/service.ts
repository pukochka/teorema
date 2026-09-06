import type { ServiceId } from "./page";

export type CoreServiceId = ServiceId;

export interface CoreService {
  id: CoreServiceId;
  title: string;
  description: string;
  pageTitle: string;
  pageSubtitle: string;
  icon: string;
  route: string;
  cta: string;
  seoTitle: string;
  seoDescription: string;
  estimatePreferred: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  items?: string[];
  cta?: string;
}

export interface DirectionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  cta: string;
}

export interface TrustItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
}

export interface PriceCategory {
  id: string;
  title: string;
  icon: string;
  note: string;
  items: string[];
  estimatePreferred: boolean;
}
