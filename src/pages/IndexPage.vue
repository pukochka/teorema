<template>
  <q-page class="bg-white">
    <HomeHero />
    <VehiclesSection />
    <DirectionsSection />
    <EquipmentSection />
    <HomeWorks />
    <ProcessSection />
    <FaqSection :items="faqItems" />
    <ReviewsSection />
    <div class="page-shell q-pb-xl">
      <ContactCTA
        title="Нужна запись или расчёт по фото?"
        text="Позвоните, оставьте заявку или отправьте фотографии автомобиля."
        :estimate-label="site.cta.clarifyPrice"
      />
    </div>
    <section class="page-section page-shell">
      <SectionHeading
        eyebrow="Контакты"
        title="Как нас найти"
        :subtitle="contactSubtitle"
      />
      <div class="q-mt-lg">
        <MapEmbed />
      </div>
    </section>
    <component
      :is="'script'"
      v-if="faqLd"
      type="application/ld+json"
      v-html="faqLd"
    />
  </q-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ContactCTA from "@/components/common/ContactCTA.vue";
import MapEmbed from "@/components/common/MapEmbed.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import DirectionsSection from "@/components/home/DirectionsSection.vue";
import EquipmentSection from "@/components/home/EquipmentSection.vue";
import FaqSection from "@/components/home/FaqSection.vue";
import HomeHero from "@/components/home/HomeHero.vue";
import HomeWorks from "@/components/home/HomeWorks.vue";
import ProcessSection from "@/components/home/ProcessSection.vue";
import ReviewsSection from "@/components/home/ReviewsSection.vue";
import VehiclesSection from "@/components/home/VehiclesSection.vue";
import { faqJsonLd, stringifyJsonLd } from "@/composables/useJsonLd";
import { useSeo } from "@/composables/useSeo";
import { useSiteStore } from "@/stores/site";

const store = useSiteStore();
const site = store.config;
const homePage = computed(() => store.pageByPath("/"));
const faqItems = computed(() => homePage.value?.faq ?? []);
const faqLd = computed(() => {
  const data = faqJsonLd(faqItems.value);
  return data ? stringifyJsonLd(data) : "";
});
const contactSubtitle = computed(() => {
  const hours = site.workingHours.display;
  const closed = site.workingHours.closed;
  return `${site.address}. ${hours}${closed ? `. ${closed}` : ""}`;
});

useSeo();
</script>
