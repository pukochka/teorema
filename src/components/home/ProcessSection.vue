<template>
  <section class="page-section page-shell">
    <SectionHeading
      eyebrow="Как записаться"
      title="Порядок обращения"
      subtitle="Оставляете контакты — уточняем объём работ и выполняем ремонт."
    />
    <div class="row q-col-gutter-md q-mt-lg">
      <div
        v-for="step in requestSteps"
        :key="step.id"
        class="col-12 col-md-4"
      >
        <q-card
          flat
          bordered
          class="surface-card full-height"
        >
          <q-card-section>
            <div class="process-step__index">{{ step.id }}</div>
            <h3 class="text-h6 q-mt-md">{{ step.title }}</h3>
            <p class="muted q-mb-none">{{ step.description }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="cta-row q-mt-lg">
      <q-btn
        unelevated
        no-caps
        color="secondary"
        text-color="dark"
        to="/booking"
        :label="site.cta.book"
      />
      <q-btn
        unelevated
        no-caps
        color="primary"
        to="/estimate"
        :label="site.cta.clarifyPrice"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from "@/components/common/SectionHeading.vue";
import { requestSteps } from "@/data/services";
import { useSiteStore } from "@/stores/site";

const site = useSiteStore().config;
</script>
