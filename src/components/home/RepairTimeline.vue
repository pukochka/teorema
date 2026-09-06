<template>
  <section class="page-section page-shell">
    <SectionHeading
      eyebrow="Процесс"
      title="Как проходит ремонт"
      subtitle="От приёма автомобиля до выдачи — понятная последовательность работ."
    />
    <q-timeline color="primary" class="q-mt-lg">
      <q-timeline-entry
        v-for="step in bodyRepairStages"
        :key="step.id"
        :title="`${step.id} ${step.title}`"
        :subtitle="step.description"
        icon="mdi-check-circle"
      />
    </q-timeline>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from "@/components/common/SectionHeading.vue";
import { bodyRepairStages } from "@/data/services";
</script>
