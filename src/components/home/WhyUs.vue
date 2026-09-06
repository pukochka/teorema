<template>
  <section class="page-section page-shell">
    <SectionHeading
      eyebrow="Почему мы"
      title="Почему Teorema Service"
      subtitle="Реальные возможности сервиса — без выдуманных цифр и рейтингов."
    />
    <div class="row q-col-gutter-md q-mt-lg">
      <div
        v-for="item in whyUsItems"
        :key="item.id"
        class="col-12 col-sm-6 col-lg-4"
      >
        <q-card class="surface-card full-height" flat>
          <q-card-section>
            <div class="surface-icon">
              <q-icon :name="item.icon" size="24px" />
            </div>
            <div class="text-h6 q-mt-md">{{ item.title }}</div>
            <p class="muted q-mb-none">{{ item.description }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from "@/components/common/SectionHeading.vue";
import { whyUsItems } from "@/data/services";
</script>
