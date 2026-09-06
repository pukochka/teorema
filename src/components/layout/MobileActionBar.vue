<template>
  <q-footer class="mobile-action-bar lt-md">
    <q-toolbar class="mobile-action-bar__toolbar">
      <template v-if="hasMessengers">
        <q-btn
          v-if="telegram"
          flat
          no-caps
          stack
          class="col"
          target="_blank"
          rel="noopener noreferrer"
          :icon="telegram.icon"
          :label="telegram.name"
          :href="hrefFor(telegram)"
          :aria-label="site.config.cta.telegram"
        />
        <q-btn
          v-if="viber"
          flat
          no-caps
          stack
          class="col"
          :icon="viber.icon"
          :href="hrefFor(viber)"
          :label="viber.name"
          :aria-label="site.config.cta.viber"
        />
        <q-btn
          flat
          no-caps
          stack
          class="col"
          icon="mdi-phone"
          :label="site.config.cta.call"
          :href="href"
          :aria-label="`Позвонить ${primaryDisplay}`"
        />
      </template>
      <template v-else>
        <q-btn
          flat
          no-caps
          stack
          class="col"
          icon="mdi-phone"
          :label="site.config.cta.call"
          :href="href"
          :aria-label="`Позвонить ${primaryDisplay}`"
        />
        <q-btn
          unelevated
          no-caps
          stack
          class="col"
          color="secondary"
          text-color="dark"
          icon="mdi-calendar"
          :label="site.config.cta.bookShort"
          to="/booking"
        />
        <q-btn
          flat
          no-caps
          stack
          class="col"
          icon="mdi-camera"
          :label="site.config.cta.estimateShort"
          to="/estimate"
        />
      </template>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMessengers } from "@/composables/useMessengers";
import { usePhone } from "@/composables/usePhone";
import { useSiteStore } from "@/stores/site";

const site = useSiteStore();
const { primaryDisplay, primaryRaw, toTelHref } = usePhone();
const { hasMessengers, telegram, viber, hrefFor } = useMessengers();
const href = computed(() => toTelHref(primaryRaw.value));
</script>
