<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 q-mb-md">Контакты и мессенджеры</div>
    <p class="muted">
      Эти данные появляются в шапке, подвале, контактах и кнопках записи.
    </p>
    <q-form
      class="column q-gutter-md"
      style="max-width: 720px"
      @submit.prevent="save"
    >
      <div class="text-h6">Телефон</div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-input
            outlined
            label="Как показывать"
            v-model="phonePrimaryDisplay"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            outlined
            label="Для звонка"
            v-model="phonePrimaryRaw"
          />
        </div>
      </div>

      <q-input
        outlined
        label="Адрес"
        v-model="address"
      />
      <q-input
        outlined
        type="email"
        label="Email"
        v-model="email"
      />
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-input
            outlined
            label="График"
            v-model="hoursDisplay"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            outlined
            label="Выходной"
            v-model="hoursClosed"
          />
        </div>
      </div>

      <div class="text-h6">Мессенджеры</div>
      <q-input
        outlined
        autogrow
        type="textarea"
        label="Текст сообщения для записи"
        v-model="prefill"
      />
      <q-toggle
        label="Показывать Telegram"
        v-model="telegramEnabled"
      />
      <q-input
        outlined
        label="Telegram username"
        hint="Без @, например teorema_service"
        :disable="!telegramEnabled"
        v-model="telegramHandle"
      />
      <q-toggle
        label="Показывать Viber"
        v-model="viberEnabled"
      />
      <q-input
        outlined
        label="Номер Viber"
        hint="Например +375445189432"
        :disable="!viberEnabled"
        v-model="viberHandle"
      />

      <div>
        <q-btn
          unelevated
          no-caps
          color="primary"
          type="submit"
          label="Сохранить"
          :loading="saving"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Notify } from "quasar";
import {
  DEFAULT_MESSENGER_PREFILL,
  mergeMessengers,
  PHONE_PRIMARY_DISPLAY,
  PHONE_PRIMARY_RAW
} from "@/config/site";
import { useSeo } from "@/composables/useSeo";
import { supabase } from "@/lib/supabase";
import { useSiteStore } from "@/stores/site";
import type { MessengerLink, SitePhone } from "@/types/contact";
import type { SiteSettingsRow } from "@/types/content";

useSeo();

const site = useSiteStore();
const saving = ref(false);

const phonePrimaryDisplay = ref(
  site.config.phones[0]?.display ?? PHONE_PRIMARY_DISPLAY
);
const phonePrimaryRaw = ref(site.config.phones[0]?.raw ?? PHONE_PRIMARY_RAW);
const address = ref(site.config.address);
const email = ref(site.config.email);
const hoursDisplay = ref(site.config.workingHours.display);
const hoursClosed = ref(site.config.workingHours.closed);

const telegram = site.config.messengers.find(item => item.id === "telegram");
const viber = site.config.messengers.find(item => item.id === "viber");
const telegramEnabled = ref(Boolean(telegram?.enabled));
const telegramHandle = ref(telegram?.handle ?? "");
const viberEnabled = ref(Boolean(viber?.enabled));
const viberHandle = ref(viber?.handle ?? "");
const prefill = ref(telegram?.prefillMessage || DEFAULT_MESSENGER_PREFILL);

function buildPayload(): SiteSettingsRow {
  const phones: SitePhone[] = [
    {
      raw: phonePrimaryRaw.value.trim(),
      display: phonePrimaryDisplay.value.trim(),
      label: "Основной"
    }
  ].filter(phone => phone.raw || phone.display);

  const messengers: MessengerLink[] = mergeMessengers([
    {
      id: "telegram",
      name: "Telegram",
      handle: telegramHandle.value.trim(),
      icon: "mdi-telegram",
      enabled: telegramEnabled.value,
      prefillMessage: prefill.value.trim() || DEFAULT_MESSENGER_PREFILL
    },
    {
      id: "viber",
      name: "Viber",
      handle: viberHandle.value.trim(),
      icon: "mdi-chat",
      enabled: viberEnabled.value,
      prefillMessage: prefill.value.trim() || DEFAULT_MESSENGER_PREFILL
    }
  ]);

  return {
    id: "default",
    phones,
    email: email.value.trim(),
    address: address.value.trim(),
    working_hours: {
      display: hoursDisplay.value.trim(),
      closed: hoursClosed.value.trim(),
      schema: site.config.workingHours.schema
    },
    messengers,
    updated_at: new Date().toISOString()
  };
}

async function save() {
  const payload = buildPayload();
  saving.value = true;
  try {
    if (!supabase) {
      site.applySettings(payload);
      Notify.create({
        type: "warning",
        message: "Сохранено только в этой вкладке: Supabase не настроен."
      });
      return;
    }

    const { error } = await supabase.from("site_settings").upsert(payload);
    if (error) throw error;
    site.applySettings(payload);
    Notify.create({ type: "positive", message: "Контакты сохранены." });
  } catch (error) {
    Notify.create({
      type: "negative",
      message: error instanceof Error ? error.message : "Не удалось сохранить."
    });
  } finally {
    saving.value = false;
  }
}
</script>
