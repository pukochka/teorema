<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="Наши работы" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="Портфолио"
        title="Наши работы"
        subtitle="Здесь будут реальные проекты кузовного ремонта, покраски и стапельных работ. Пока фотографии готовятся, структура карточек уже настроена."
      />
      <div class="q-mt-xl">
        <WorkGallery />
      </div>
      <div class="q-mt-xl">
        <SectionHeading
          title="Пример сравнения до и после"
          subtitle="Слот готов к реальным фотографиям."
        />
        <div class="q-mt-md">
          <BeforeAfterSlider />
        </div>
      </div>
    </section>
    <div class="page-shell q-pb-xl">
      <ContactCTA />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ContactCTA from "@/components/common/ContactCTA.vue";
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import BeforeAfterSlider from "@/components/works/BeforeAfterSlider.vue";
import WorkGallery from "@/components/works/WorkGallery.vue";
import { useSeo } from "@/composables/useSeo";

useSeo();
</script>
