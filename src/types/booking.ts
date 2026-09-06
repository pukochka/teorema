export interface BookingFormPayload {
  name: string;
  phone: string;
  service: string;
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
