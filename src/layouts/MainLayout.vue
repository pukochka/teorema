<template>
  <q-layout view="hHh Lpr fFf" class="main-layout">
    <AppHeader />
    <AppDrawer />

    <q-page-container class="mobile-action-offset">
      <router-view />
      <AppFooter />
    </q-page-container>

    <MobileActionBar />

    <component :is="'script'" type="application/ld+json" v-html="jsonLd" />
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { stringifyJsonLd, useAutoRepairJsonLd } from "@/composables/useJsonLd";
import { useSeo } from "@/composables/useSeo";
import AppDrawer from "@/components/layout/AppDrawer.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import MobileActionBar from "@/components/layout/MobileActionBar.vue";

useSeo();

const autoRepair = useAutoRepairJsonLd();
const jsonLd = computed(() => stringifyJsonLd(autoRepair.value));
</script>
