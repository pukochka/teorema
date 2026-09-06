<template>
  <section class="page-section page-shell">
    <SectionHeading
      eyebrow="Услуги"
      title="Популярные услуги"
      subtitle="Выберите направление — откроется страница с подробностями и записью."
    />
    <div class="row q-col-gutter-md q-mt-lg">
      <div
        v-for="service in popularServices"
        :key="service.id"
        class="col-12 col-sm-6 col-lg-3"
      >
        <ServiceCard :service="service" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from "@/components/common/SectionHeading.vue";
import ServiceCard from "@/components/services/ServiceCard.vue";
import { popularServices } from "@/data/services";
</script>
