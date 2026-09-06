<template>
  <section
    v-if="works.length"
    class="page-section page-shell"
  >
    <SectionHeading
      eyebrow="Работы"
      title="Примеры выполненных работ"
      subtitle="Реальные автомобили, которые прошли сервис."
    />
    <div class="q-mt-lg">
      <WorkGallery />
    </div>
    <q-btn
      outline
      no-caps
      color="primary"
      class="q-mt-lg"
      to="/works"
      label="Все работы"
    />
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import SectionHeading from "@/components/common/SectionHeading.vue";
import WorkGallery from "@/components/works/WorkGallery.vue";
import { useSiteStore } from "@/stores/site";

const { works } = storeToRefs(useSiteStore());
</script>
