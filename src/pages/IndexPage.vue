<template>
  <q-page class="bg-white">
    <HomeHero />
    <DirectionsSection />
    <WhyUs />
    <ReviewsSection />
    <div class="page-shell q-pb-xl">
      <ContactCTA />
    </div>
    <section class="page-section page-shell">
      <SectionHeading
        eyebrow="Адрес"
        title="Как нас найти"
        :subtitle="site.address"
      />
      <div class="q-mt-lg">
        <MapEmbed />
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import ContactCTA from "@/components/common/ContactCTA.vue";
import MapEmbed from "@/components/common/MapEmbed.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import DirectionsSection from "@/components/home/DirectionsSection.vue";
import HomeHero from "@/components/home/HomeHero.vue";
import ReviewsSection from "@/components/home/ReviewsSection.vue";
import WhyUs from "@/components/home/WhyUs.vue";
import { useSeo } from "@/composables/useSeo";
import { useSiteStore } from "@/stores/site";

const site = useSiteStore().config;
useSeo();
</script>
