import type { CoreServiceId } from "./service";

export type EstimateServiceType = CoreServiceId;

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
