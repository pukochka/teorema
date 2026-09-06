<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="Цены" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="Стоимость"
        :title="page?.h1 || 'Цены на услуги'"
        :subtitle="
          page?.subtitle ||
          'Мы не публикуем выдуманные прайсы. Стоимость работ зависит от автомобиля и фактического объёма ремонта.'
        "
      />

      <q-list bordered class="rounded-borders q-mt-xl">
        <q-expansion-item
          v-for="category in priceCategories"
          :key="category.id"
          :icon="category.icon"
          :label="category.title"
          :caption="category.note"
        >
          <q-card>
            <q-card-section>
              <q-banner rounded class="q-mb-md bg-blue-1">
                {{ category.note }}
              </q-banner>
              <q-separator class="q-my-md" />
              <q-btn
                v-if="category.estimatePreferred"
                unelevated
                no-caps
                color="secondary"
                text-color="dark"
                to="/estimate"
                label="Отправить фотографии"
              />
              <q-btn
                v-else
                unelevated
                no-caps
                color="primary"
                to="/booking"
                label="Записаться на сервис"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </section>
    <div class="page-shell q-pb-xl">
      <ContactCTA :estimate-label="store.config.cta.clarifyPrice" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ContactCTA from "@/components/common/ContactCTA.vue";
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import { computed } from "vue";
import { priceCategoriesFromServices } from "@/data/services";
import { useSeo } from "@/composables/useSeo";
import { useSiteStore } from "@/stores/site";

const store = useSiteStore();
const page = computed(() => store.pageByPath("/prices"));
const priceCategories = computed(() =>
  priceCategoriesFromServices(store.publishedServices)
);

useSeo();
</script>
