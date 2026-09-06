import { reactive, ref } from "vue";
import { Notify } from "quasar";
import { supabase } from "@/boot/supabase";
import { fleetServiceOptions } from "@/data/services";
import { useLeadsStore } from "@/stores/leads";
import type { FleetFormPayload, FleetSubmitResult } from "@/types/fleet";

function createEmptyFleet(): FleetFormPayload {
  return {
    company: "",
    contactName: "",
    phone: "",
    email: "",
    vehicleCount: "",
    vehicleTypes: "",
    services: [],
    comment: "",
    consent: false,
    website: "",
    startedAt: Date.now()
  };
}

export function useFleetForm() {
  const leads = useLeadsStore();
  const form = reactive<FleetFormPayload>(createEmptyFleet());
  const isSubmitting = ref(false);
  const isSuccess = ref(false);
  const errorMessage = ref("");

  async function submit(): Promise<FleetSubmitResult> {
    isSubmitting.value = true;
    errorMessage.value = "";

    try {
      if (form.website) {
        isSuccess.value = true;
        return { ok: true, message: "Заявка отправлена" };
      }

      if (!form.consent) {
        throw new Error("Нужно согласие на обработку данных");
      }

      const payload = {
        company: form.company.trim(),
        contactName: form.contactName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        vehicleCount: form.vehicleCount.trim(),
        vehicleTypes: form.vehicleTypes.trim(),
        services: form.services,
        comment: form.comment.trim(),
        startedAt: form.startedAt,
        turnstileToken: form.turnstileToken || ""
      };

      if (supabase) {
        const { data, error } = await supabase.functions.invoke(
          "submit-fleet-request",
          { body: payload }
        );
        if (error) throw new Error("Не удалось отправить заявку");
        leads.addFleet({ ...payload, id: data?.id });
        isSuccess.value = true;
        Notify.create({ type: "positive", message: "Заявка отправлена" });
        return { ok: true, id: data?.id, message: "Заявка отправлена" };
      }

      leads.addFleet(payload);
      isSuccess.value = true;
      Notify.create({
        type: "warning",
        message:
          "Заявка подготовлена, но отправка на сервер ещё не настроена. Позвоните нам, чтобы обсудить обслуживание автопарка."
      });
      return {
        ok: true,
        message: "Заявка подготовлена. Позвоните, чтобы обсудить детали."
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
    Object.assign(form, createEmptyFleet());
    isSuccess.value = false;
    errorMessage.value = "";
  }

  return {
    form,
    isSubmitting,
    isSuccess,
    errorMessage,
    serviceOptions: fleetServiceOptions,
    submit,
    reset
  };
}
