<template>
  <q-card v-if="isSuccess" class="surface-card" flat bordered>
    <q-card-section class="q-pa-xl text-center">
      <q-icon name="mdi-check-circle" color="positive" size="56px" />
      <h2 class="text-h4 q-mt-md">Заявка отправлена</h2>
      <p class="muted">
        Мы получили информацию об автомобиле и свяжемся с вами.
      </p>
      <div class="row justify-center q-gutter-sm">
        <PhoneButton />
        <q-btn unelevated no-caps color="primary" label="На главную" to="/" />
      </div>
    </q-card-section>
  </q-card>

  <q-form v-else greedy @submit="onSubmit">
    <q-banner v-if="errorMessage" class="q-mb-md" rounded>
      {{ errorMessage }}
    </q-banner>

    <q-linear-progress v-if="isSubmitting" color="secondary" class="q-mb-md" />

    <input
      v-model="form.website"
      class="honeypot"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
    />

    <h3 class="text-h6">Контактные данные</h3>
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-4">
        <q-input
          v-model="form.name"
          outlined
          stack-label
          label="Имя"
          :rules="[requiredRule('Укажите имя')]"
        />
      </div>
      <div class="col-12 col-md-4">
        <q-input
          v-model="form.phone"
          outlined
          stack-label
          label="Телефон"
          type="tel"
          inputmode="tel"
          :rules="[requiredRule('Укажите телефон'), phoneRule]"
        />
      </div>
      <div class="col-12 col-md-4">
        <q-input
          v-model="form.email"
          outlined
          stack-label
          label="Email"
          type="email"
          :rules="[optionalEmailRule]"
        />
      </div>
    </div>

    <h3 class="text-h6">Тип автомобиля</h3>
    <q-select
      v-model="form.vehicleType"
      outlined
      stack-label
      emit-value
      map-options
      label="Тип автомобиля"
      :options="vehicleTypeOptions"
      :rules="[requiredRule('Выберите тип автомобиля')]"
      class="q-mb-lg"
    />

    <h3 class="text-h6">Автомобиль</h3>
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-6">
        <q-input v-model="form.brand" outlined stack-label label="Марка" />
      </div>
      <div class="col-12 col-md-6">
        <q-input v-model="form.model" outlined stack-label label="Модель" />
      </div>
      <div class="col-12 col-md-4">
        <q-input
          v-model.number="form.year"
          outlined
          stack-label
          label="Год"
          type="number"
          inputmode="numeric"
          :rules="[yearRule]"
        />
      </div>
      <div class="col-12 col-md-4">
        <q-input v-model="form.plate" outlined stack-label label="Госномер" />
      </div>
      <div class="col-12 col-md-4">
        <q-input v-model="form.vin" outlined stack-label label="VIN" />
      </div>
    </div>

    <h3 class="text-h6">Тип услуги</h3>
    <q-select
      v-model="form.serviceType"
      outlined
      stack-label
      emit-value
      map-options
      label="Необходимая услуга"
      :options="serviceOptions"
      :rules="[requiredRule('Выберите услугу')]"
      class="q-mb-lg"
    />

    <q-input
      v-model="form.description"
      outlined
      stack-label
      type="textarea"
      autogrow
      label="Описание"
      placeholder="Опишите повреждение или необходимый ремонт"
      class="q-mb-lg"
    />

    <PhotoUploader
      :photos="photos"
      class="q-mb-lg"
      @add="addFiles"
      @remove="removePhoto"
    />

    <q-checkbox
      v-model="form.consent"
      class="form-consent q-mt-md"
      label="Согласен на обработку данных"
      :rules="[consentRule]"
    />
    <ConsentNote class="q-mb-md" />

    <q-btn
      unelevated
      no-caps
      color="secondary"
      text-color="dark"
      type="submit"
      icon="mdi-send"
      label="Получить оценку"
      :loading="isSubmitting"
    />
  </q-form>
</template>

<script setup lang="ts">
import ConsentNote from "@/components/common/ConsentNote.vue";
import PhoneButton from "@/components/common/PhoneButton.vue";
import PhotoUploader from "./PhotoUploader.vue";
import { useEstimateForm } from "@/composables/useEstimateForm";
import {
  consentRule,
  optionalEmailRule,
  phoneRule,
  requiredRule,
  yearRule
} from "@/composables/useFormRules";

const {
  form,
  photos,
  isSubmitting,
  isSuccess,
  errorMessage,
  vehicleTypeOptions,
  serviceOptions,
  addFiles,
  removePhoto,
  submit
} = useEstimateForm();

async function onSubmit() {
  await submit();
}
</script>

<style scoped>
.form-consent {
  min-height: 44px;
}

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}
</style>
