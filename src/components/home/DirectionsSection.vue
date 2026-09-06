<template>
  <section class="page-section page-shell">
    <SectionHeading
      eyebrow="Услуги"
      title="Что делаем"
      subtitle="Пять направлений — без лишней витрины."
    />
    <div class="row q-col-gutter-lg q-mt-lg">
      <div
        v-for="item in directions"
        :key="item.id"
        class="col-12 col-sm-6 col-lg-4"
      >
        <q-card class="surface-card surface-card--interactive full-height">
          <q-card-section>
            <div class="surface-icon surface-icon--accent">
              <q-icon :name="item.icon" size="26px" />
            </div>
            <h3 class="text-h5 q-mt-md q-mb-sm">{{ item.title }}</h3>
            <p class="muted q-mb-none">{{ item.description }}</p>
          </q-card-section>
          <q-card-actions class="q-pa-md">
            <q-btn
              unelevated
              no-caps
              color="primary"
              class="full-width"
              :to="item.route"
              :label="item.cta"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from "@/components/common/SectionHeading.vue";
import { directions } from "@/data/services";
</script>
