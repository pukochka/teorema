<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="Оценка по фото" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="Фотооценка"
        :title="page?.h1 || 'Уточнить стоимость по фото'"
        :subtitle="
          hasMessengers
            ? 'Отправьте фото в Telegram или Viber — или прикрепите их в форме ниже.'
            : 'Прикрепите фотографии повреждения — мы предварительно оценим объём работ и свяжемся с вами.'
        "
      />
      <MessengerPrompt
        class="q-mt-xl"
        title="Или отправьте фото в мессенджер"
        text="Напишите в Telegram или Viber и приложите снимки повреждения."
        :message="estimateMessage"
      />
      <q-card class="q-mt-xl" flat bordered>
        <q-card-section>
          <div v-if="hasMessengers" class="q-mb-lg">
            <div class="text-h6">Или заполните форму на сайте</div>
            <p class="muted q-mb-none">
              Прикрепите фотографии — мы оценим объём работ и свяжемся с вами.
            </p>
          </div>
          <EstimateForm />
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import MessengerPrompt from "@/components/common/MessengerPrompt.vue";
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import EstimateForm from "@/components/forms/EstimateForm.vue";
import { computed } from "vue";
import { ESTIMATE_MESSENGER_PREFILL } from "@/config/site";
import { useMessengers } from "@/composables/useMessengers";
import { useSeo } from "@/composables/useSeo";
import { useSiteStore } from "@/stores/site";

const page = computed(() => useSiteStore().pageByPath("/estimate"));
const { hasMessengers } = useMessengers();
const estimateMessage = ESTIMATE_MESSENGER_PREFILL;
useSeo();
</script>
