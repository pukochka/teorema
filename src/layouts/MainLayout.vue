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
import { toTelegramHref } from "@/composables/useMessengers";
import { useSeo } from "@/composables/useSeo";
import { BUSINESS_CITY } from "@/config/site";
import { useSiteStore } from "@/stores/site";
import AppDrawer from "@/components/layout/AppDrawer.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import AppHeader from "@/components/layout/AppHeader.vue";
import MobileActionBar from "@/components/layout/MobileActionBar.vue";

useSeo();

const site = useSiteStore();

const jsonLd = computed(() => {
  const telegram = site.config.messengers.find(
    item => item.id === "telegram" && item.enabled && item.handle.trim()
  );
  const location = site.config.businessLocation;
  const telephone = site.config.phones.map(phone => phone.raw);

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: site.config.name,
    telephone: telephone.length === 1 ? telephone[0] : telephone,
    url: site.config.seo.siteUrl || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: BUSINESS_CITY,
      addressCountry: "BY"
    },
    geo:
      location.lat !== null && location.lng !== null
        ? {
            "@type": "GeoCoordinates",
            latitude: location.lat,
            longitude: location.lng
          }
        : undefined,
    openingHours: site.config.workingHours.schema,
    sameAs: telegram ? [toTelegramHref(telegram.handle)] : undefined
  });
});
</script>
