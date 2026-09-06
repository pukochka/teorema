<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="Оборудование" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="Цех"
        title="Оборудование"
        subtitle="Покрасочная камера, стапель, подъёмники, диагностика и шиномонтаж."
      />
      <div class="row q-col-gutter-lg q-mt-lg">
        <div
          v-for="item in equipmentItems"
          :key="item.id"
          class="col-12 col-md-6"
        >
          <q-card class="surface-card full-height" flat bordered>
            <q-img
              :src="publicAsset(item.image)"
              :alt="item.imageAlt"
              ratio="16/10"
            >
              <template #error>
                <MediaPlaceholder
                  label="Фото оборудования появится здесь"
                  :icon="item.icon"
                  min-height="220px"
                />
              </template>
              <template #loading>
                <q-skeleton height="100%" square />
              </template>
            </q-img>
            <q-card-section>
              <div class="surface-icon">
                <q-icon :name="item.icon" size="22px" />
              </div>
              <div class="text-h6 q-mt-sm">{{ item.title }}</div>
              <p class="muted q-mb-none">{{ item.description }}</p>
            </q-card-section>
          </q-card>
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
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import { equipmentItems } from "@/data/equipment";
import { useSeo } from "@/composables/useSeo";
import { publicAsset } from "@/utils/publicAsset";

useSeo();
</script>
