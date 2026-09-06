import type { MessengerLink, Review, SitePhone, WorkingHours } from "./contact";
import type { WorkCategory, WorkProject } from "./work";

export interface SiteSettingsRow {
  id: string;
  phones: SitePhone[];
  email: string | null;
  address: string | null;
  working_hours: WorkingHours | null;
  messengers: MessengerLink[];
  updated_at: string;
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
