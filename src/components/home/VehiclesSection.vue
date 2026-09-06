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
          <MediaPlaceholder
            variant="card"
            :src="item.image"
            :alt="item.imageAlt"
            :label="item.shotLabel"
            :hint="item.shotHint"
            :ratio="16 / 10"
          />
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
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";

const items = [
  {
    id: "cars",
    title: "Легковые автомобили",
    icon: "mdi-car",
    text: "Плановое обслуживание, ремонт, кузовные работы, покраска и дополнительные услуги.",
    image: "/images/vehicles/cars.jpg",
    imageAlt: "Легковой автомобиль в боксе Teorema Service",
    shotLabel: "Легковой автомобиль в боксе",
    shotHint: "Кадр 16:10: машина на посту, без крупных номеров и лиц"
  },
  {
    id: "lcv",
    title: "Лёгкий коммерческий транспорт",
    icon: "mdi-van-utility",
    text: "Принимаем лёгкий коммерческий транспорт, включая небольшие грузовики. Возможность работ по конкретному автомобилю уточняйте при обращении.",
    image: "/images/vehicles/lcv.jpg",
    imageAlt: "Лёгкий коммерческий транспорт в сервисе",
    shotLabel: "Фургон или небольшой грузовик",
    shotHint: "Кадр 16:10: LCV у ворот или в боксе, без рекламы на заднем плане"
  }
];
</script>
