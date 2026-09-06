export interface FleetFormPayload {
  company: string;
  contactName: string;
  phone: string;
  email: string;
  vehicleCount: string;
  vehicleTypes: string;
  services: string[];
  comment: string;
  consent: boolean;
  website: string;
  startedAt: number;
  turnstileToken?: string;
}

export interface FleetSubmitResult {
  ok: boolean;
  id?: string;
  message: string;
}
