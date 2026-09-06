export type WorkCategory =
  | "all"
  | "sto"
  | "repair"
  | "painting"
  | "frame"
  | "polishing"
  | "body"
  | "accident"
  | "commercial";

export interface WorkProject {
  id: string;
  isDemo: boolean;
  brand: string;
  model: string;
  category: Exclude<WorkCategory, "all">;
  damage: string;
  works: string[];
  before: string;
  process: string;
  after: string;
}

export interface WorkFilter {
  category: WorkCategory;
  label: string;
}
