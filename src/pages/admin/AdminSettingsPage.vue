<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 q-mb-md">Настройки сайта</div>
    <p class="muted">
      Название, город и контакты хранятся здесь и используются в шапке, подвале,
      метаданных и разметке.
    </p>
    <q-form
      class="column q-gutter-md"
      style="max-width: 720px"
      @submit.prevent="save"
    >
      <div class="text-h6">Сервис</div>
      <q-input
        outlined
        label="Название сервиса"
        v-model="name"
      />
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-input
            outlined
            label="Город"
            v-model="city"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            outlined
            label="Город в предложном падеже"
            hint="Например: Минске"
            v-model="cityPrepositional"
          />
        </div>
      </div>
      <q-input
        outlined
        label="Улица и дом"
        v-model="street"
      />
      <q-input
        outlined
        label="Адрес целиком"
        hint="Если пусто, соберём из города и улицы"
        v-model="address"
      />

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
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-input
            outlined
            label="Широта"
            v-model="lat"
          />
        </div>
        <div class="col-12 col-sm-6">
          <q-input
            outlined
            label="Долгота"
            v-model="lng"
          />
        </div>
      </div>
      <q-input
        outlined
        label="Ссылка на карту"
        hint="Если пусто, кнопка откроет поиск в Яндекс.Картах по адресу"
        v-model="mapsUrl"
      />

      <div class="text-h6">Мессенджеры и профили</div>
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
      <q-input
        outlined
        autogrow
        type="textarea"
        label="Профили (по одному URL на строку)"
        hint="Только подтверждённые страницы. Попадут в sameAs."
        v-model="socialsText"
      />

      <div class="text-h6">Оформление и шаблоны</div>
      <q-input
        outlined
        label="Логотип (URL)"
        v-model="logo"
      />
      <q-file
        outlined
        label="Загрузить логотип"
        accept="image/jpeg,image/png,image/webp"
        @update:model-value="file => onUpload(file, 'logo')"
      />
      <q-input
        outlined
        label="Изображение для соцсетей (URL)"
        v-model="ogImage"
      />
      <q-file
        outlined
        label="Загрузить изображение для соцсетей"
        accept="image/jpeg,image/png,image/webp"
        @update:model-value="file => onUpload(file, 'ogImage')"
      />
      <q-input
        outlined
        label="Шаблон title с городом"
        hint="Переменные: {городе}, {название}"
        v-model="titleTemplate"
      />
      <q-input
        outlined
        label="Шаблон title без города"
        hint="Переменная: {название}"
        v-model="titleTemplateNoCity"
      />

      <div class="text-h6">Подтверждение и аналитика</div>
      <q-input
        outlined
        label="Код Яндекс Вебмастера"
        hint="Только значение мета-тега, без HTML"
        v-model="yandexVerification"
      />
      <q-input
        outlined
        label="Код Google Search Console"
        hint="Только значение мета-тега, без HTML"
        v-model="googleVerification"
      />
      <q-input
        outlined
        label="Номер счётчика Яндекс Метрики"
        hint="Только цифры"
        v-model="yandexMetrikaId"
      />
      <q-input
        outlined
        label="Идентификатор Google Analytics"
        hint="Например G-XXXXXXXX"
        v-model="gaMeasurementId"
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
  composeAddress,
  DEFAULT_MESSENGER_PREFILL,
  mergeMessengers,
  PHONE_PRIMARY_DISPLAY,
  PHONE_PRIMARY_RAW
} from "@/config/site";
import { uploadSiteMedia } from "@/composables/useAdminMedia";
import { useSeo } from "@/composables/useSeo";
import { supabase } from "@/lib/supabase";
import { useSiteStore } from "@/stores/site";
import type { MessengerLink, SitePhone, SocialLink } from "@/types/contact";
import type { SiteSettingsRow } from "@/types/content";
import {
  DEFAULT_TITLE_TEMPLATE,
  DEFAULT_TITLE_TEMPLATE_NO_CITY
} from "@/utils/seoTemplates";

useSeo();

const site = useSiteStore();
const saving = ref(false);

