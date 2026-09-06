<template>
  <q-card v-if="isSuccess" class="surface-card" flat bordered>
    <q-card-section class="q-pa-xl text-center">
      <q-icon name="mdi-calendar-check" color="positive" size="56px" />
      <h2 class="text-h4 q-mt-md">Заявка отправлена</h2>
      <p class="muted"
        >Мы получили информацию об автомобиле и свяжемся с вами.</p
      >
      <div class="row justify-center q-gutter-sm">
        <PhoneButton />
        <q-btn unelevated no-caps color="primary" label="На главную" to="/" />
      </div>
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
      <div class="col-12 col-md-4">
        <q-input
          v-model="form.brand"
          outlined
          stack-label
          label="Марка"
          :rules="[requiredRule('Укажите марку')]"
        />
      </div>
      <div class="col-12 col-md-4">
        <q-input
          v-model="form.model"
          outlined
          stack-label
          label="Модель"
          :rules="[requiredRule('Укажите модель')]"
        />
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
      <div class="col-12 col-md-6">
        <q-select
          v-model="form.vehicleType"
          outlined
          stack-label
          emit-value
          map-options
          label="Тип автомобиля"
          :options="vehicleTypeOptions"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-select
          v-model="form.service"
          outlined
          stack-label
          label="Услуга"
          :options="serviceOptions"
          :rules="[requiredRule('Выберите услугу')]"
        />
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="form.preferredDate"
          outlined
          stack-label
          label="Желаемая дата"
          mask="####-##-##"
        >
          <template #append>
            <q-icon name="mdi-calendar" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="form.preferredDate" mask="YYYY-MM-DD" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-12 col-md-6">
        <q-input
          v-model="form.preferredTime"
          outlined
          stack-label
          label="Предпочтительное время"
        >
          <template #append>
            <q-icon name="mdi-clock-outline" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="form.preferredTime" format24h />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
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
      icon="mdi-calendar"
      label="Записаться на сервис"
      :loading="isSubmitting"
    />
  </q-form>
</template>

<script setup lang="ts">
import ConsentNote from "@/components/common/ConsentNote.vue";
import PhoneButton from "@/components/common/PhoneButton.vue";
import { useBookingForm } from "@/composables/useBookingForm";
import {
  consentRule,
  phoneRule,
  requiredRule,
  yearRule
} from "@/composables/useFormRules";

const {
  form,
  isSubmitting,
  isSuccess,
  errorMessage,
  vehicleTypeOptions,
  serviceOptions,
  submit
} = useBookingForm();

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
