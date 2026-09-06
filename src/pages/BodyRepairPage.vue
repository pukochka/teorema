<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="Кузовной ремонт" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="Кузовной ремонт"
        title="Кузовной ремонт автомобилей"
        subtitle="Восстановление автомобиля после ДТП — от дефектовки и стапельных работ до подготовки, покраски и окончательной сборки."
      />
      <div class="cta-row q-mt-lg">
        <q-btn
          unelevated
          no-caps
          color="secondary"
          text-color="dark"
          to="/estimate"
          label="Оценить кузовной ремонт по фото"
        />
        <PhoneButton />
      </div>
    </section>

    <section class="page-section page-shell">
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-6">
          <q-img
            src="/images/workshop/body.jpg"
            alt="Кузовной цех Teorema Service"
            ratio="16/10"
          >
            <template #error>
              <MediaPlaceholder
                label="Фото кузовного цеха появится здесь"
                icon="mdi-car-wrench"
                min-height="280px"
              />
            </template>
          </q-img>
        </div>
        <div class="col-12 col-md-6">
          <div class="row q-col-gutter-md">
            <div
              v-for="section in bodyRepairSections"
              :key="section.id"
              class="col-12 col-sm-6"
            >
              <q-card class="surface-card full-height" flat bordered>
                <q-card-section>
                  <div class="surface-icon">
                    <q-icon :name="section.icon" size="22px" />
                  </div>
                  <div class="text-subtitle1 text-weight-bold q-mt-sm">{{
                    section.title
                  }}</div>
                  <p class="muted q-mb-none">{{ section.description }}</p>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </section>

    <RepairTimeline />
    <div class="page-shell q-pb-xl">
      <ContactCTA
        title="Не знаете, сколько будет стоить ремонт?"
        estimate-label="Оценить кузовной ремонт по фото"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ContactCTA from "@/components/common/ContactCTA.vue";
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import PhoneButton from "@/components/common/PhoneButton.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import RepairTimeline from "@/components/home/RepairTimeline.vue";
import { bodyRepairSections } from "@/data/services";
import { useSeo } from "@/composables/useSeo";

useSeo();
</script>
