<template>
  <section class="page-section page-shell">
    <SectionHeading
      eyebrow="Оснащение"
      title="Камера, стапель и шиномонтаж"
      subtitle="Кузовные работы, покраска и сезонная смена шин — на оборудовании сервиса."
    />
    <div class="row q-col-gutter-md q-mt-lg">
      <div
        v-for="item in equipmentItems"
        :key="item.id"
        class="col-12 col-md-4"
      >
        <q-card
          flat
          bordered
          class="surface-card full-height"
        >
          <MediaPlaceholder
            variant="card"
            :src="item.image"
            :alt="item.imageAlt"
            :label="item.title"
            :hint="item.shotHint"
            :ratio="16 / 10"
          />
          <q-card-section>
            <div class="surface-icon q-mb-md">
              <q-icon
                :name="item.icon"
                size="26px"
              />
            </div>
            <h3 class="text-h6 q-mt-none">{{ item.title }}</h3>
            <p class="muted q-mb-none">{{ item.description }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import { equipmentItems } from "@/data/equipment";
</script>
