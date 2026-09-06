<template>
  <q-card v-if="isSuccess" class="surface-card" flat bordered>
    <q-card-section class="q-pa-xl text-center">
      <q-icon name="mdi-office-building" color="positive" size="56px" />
      <h2 class="text-h4 q-mt-md">Заявка отправлена</h2>
      <p class="muted">Мы получили информацию и свяжемся с вами.</p>
      <PhoneButton />
    </q-card-section>
  </q-card>

  <q-form v-else greedy @submit="onSubmit">
    <q-banner v-if="errorMessage" class="q-mb-md" rounded>{{
      errorMessage
    }}</q-banner>
    <q-linear-progress v-if="isSubmitting" color="secondary" class="q-mb-md" />

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
          v-model="form.company"
          outlined
          stack-label
          label="Компания"
          :rules="[requiredRule('Укажите компанию')]"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="form.contactName"
          outlined
          stack-label
          label="Контактное лицо"
          :rules="[requiredRule('Укажите контактное лицо')]"
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
      <div class="col-12 col-md-6">
        <q-input
          v-model="form.email"
          outlined
          stack-label
          label="Email"
          type="email"
          :rules="[optionalEmailRule]"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="form.vehicleCount"
          outlined
          stack-label
          label="Количество автомобилей"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="form.vehicleTypes"
          outlined
          stack-label
          label="Тип автомобилей"
        />
      </div>
      <div class="col-12">
        <q-option-group
          v-model="form.services"
          type="checkbox"
          color="primary"
          :options="serviceOptions.map(item => ({ label: item, value: item }))"
        />
      </div>
      <div class="col-12">
        <q-input
          v-model="form.comment"
          outlined
          stack-label
          type="textarea"
          autogrow
          label="Комментарий"
        />
      </div>
    </div>

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
      icon="mdi-office-building"
      label="Обсудить обслуживание автопарка"
      :loading="isSubmitting"
    />
  </q-form>
</template>

<script setup lang="ts">
import ConsentNote from "@/components/common/ConsentNote.vue";
import PhoneButton from "@/components/common/PhoneButton.vue";
import { useFleetForm } from "@/composables/useFleetForm";
import {
  consentRule,
  optionalEmailRule,
  phoneRule,
  requiredRule
} from "@/composables/useFormRules";

const { form, isSubmitting, isSuccess, errorMessage, serviceOptions, submit } =
  useFleetForm();

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
