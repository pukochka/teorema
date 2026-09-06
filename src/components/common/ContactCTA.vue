<template>
  <section class="contact-cta q-mt-xl">
    <BrandStripe variant="cta" />
    <q-card
      flat
      class="contact-cta__card"
    >
      <q-card-section class="q-pa-lg q-pa-md-xl">
        <div class="eyebrow contact-cta__eyebrow">Teorema Service</div>
        <h2 class="section-heading text-white q-mt-sm q-mb-md">
          {{ title }}
        </h2>
        <p class="contact-cta__text q-mb-lg">
          {{ resolvedText }}
        </p>
        <div
          v-if="hasMessengers"
          class="q-mb-md"
        >
          <MessengerButtons :message="message" />
        </div>
        <div class="cta-row">
          <q-btn
            unelevated
            no-caps
            color="secondary"
            text-color="dark"
            icon="mdi-camera"
            :label="estimateLabel"
            :to="estimateTo"
          />
          <PhoneButton
            color="white"
            text-color="dark"
          />
        </div>
      </q-card-section>
    </q-card>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMessengers } from "@/composables/useMessengers";
import BrandStripe from "./BrandStripe.vue";
import MessengerButtons from "./MessengerButtons.vue";
import PhoneButton from "./PhoneButton.vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    text?: string;
    estimateLabel?: string;
    estimateTo?: string;
    message?: string | undefined;
  }>(),
  {
    title: "Не знаете, сколько будет стоить ремонт?",
    estimateLabel: "Оценить по фото",
    estimateTo: "/estimate"
  }
);

const { hasMessengers } = useMessengers();
const resolvedText = computed(() => {
  if (props.text) return props.text;
  return hasMessengers.value
    ? "Напишите в Telegram или Viber — ответим и запишем. Можно также отправить фото через форму."
    : "Отправьте фотографии автомобиля — мы предварительно оценим объём необходимых работ.";
});
</script>
