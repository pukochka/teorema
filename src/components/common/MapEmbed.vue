<template>
  <q-card
    flat
    bordered
    class="map-embed surface-card"
  >
    <q-card-section class="q-pa-none">
      <iframe
        allowfullscreen
        class="map-embed__frame"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        :src="embedUrl"
        :title="`Карта: ${location.address}`"
      />
    </q-card-section>

    <q-card-actions class="map-embed__actions">
      <q-btn
        unelevated
        no-caps
        color="primary"
        icon="mdi-open-in-new"
        label="Открыть в Яндекс.Картах"
        target="_blank"
        rel="noopener noreferrer"
        :href="mapsHref"
        @click="onRouteClick"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAnalytics } from "@/composables/useAnalytics";
import { useSiteStore } from "@/stores/site";

const location = computed(() => useSiteStore().config.businessLocation);

const embedUrl = computed(() => {
  const text = encodeURIComponent(location.value.address);
  const lat = location.value.lat;
  const lng = location.value.lng;

  if (lat !== null && lng !== null) {
    return `https://yandex.ru/map-widget/v1/?ll=${lng},${lat}&z=17&pt=${lng},${lat},pm2rdm&mode=search&text=${text}`;
  }

  return `https://yandex.ru/map-widget/v1/?mode=search&text=${text}`;
});

const searchUrl = computed(
  () =>
    `https://yandex.ru/maps/?text=${encodeURIComponent(location.value.address)}`
);
const mapsHref = computed(
  () => location.value.mapsUrl || searchUrl.value
);
const { trackEvent } = useAnalytics();

function onRouteClick() {
  trackEvent("route_click");
}
</script>
