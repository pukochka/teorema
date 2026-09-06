<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="Автопарки" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="Автопарки"
        title="Обслуживание корпоративных автопарков"
        subtitle="Teorema Service работает с компаниями, которым необходимо регулярно обслуживать несколько автомобилей."
      />
    </section>

    <section class="page-section page-shell">
      <div class="row q-col-gutter-md">
        <div
          v-for="item in fleetBenefits"
          :key="item.title"
          class="col-12 col-sm-6 col-lg-4"
        >
          <q-card class="surface-card full-height" flat bordered>
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

    <section class="page-section page-shell">
      <SectionHeading
        title="Оставить заявку"
        subtitle="Опишите автопарк — мы свяжемся и обсудим формат обслуживания."
      />
      <q-card class="q-mt-lg" flat bordered>
        <q-card-section>
          <FleetForm />
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import FleetForm from "@/components/forms/FleetForm.vue";
import { fleetBenefits } from "@/data/commercialVehicles";
import { useSeo } from "@/composables/useSeo";

useSeo();
</script>
