<template>
  <section class="page-section page-shell">
    <SectionHeading
      eyebrow="Направления"
      title="Наши основные направления"
      subtitle="Технический ремонт, кузовной цех и покраска — три связанные услуги в одном сервисе."
    />
    <div class="row q-col-gutter-lg q-mt-lg">
      <div v-for="item in directions" :key="item.id" class="col-12 col-md-4">
        <q-card class="surface-card surface-card--interactive full-height">
          <q-card-section>
            <div class="surface-icon surface-icon--accent">
              <q-icon :name="item.icon" size="26px" />
            </div>
            <h3 class="text-h5 q-mt-md q-mb-sm">{{ item.title }}</h3>
            <p class="muted">{{ item.description }}</p>
            <q-list>
              <q-item v-for="line in item.items" :key="line" class="q-px-none">
                <q-item-section avatar>
                  <q-icon name="mdi-check" color="primary" />
                </q-item-section>
                <q-item-section>{{ line }}</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions class="q-pa-md">
            <q-btn
              class="full-width"
              unelevated
              no-caps
              color="primary"
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
