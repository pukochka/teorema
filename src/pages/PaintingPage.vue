<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="Покраска" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="Покраска"
        title="Профессиональная покраска автомобилей"
        subtitle="Работы выполняются в покрасочной камере."
      />
    </section>

    <section class="page-shell q-pb-xl">
      <div class="painting-hero">
        <q-img
          :src="publicAsset('/images/painting/booth.jpg')"
          alt="Покрасочная камера Teorema Service"
          fit="cover"
          class="absolute-full"
        >
          <template #error>
            <MediaPlaceholder
              label="Фото покрасочной камеры появится здесь"
              icon="mdi-format-paint"
              min-height="100%"
            />
          </template>
        </q-img>
      </div>
      <div class="q-mt-md gt-xs">
        <VideoSlot label="Видео покраски появится здесь" />
      </div>
    </section>

    <section class="page-section page-shell">
      <div class="row q-col-gutter-md">
        <div
          v-for="item in paintingServices"
          :key="item"
          class="col-12 col-sm-6 col-md-4"
        >
          <q-card class="surface-card" flat>
            <q-card-section class="row items-center">
              <div class="surface-icon surface-icon--accent q-mr-sm">
                <q-icon name="mdi-format-paint" size="22px" />
              </div>
              <div class="text-subtitle1 text-weight-medium">{{ item }}</div>
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
import ContactCTA from "@/components/common/ContactCTA.vue";
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import VideoSlot from "@/components/common/VideoSlot.vue";
import { paintingServices } from "@/data/services";
import { useSeo } from "@/composables/useSeo";
import { publicAsset } from "@/utils/publicAsset";

useSeo();
</script>

<style lang="scss" scoped>
.painting-hero {
  position: relative;
  overflow: hidden;
  padding-bottom: 62.5%;
  border-radius: 24px;
}

@media (min-width: 1024px) {
  .painting-hero {
    padding-bottom: 42.86%;
  }
}
</style>
