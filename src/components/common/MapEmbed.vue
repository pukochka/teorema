<template>
  <q-card flat bordered class="map-embed">
    <q-card-section v-if="hasCoordinates" class="q-pa-none">
      <iframe
        class="map-embed__frame"
        :src="embedUrl"
        :title="`Карта: ${location.address}`"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </q-card-section>
    <q-card-section v-else class="column items-center text-center q-pa-xl">
      <q-icon name="mdi-map" size="40px" color="primary" />
      <div class="text-h6 q-mt-md">{{ location.address }}</div>
      <p class="muted">
        Координаты появятся здесь после уточнения. Пока можно открыть адрес в
        картах.
      </p>
      <q-btn
        unelevated
        no-caps
        color="primary"
        icon="mdi-open-in-new"
        label="Открыть адрес в картах"
        :href="searchUrl"
        target="_blank"
        rel="noopener noreferrer"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSiteStore } from "@/stores/site";

const location = computed(() => useSiteStore().config.businessLocation);

const hasCoordinates = computed(
  () => location.value.lat !== null && location.value.lng !== null
);

const embedUrl = computed(() => {
  if (!hasCoordinates.value) return "";
  return `https://yandex.ru/map-widget/v1/?ll=${location.value.lng},${location.value.lat}&z=16&pt=${location.value.lng},${location.value.lat},pm2rdm`;
});

const searchUrl = computed(
  () =>
    `https://yandex.ru/maps/?text=${encodeURIComponent(location.value.address)}`
);
</script>

<style lang="scss" scoped>
.map-embed__frame {
  display: block;
  width: 100%;
  min-height: 240px;
  border: 0;
}

@media (min-width: 1024px) {
  .map-embed__frame {
    min-height: 320px;
  }
}
</style>
