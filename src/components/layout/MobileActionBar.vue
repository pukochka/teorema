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
          :icon="telegram.icon"
          label="Telegram"
          :href="hrefFor(telegram)"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="site.config.cta.telegram"
        />
        <q-btn
          v-if="viber"
          flat
          no-caps
          stack
          class="col"
          :icon="viber.icon"
          label="Viber"
          :href="hrefFor(viber)"
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

<style lang="scss" scoped>
.mobile-action-bar {
  background: #102a36;
  color: #fff;
  padding-bottom: env(safe-area-inset-bottom);
}

.mobile-action-bar__toolbar {
  min-height: 72px;
}

.mobile-action-bar :deep(.q-btn) {
  min-height: 56px;
}

.mobile-action-bar :deep(.q-btn:not(.bg-secondary)) {
  color: #fff;
}
</style>
