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
      <div class="text-h6">Телефоны</div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-input
            v-model="phonePrimaryDisplay"
            outlined
            label="Основной, как показывать"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            v-model="phonePrimaryRaw"
            outlined
            label="Основной, для звонка"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            v-model="phoneSecondaryDisplay"
            outlined
            label="Дополнительный, как показывать"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            v-model="phoneSecondaryRaw"
            outlined
            label="Дополнительный, для звонка"
          />
        </div>
      </div>

      <q-input v-model="address" outlined label="Адрес" />
      <q-input v-model="email" outlined label="Email" type="email" />
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-input v-model="hoursDisplay" outlined label="График" />
        </div>
        <div class="col-12 col-sm-6">
          <q-input v-model="hoursClosed" outlined label="Выходной" />
        </div>
      </div>

      <div class="text-h6">Мессенджеры</div>
      <q-input
        v-model="prefill"
        outlined
        type="textarea"
        autogrow
        label="Текст сообщения для записи"
      />
      <q-toggle v-model="telegramEnabled" label="Показывать Telegram" />
      <q-input
        v-model="telegramHandle"
        outlined
        label="Telegram username"
        hint="Без @, например teorema_service"
        :disable="!telegramEnabled"
      />
      <q-toggle v-model="viberEnabled" label="Показывать Viber" />
      <q-input
        v-model="viberHandle"
        outlined
        label="Номер Viber"
        hint="Например +375256669313"
        :disable="!viberEnabled"
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
  PHONE_PRIMARY_RAW,
  PHONE_SECONDARY_DISPLAY,
  PHONE_SECONDARY_RAW
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
const phoneSecondaryDisplay = ref(
  site.config.phones[1]?.display ?? PHONE_SECONDARY_DISPLAY
);
const phoneSecondaryRaw = ref(
  site.config.phones[1]?.raw ?? PHONE_SECONDARY_RAW
);
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
    },
    {
      raw: phoneSecondaryRaw.value.trim(),
      display: phoneSecondaryDisplay.value.trim(),
      label: "Дополнительный"
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
