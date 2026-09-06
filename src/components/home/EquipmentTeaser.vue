<template>
  <section class="page-section page-shell">
    <SectionHeading
      eyebrow="Цех"
      title="Оборудование"
      subtitle="Покрасочная камера, стапель, подъёмники и диагностика — в одном сервисе."
    />
    <div class="row q-col-gutter-md q-mt-lg">
      <div
        v-for="item in equipmentItems.slice(0, 3)"
        :key="item.id"
        class="col-12 col-md-4"
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
                min-height="180px"
              />
            </template>
          </q-img>
          <q-card-section>
            <div class="text-h6">{{ item.title }}</div>
            <p class="muted q-mb-none">{{ item.description }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-btn
      class="q-mt-lg"
      outline
      no-caps
      color="primary"
      to="/equipment"
      label="Всё оборудование"
    />
  </section>
</template>

<script setup lang="ts">
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import { equipmentItems } from "@/data/equipment";
import { publicAsset } from "@/utils/publicAsset";
</script>
