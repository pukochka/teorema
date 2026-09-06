<template>
  <section class="home-hero brand-diagonal">
    <BrandStripe variant="hero" />
    <div class="page-shell">
      <div class="row q-col-gutter-xl items-center">
        <div class="col-12 col-md-6">
          <q-badge color="accent" text-color="dark" class="q-mb-md">
            СТО в Минске
          </q-badge>
          <h1 class="heading-display q-ma-none">
            СТО, кузовной ремонт и покраска автомобилей
          </h1>
          <p class="q-mt-md text-body1">
            Обслуживаем легковые автомобили и малый коммерческий транспорт.
            Технический ремонт, восстановление после ДТП, стапельные работы и
            профессиональная покраска в одном месте.
          </p>
          <div class="hero-highlights q-mb-lg">
            <q-chip
              v-for="item in highlights"
              :key="item"
              outline
              color="primary"
              dense
            >
              {{ item }}
            </q-chip>
          </div>
          <div v-if="hasMessengers" class="q-mb-md">
            <MessengerButtons />
          </div>
          <div class="cta-row q-mb-lg">
            <q-btn
              unelevated
              no-caps
              color="secondary"
              text-color="dark"
              icon="mdi-camera"
              :label="site.cta.estimate"
              to="/estimate"
            />
            <q-btn
              unelevated
              no-caps
              color="primary"
              icon="mdi-calendar"
              :label="site.cta.book"
              to="/booking"
            />
          </div>
          <div class="column q-gutter-sm">
            <PhoneButton flat color="primary" />
            <div class="row items-center no-wrap">
              <q-icon name="mdi-map-marker" color="primary" size="20px" />
              <span class="q-ml-xs">{{ site.address }}</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="home-hero__media">
            <q-img
              :src="publicAsset('/images/hero/workshop.jpg')"
              alt="Цех Teorema Service: ремонт, кузовные работы и покраска"
              ratio="4/3"
              fit="cover"
              class="home-hero__image"
            >
              <template #loading>
                <q-skeleton height="100%" square />
              </template>
              <template #error>
                <MediaPlaceholder
                  label="Фото цеха появится здесь"
                  icon="mdi-camera"
                  min-height="320px"
                />
              </template>
            </q-img>
            <q-card class="home-hero__float home-hero__float--one">
              <q-card-section class="row items-center no-wrap q-pa-sm">
                <q-icon name="mdi-format-paint" color="secondary" size="22px" />
                <q-badge color="accent" text-color="dark" class="q-ml-sm">
                  Покрасочная камера
                </q-badge>
              </q-card-section>
            </q-card>
            <q-card class="home-hero__float home-hero__float--two">
              <q-card-section class="row items-center no-wrap q-pa-sm">
                <q-icon name="mdi-ruler-square" color="primary" size="22px" />
                <span class="q-ml-sm text-weight-medium"
                  >Стапельные работы</span
                >
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BrandStripe from "@/components/common/BrandStripe.vue";
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import MessengerButtons from "@/components/common/MessengerButtons.vue";
import PhoneButton from "@/components/common/PhoneButton.vue";
import { useMessengers } from "@/composables/useMessengers";
import { useSiteStore } from "@/stores/site";
import { publicAsset } from "@/utils/publicAsset";

const site = useSiteStore().config;
const { hasMessengers } = useMessengers();
const highlights = ["Механика", "Кузовной ремонт", "Покраска", "Стапель"];
</script>

<style lang="scss" scoped>
.home-hero {
  position: relative;
  padding: 32px 0 24px;
  background:
    linear-gradient(180deg, rgba(7, 133, 180, 0.08), transparent 42%), #fff;
}

.hero-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.home-hero__media {
  position: relative;
}

.home-hero__image {
  border-radius: 24px;
  overflow: hidden;
}

.home-hero__float {
  position: absolute;
  z-index: 2;
}

.home-hero__float--one {
  top: 16px;
  left: 16px;
}

.home-hero__float--two {
  right: 16px;
  bottom: 24px;
}

@media (max-width: 599px) {
  .home-hero {
    padding: 24px 0 16px;
  }

  .home-hero__float {
    display: none;
  }
}

@media (min-width: 1024px) {
  .home-hero {
    padding: 48px 0 32px;
  }
}
</style>
