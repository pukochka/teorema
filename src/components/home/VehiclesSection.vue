<template>
  <section class="page-section page-shell">
    <SectionHeading
      eyebrow="Автомобили"
      title="Какие автомобили обслуживаем"
      subtitle="Легковые автомобили и лёгкий коммерческий транспорт, включая небольшие грузовики."
    />
    <div class="row q-col-gutter-lg q-mt-lg">
      <div
        v-for="item in items"
        :key="item.id"
        class="col-12 col-sm-6"
      >
        <q-card
          flat
          bordered
          class="surface-card full-height"
        >
          <q-card-section>
            <div class="surface-icon">
              <q-icon
                :name="item.icon"
                size="26px"
              />
            </div>
            <h3 class="text-h5 q-mt-md q-mb-sm">{{ item.title }}</h3>
            <p class="muted q-mb-none">{{ item.text }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from "@/components/common/SectionHeading.vue";

const items = [
  {
    id: "cars",
    title: "Легковые автомобили",
    icon: "mdi-car",
    text: "Плановое обслуживание, ремонт, кузовные работы, покраска и дополнительные услуги."
  },
  {
    id: "lcv",
    title: "Лёгкий коммерческий транспорт",
    icon: "mdi-van-utility",
    text: "Принимаем лёгкий коммерческий транспорт, включая небольшие грузовики. Возможность работ по конкретному автомобилю уточняйте при обращении."
  }
];
</script>
