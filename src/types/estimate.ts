import type { VehicleType } from "./vehicle";

export type EstimateServiceType =
  | "body-repair"
  | "painting"
  | "frame"
  | "accident"
  | "mechanical"
  | "diagnostics"
  | "other";

export interface EstimatePhoto {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl: string;
}

export interface EstimateFormPayload {
  name: string;
  phone: string;
  email: string;
  vehicleType: VehicleType | null;
  brand: string;
  model: string;
  year: number | null;
  plate: string;
  vin: string;
  serviceType: EstimateServiceType | null;
  description: string;
  consent: boolean;
  website: string;
  startedAt: number;
  turnstileToken?: string;
}

export interface EstimateSubmitResult {
  ok: boolean;
  id?: string;
  message: string;
}

export const ESTIMATE_SERVICE_OPTIONS: {
  label: string;
  value: EstimateServiceType;
}[] = [
  { label: "Кузовной ремонт", value: "body-repair" },
  { label: "Покраска", value: "painting" },
  { label: "Стапельные работы", value: "frame" },
  { label: "Ремонт после ДТП", value: "accident" },
  { label: "Механический ремонт", value: "mechanical" },
  { label: "Диагностика", value: "diagnostics" },
  { label: "Другое", value: "other" }
];
