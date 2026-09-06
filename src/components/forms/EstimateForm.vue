<template>
  <q-card
    bordered
    flat
    class="surface-card"
    v-if="isSuccess"
  >
    <q-card-section class="q-pa-xl text-center">
      <q-icon
        name="mdi-check-circle"
        color="positive"
        size="56px"
      />
      <h2 class="text-h4 q-mt-md">Заявка отправлена</h2>
      <p class="muted">
        Мы получили информацию и свяжемся с вами.
      </p>
      <div class="row justify-center q-gutter-sm">
        <PhoneButton />
        <q-btn
          unelevated
          no-caps
          color="primary"
          label="На главную"
          to="/"
        />
      </div>
    </q-card-section>
  </q-card>

  <q-form
    v-else
    greedy
    @submit="onSubmit"
  >
    <q-banner
      v-if="errorMessage"
      rounded
      class="q-mb-md"
    >
      {{ errorMessage }}
    </q-banner>

    <q-linear-progress
      v-if="isSubmitting"
      color="secondary"
      class="q-mb-md"
    />

    <input
      v-model="form.website"
      class="honeypot"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
    />

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input
          v-model="form.name"
          outlined
          stack-label
          label="Имя"
          :rules="[requiredRule('Укажите имя')]"
        />
      </div>
      <div class="col-12 col-md-6">
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
      <div class="col-12">
        <q-select
          v-model="form.serviceType"
          outlined
          stack-label
          emit-value
          map-options
          label="Услуга"
          :options="serviceOptions"
          :rules="[requiredRule('Выберите услугу')]"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="form.description"
          outlined
          stack-label
          autogrow
          type="textarea"
          label="Комментарий"
          placeholder="Опишите повреждение или необходимый ремонт"
        />
      </div>
    </div>

    <PhotoUploader
      :photos="photos"
      class="q-mt-lg q-mb-lg"
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
  phoneRule,
  requiredRule
} from "@/composables/useFormRules";

const {
  form,
  photos,
  isSubmitting,
  isSuccess,
  errorMessage,
  serviceOptions,
  addFiles,
  removePhoto,
  submit
} = useEstimateForm();

async function onSubmit() {
  await submit();
}
</script>