const name = ref(site.config.name);
const city = ref(site.config.city);
const cityPrepositional = ref(site.config.cityPrepositional);
const street = ref(site.config.street);
const phonePrimaryDisplay = ref(
  site.config.phones[0]?.display ?? PHONE_PRIMARY_DISPLAY
);
const phonePrimaryRaw = ref(site.config.phones[0]?.raw ?? PHONE_PRIMARY_RAW);
const address = ref(site.config.address);
const email = ref(site.config.email);
const hoursDisplay = ref(site.config.workingHours.display);
const hoursClosed = ref(site.config.workingHours.closed);
const lat = ref(String(site.config.businessLocation.lat ?? ""));
const lng = ref(String(site.config.businessLocation.lng ?? ""));
const mapsUrl = ref(site.config.businessLocation.mapsUrl);
const logo = ref(site.config.logo);
const ogImage = ref(site.config.seo.ogImage);
const titleTemplate = ref(site.config.seo.titleTemplate || DEFAULT_TITLE_TEMPLATE);
const titleTemplateNoCity = ref(
  site.config.seo.titleTemplateNoCity || DEFAULT_TITLE_TEMPLATE_NO_CITY
);
const yandexVerification = ref(site.config.yandexVerification);
const googleVerification = ref(site.config.googleVerification);
const yandexMetrikaId = ref(site.config.yandexMetrikaId);
const gaMeasurementId = ref(site.config.gaMeasurementId);
const socialsText = ref(site.config.socials.map(item => item.url).join("\n"));

const telegram = site.config.messengers.find(item => item.id === "telegram");
const viber = site.config.messengers.find(item => item.id === "viber");
const telegramEnabled = ref(Boolean(telegram?.enabled));
const telegramHandle = ref(telegram?.handle ?? "");
const viberEnabled = ref(Boolean(viber?.enabled));
const viberHandle = ref(viber?.handle ?? "");
const prefill = ref(telegram?.prefillMessage || DEFAULT_MESSENGER_PREFILL);

function parseSocials(): SocialLink[] {
  return socialsText.value
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean)
    .map(url => ({
      name: url.replace(/^https?:\/\//, "").split("/")[0] || "Профиль",
      url,
      icon: "mdi-open-in-new"
    }));
}

function parseCoord(value: string): number | null {
  const parsed = Number(value.trim());
  return Number.isFinite(parsed) ? parsed : null;
}

async function onUpload(file: File | File[] | null, field: "logo" | "ogImage") {
  const selected = Array.isArray(file) ? file[0] : file;
  if (!selected) return;
  try {
    const url = await uploadSiteMedia(`settings/${field}`, selected);
    if (field === "logo") logo.value = url;
    else ogImage.value = url;
    Notify.create({ type: "positive", message: "Файл загружен." });
  } catch (error) {
    Notify.create({
      type: "negative",
      message: error instanceof Error ? error.message : "Не удалось загрузить файл."
    });
  }
}

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

  const composed = composeAddress(city.value.trim(), street.value.trim());

  return {
    id: "default",
    name: name.value.trim(),
    city: city.value.trim(),
    city_prepositional: cityPrepositional.value.trim(),
    street: street.value.trim(),
    phones,
    email: email.value.trim(),
    address: address.value.trim() || composed,
    lat: parseCoord(lat.value),
    lng: parseCoord(lng.value),
    maps_url: mapsUrl.value.trim(),
    working_hours: {
      display: hoursDisplay.value.trim(),
      closed: hoursClosed.value.trim(),
      schema: site.config.workingHours.schema
    },
    messengers,
    socials: parseSocials(),
    logo: logo.value.trim(),
    og_image: ogImage.value.trim(),
    title_template: titleTemplate.value.trim(),
    title_template_no_city: titleTemplateNoCity.value.trim(),
    yandex_verification: yandexVerification.value.trim(),
    google_verification: googleVerification.value.trim(),
    yandex_metrika_id: yandexMetrikaId.value.trim().replace(/\D/g, ""),
    ga_measurement_id: gaMeasurementId.value.trim(),
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
    Notify.create({
      type: "positive",
      message: "Настройки сохранены. Для HTML в поиске нужна пересборка сайта."
    });
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
