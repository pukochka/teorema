<template>
  <section class="home-hero brand-diagonal">
    <BrandStripe variant="hero" />
    <div class="page-shell">
      <div class="home-hero__content">
        <q-badge
          color="accent"
          text-color="dark"
          class="q-mb-md"
        >
          СТО в Минске
        </q-badge>

        <h1 class="heading-display q-ma-none">
          СТО, ремонт любой сложности, стапель, покраска и полировка
        </h1>
        <p class="q-mt-md text-body1">
          Базовый автосервис: обслуживание, ремонт, стапель, покрасочная камера
          и полировка.
        </p>
        <div class="hero-highlights q-mb-lg">
          <q-chip
            outline
            dense
            color="primary"
            :key="item"
            v-for="item in highlights"
          >
            {{ item }}
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
            :label="site.cta.estimate"
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
    </div>
  </section>
</template>

<script setup lang="ts">
import BrandStripe from "@/components/common/BrandStripe.vue";
import PhoneButton from "@/components/common/PhoneButton.vue";
import { coreServices } from "@/data/services";
import { useSiteStore } from "@/stores/site";

const site = useSiteStore().config;
const highlights = coreServices.map(item => item.title);
</script>
