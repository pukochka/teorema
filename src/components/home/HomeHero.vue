<template>
  <section class="home-hero">
    <div class="page-shell">
      <div class="home-hero__grid">
        <div class="home-hero__content">
          <q-badge
            v-if="cityBadge"
            color="accent"
            text-color="dark"
            class="q-mb-md"
          >
            {{ cityBadge }}
          </q-badge>

          <h1 class="heading-display q-ma-none">
            {{ page?.h1 || fallbackH1 }}
          </h1>
          <p class="q-mt-md text-body1">
            {{ page?.subtitle || fallbackSubtitle }}
          </p>
          <div class="hero-highlights q-mb-lg">
            <q-chip
              outline
              dense
              color="primary"
              :key="item.id"
              v-for="item in highlights"
            >
              {{ item.title }}
            </q-chip>
          </div>
          <div class="cta-row q-mb-lg">
            <q-btn
              unelevated
              no-caps
              color="secondary"
              text-color="dark"
              icon="mdi-calendar"
              to="/booking"
              :label="site.cta.book"
            />
            <q-btn
              unelevated
              no-caps
              color="primary"
              icon="mdi-camera"
              to="/estimate"
              :label="site.cta.clarifyPrice"
            />
          </div>
          <div class="column q-gutter-sm">
            <PhoneButton
              flat
              color="primary"
            />
            <router-link
              class="home-hero__address"
              to="/contacts"
            >
              <q-icon
                name="mdi-map-marker"
                color="primary"
                size="20px"
              />
              <span class="q-ml-xs">{{ site.address }}</span>
            </router-link>
          </div>
        </div>

        <div class="home-hero__media">
          <MediaPlaceholder
            variant="hero"
            :src="page?.image"
            :alt="page?.imageAlt || 'Фасад сервиса или автомобиль в боксе'"
            label="Фото фасада или авто в боксе"
            hint="Горизонтальный кадр 4:3: въезд, фасад или машина в боксе. Без рекламных щитов."
            :ratio="4 / 3"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import PhoneButton from "@/components/common/PhoneButton.vue";
import { useSiteStore } from "@/stores/site";

const store = useSiteStore();
const site = store.config;
const page = computed(() => store.pageByPath("/"));
const highlights = computed(() => store.homeServiceCards);
const cityBadge = computed(() =>
  site.city ? `Автосервис в ${site.cityPrepositional || site.city}` : "Автосервис"
);
const fallbackH1 =
  "Обслуживание и ремонт легковых автомобилей и лёгкого коммерческого транспорта";
const fallbackSubtitle =
  "От планового обслуживания до ремонта любой сложности. Кузовной ремонт на стапеле, покраска в камере, шиномонтаж, заправка кондиционеров и полировка кузова — в одном автосервисе";
</script>
