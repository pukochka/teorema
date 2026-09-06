<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="Коммерческий транспорт" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="Коммерческий транспорт"
        title="Ремонт и обслуживание коммерческого транспорта"
        subtitle="Обслуживаем микроавтобусы, фургоны и небольшие грузовые автомобили."
      />
      <p class="muted" style="max-width: 46rem">
        Работаем с распространённым малым коммерческим транспортом, включая
        {{ commercialBrands.join(", ") }}. Teorema Service не является
        официальным сервисом этих брендов — обслуживаем автомобили как
        независимый СТО.
      </p>
      <q-btn
        class="q-mt-md"
        unelevated
        no-caps
        color="secondary"
        text-color="dark"
        to="/booking"
        label="Записать коммерческий автомобиль"
      />
    </section>

    <section class="page-section page-shell">
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-6">
          <q-img
            :src="publicAsset('/images/commercial/van.jpg')"
            alt="Коммерческий автомобиль в сервисе"
            ratio="16/10"
          >
            <template #error>
              <MediaPlaceholder
                label="Фото коммерческого автомобиля появится здесь"
                icon="mdi-truck"
                min-height="260px"
              />
            </template>
          </q-img>
        </div>
        <div class="col-12 col-md-6">
          <q-list bordered class="rounded-borders">
            <q-item v-for="item in commercialServices" :key="item">
              <q-item-section avatar>
                <q-icon name="mdi-check-circle" color="primary" />
              </q-item-section>
              <q-item-section>{{ item }}</q-item-section>
            </q-item>
          </q-list>
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
import {
  commercialBrands,
  commercialServices
} from "@/data/commercialVehicles";
import { useSeo } from "@/composables/useSeo";
import { publicAsset } from "@/utils/publicAsset";

useSeo();
</script>
