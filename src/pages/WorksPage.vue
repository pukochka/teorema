<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="Наши работы" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="Портфолио"
        :title="page?.h1 || 'Наши работы'"
        :subtitle="page?.subtitle || 'Публикуем только реальные фотографии выполненных работ.'"
      />
      <div class="q-mt-xl">
        <WorkGallery />
      </div>
    </section>
    <div class="page-shell q-pb-xl">
      <ContactCTA :estimate-label="site.cta.clarifyPrice" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ContactCTA from "@/components/common/ContactCTA.vue";
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import WorkGallery from "@/components/works/WorkGallery.vue";
import { useSeo } from "@/composables/useSeo";
import { useSiteStore } from "@/stores/site";

const store = useSiteStore();
const site = store.config;
const page = computed(() => store.pageByPath("/works"));

useSeo();
</script>
