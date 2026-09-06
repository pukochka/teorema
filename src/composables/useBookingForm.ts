import { reactive, ref } from "vue";
import { Notify } from "quasar";
import { supabase } from "@/boot/supabase";
import { bookingServiceOptions } from "@/data/services";
import { useLeadsStore } from "@/stores/leads";
import type { BookingFormPayload, BookingSubmitResult } from "@/types/booking";
import { VEHICLE_TYPE_OPTIONS } from "@/types/vehicle";

function createEmptyBooking(): BookingFormPayload {
  return {
    name: "",
    phone: "",
    brand: "",
    model: "",
    year: null,
    vehicleType: null,
    service: "",
    preferredDate: "",
    preferredTime: "",
    comment: "",
    consent: false,
    website: "",
    startedAt: Date.now()
  };
}

export function useBookingForm() {
  const leads = useLeadsStore();
  const form = reactive<BookingFormPayload>(createEmptyBooking());
  const isSubmitting = ref(false);
  const isSuccess = ref(false);
  const errorMessage = ref("");

  async function submit(): Promise<BookingSubmitResult> {
    isSubmitting.value = true;
    errorMessage.value = "";

    try {
      if (!form.consent) {
        throw new Error("Нужно согласие на обработку данных");
      }

      if (form.website) {
        isSuccess.value = true;
        return { ok: true, message: "Заявка отправлена" };
      }

      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        brand: form.brand.trim(),
        model: form.model.trim(),
        year: form.year,
        vehicleType: form.vehicleType,
        service: form.service,
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        comment: form.comment.trim(),
        startedAt: form.startedAt,
        turnstileToken: form.turnstileToken || ""
      };

      if (supabase) {
        const { data, error } = await supabase.functions.invoke(
          "submit-booking",
          { body: payload }
        );
        if (error) throw new Error("Не удалось отправить заявку");
        leads.addBooking({ ...payload, id: data?.id });
        isSuccess.value = true;
        Notify.create({ type: "positive", message: "Заявка отправлена" });
        return { ok: true, id: data?.id, message: "Заявка отправлена" };
      }

      leads.addBooking(payload);
      isSuccess.value = true;
      Notify.create({
        type: "warning",
        message:
          "Заявка подготовлена, но отправка на сервер ещё не настроена. Позвоните нам, чтобы подтвердить запись."
      });
      return {
        ok: true,
        message: "Заявка подготовлена. Позвоните, чтобы подтвердить запись."
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Не удалось отправить заявку";
      errorMessage.value = message;
      Notify.create({ type: "negative", message });
      return { ok: false, message };
    } finally {
      isSubmitting.value = false;
    }
  }

  function reset() {
    Object.assign(form, createEmptyBooking());
    isSuccess.value = false;
    errorMessage.value = "";
  }

  return {
    form,
    isSubmitting,
    isSuccess,
    errorMessage,
    vehicleTypeOptions: VEHICLE_TYPE_OPTIONS,
    serviceOptions: bookingServiceOptions,
    submit,
    reset
  };
}
