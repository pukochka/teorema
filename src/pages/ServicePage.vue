<template>
  <q-page
    class="bg-white"
    v-if="service"
  >
    <section class="page-section page-shell">
      <PageCrumbs :label="service.title" />
      <SectionHeading
        heading-tag="h1"
        :eyebrow="service.title"
        :title="service.pageTitle"
        :subtitle="service.pageSubtitle"
      />
      <p class="text-body1 q-mt-md q-mb-none">
        {{ service.description }}
      </p>
      <div class="cta-row q-mt-lg">
        <q-btn
          unelevated
          no-caps
          color="secondary"
          text-color="dark"
          to="/booking"
          label="Записаться"
        />
        <q-btn
          v-if="service.estimatePreferred"
          unelevated
          no-caps
          color="primary"
          to="/estimate"
          label="Оценить по фото"
        />
      </div>
    </section>

    <div class="page-shell q-pb-xl">
      <ContactCTA />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import ContactCTA from "@/components/common/ContactCTA.vue";
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import { getCoreService } from "@/data/services";
import { useSeo } from "@/composables/useSeo";

const route = useRoute();
const service = computed(() => getCoreService(route.meta.serviceId));

useSeo();
</script>
