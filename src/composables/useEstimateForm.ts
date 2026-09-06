import { reactive, ref } from "vue";
import { Notify } from "quasar";
import { supabase } from "@/boot/supabase";
import { serviceFormOptions } from "@/data/services";
import { useLeadsStore } from "@/stores/leads";
import type {
  EstimateFormPayload,
  EstimatePhoto,
  EstimateSubmitResult
} from "@/types/estimate";
import { isClient } from "@/utils/ssr";
import {
  ALLOWED_PHOTO_TYPES,
  MAX_PHOTO_COUNT,
  MAX_PHOTO_SIZE
} from "./useFormRules";

function createEmptyEstimate(): EstimateFormPayload {
  return {
    name: "",
    phone: "",
    serviceType: null,
    description: "",
    consent: false,
    website: "",
    startedAt: Date.now()
  };
}

function safeExtension(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase() || "";
  if (["jpg", "jpeg", "png", "webp"].includes(fromName)) return fromName;
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  return "jpg";
}

export function useEstimateForm() {
  const leads = useLeadsStore();
  const form = reactive<EstimateFormPayload>(createEmptyEstimate());
  const photos = ref<EstimatePhoto[]>([]);
  const isSubmitting = ref(false);
  const isSuccess = ref(false);
  const errorMessage = ref("");

  function addFiles(files: File[] | File | null) {
    const list = Array.isArray(files) ? files : files ? [files] : [];

    for (const file of list) {
      if (photos.value.length >= MAX_PHOTO_COUNT) {
        Notify.create({
          type: "warning",
          message: "Можно прикрепить не больше 10 фотографий"
        });
        break;
      }

      if (file.size > MAX_PHOTO_SIZE) {
        Notify.create({
          type: "negative",
          message: `${file.name}: файл больше 10 МБ`
        });
        continue;
      }

      const typeOk =
        ALLOWED_PHOTO_TYPES.includes(file.type) ||
        /\.(jpe?g|png|webp)$/i.test(file.name);
      if (!typeOk) {
        Notify.create({
          type: "negative",
          message: `${file.name}: допустимы JPG, PNG и WEBP`
        });
        continue;
      }

      const id = `${Date.now()}-${file.name}-${file.size}`;
      photos.value.push({
        id,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: isClient ? URL.createObjectURL(file) : ""
      });
    }
  }

  function removePhoto(id: string) {
    const current = photos.value.find(item => item.id === id);
    if (current?.previewUrl && isClient) {
      URL.revokeObjectURL(current.previewUrl);
    }
    photos.value = photos.value.filter(item => item.id !== id);
  }

  async function uploadPhotos(): Promise<string[]> {
    if (!supabase) return [];

    const paths: string[] = [];
    for (const photo of photos.value) {
      const ext = safeExtension(photo.file);
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage
        .from("repair-photos")
        .upload(path, photo.file, {
          contentType: photo.file.type || `image/${ext}`,
          upsert: false
        });

      if (error) {
        throw new Error("Не удалось загрузить фотографии");
      }
      paths.push(path);
    }
    return paths;
  }

  async function submit(): Promise<EstimateSubmitResult> {
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

      if (photos.value.length < 1) {
        throw new Error("Для фотооценки нужна минимум одна фотография");
      }

      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        serviceType: form.serviceType,
        description: form.description.trim(),
        startedAt: form.startedAt,
        turnstileToken: form.turnstileToken || ""
      };

      let photoPaths: string[] = [];
      if (supabase) {
        photoPaths = await uploadPhotos();
        const { data, error } = await supabase.functions.invoke(
          "submit-repair-estimate",
          { body: { ...payload, photoPaths } }
        );

        if (error) {
          throw new Error("Не удалось отправить заявку");
        }

        leads.addEstimate({ ...payload, photoPaths, id: data?.id });
        isSuccess.value = true;
        Notify.create({ type: "positive", message: "Заявка отправлена" });
        return {
          ok: true,
          id: data?.id,
          message: "Заявка отправлена"
        };
      }

      leads.addEstimate({ ...payload, photoPaths });
      isSuccess.value = true;
      Notify.create({
        type: "warning",
        message:
          "Заявка подготовлена, но отправка на сервер ещё не настроена. Позвоните нам, чтобы подтвердить обращение."
      });
      return {
        ok: true,
        message: "Заявка подготовлена. Позвоните, чтобы подтвердить обращение."
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
    Object.assign(form, createEmptyEstimate());
    photos.value.forEach(photo => {
      if (photo.previewUrl && isClient) {
        URL.revokeObjectURL(photo.previewUrl);
      }
    });
    photos.value = [];
    isSuccess.value = false;
    errorMessage.value = "";
  }

  return {
    form,
    photos,
    isSubmitting,
    isSuccess,
    errorMessage,
    serviceOptions: serviceFormOptions,
    addFiles,
    removePhoto,
    submit,
    reset
  };
}
