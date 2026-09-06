export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  items?: string[];
  cta?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: string[];
}

export interface DirectionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  items: string[];
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
}
