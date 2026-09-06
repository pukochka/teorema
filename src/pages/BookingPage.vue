<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="Запись" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="Онлайн-запись"
        title="Записаться на сервис"
        :subtitle="
          hasMessengers
            ? 'Самый быстрый способ — написать в Telegram или Viber. Форму можно оставить, если мессенджеры неудобны.'
            : 'Оставьте имя, телефон и услугу — мы подтвердим запись по телефону.'
        "
      />
      <MessengerPrompt class="q-mt-xl" />
      <q-card class="q-mt-xl" flat bordered>
        <q-card-section>
          <div v-if="hasMessengers" class="q-mb-lg">
            <div class="text-h6">Или оставьте заявку на сайте</div>
            <p class="muted q-mb-none">
              Мы свяжемся с вами по телефону и подтвердим время.
            </p>
          </div>
          <BookingForm />
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import MessengerPrompt from "@/components/common/MessengerPrompt.vue";
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import BookingForm from "@/components/forms/BookingForm.vue";
import { useMessengers } from "@/composables/useMessengers";
import { useSeo } from "@/composables/useSeo";

const { hasMessengers } = useMessengers();
useSeo();
</script>
