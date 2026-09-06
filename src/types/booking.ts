import type { VehicleType } from "./vehicle";

export interface BookingFormPayload {
  name: string;
  phone: string;
  brand: string;
  model: string;
  year: number | null;
  vehicleType: VehicleType | null;
  service: string;
  preferredDate: string;
  preferredTime: string;
  comment: string;
  consent: boolean;
  website: string;
  startedAt: number;
  turnstileToken?: string;
}

export interface BookingSubmitResult {
  ok: boolean;
  id?: string;
  message: string;
}
