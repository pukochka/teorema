<template>
  <q-drawer
    v-model="site.drawerOpen"
    overlay
    bordered
    side="left"
    class="app-drawer"
    :width="320"
  >
    <div
      class="q-pa-md"
      @click="site.setDrawer(false)"
    >
      <BrandLogo />
    </div>
    <q-separator />
    <q-list padding class="app-drawer__nav">
      <q-item
        v-for="item in menu"
        :key="item.to"
        v-ripple
        clickable
        :to="item.to"
        exact
        @click="site.setDrawer(false)"
      >
        <q-item-section avatar>
          <q-icon :name="item.icon || 'mdi-chevron-right'" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator />
    <q-list>
      <q-item
        clickable
        tag="a"
        :href="toTelHref(primaryRaw)"
        @click="onPhoneClick(); site.setDrawer(false)"
      >
        <q-item-section avatar>
          <q-icon
            name="mdi-phone"
            color="primary"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ primaryDisplay }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        to="/contacts"
        @click="site.setDrawer(false)"
      >
        <q-item-section avatar>
          <q-icon
            name="mdi-map-marker"
            color="primary"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ site.config.address }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section avatar>
          <q-icon
            name="mdi-clock-outline"
            color="primary"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ site.config.workingHours.display }}</q-item-label>
          <q-item-label caption>{{
            site.config.workingHours.closed
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="q-pa-md column q-gutter-sm">
      <MessengerButtons full-width @click="site.setDrawer(false)" />
      <q-btn
        unelevated
        no-caps
        color="secondary"
        text-color="dark"
        icon="mdi-calendar"
        label="Записаться"
        to="/booking"
        @click="site.setDrawer(false)"
      />
      <q-btn
        unelevated
        no-caps
        color="primary"
        icon="mdi-camera"
        label="Оценка по фото"
        to="/estimate"
        @click="site.setDrawer(false)"
      />
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { headerNav } from "@/data/navigation";
import { useAnalytics } from "@/composables/useAnalytics";
import { usePhone } from "@/composables/usePhone";
import { useSiteStore } from "@/stores/site";
import MessengerButtons from "@/components/common/MessengerButtons.vue";
import BrandLogo from "./BrandLogo.vue";

const site = useSiteStore();
const { primaryDisplay, primaryRaw, toTelHref } = usePhone();
const { trackEvent } = useAnalytics();
const menu = computed(() => [
  { label: "Главная", to: "/", icon: "mdi-home" },
  ...site.serviceNav,
  ...headerNav,
  { label: "О нас", to: "/about", icon: "mdi-information" }
]);

function onPhoneClick() {
  trackEvent("phone_click", { place: "drawer" });
}
</script>
