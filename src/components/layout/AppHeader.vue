<template>
  <q-header class="app-header">
    <q-toolbar class="page-shell app-header__toolbar">
      <q-btn
        class="lt-md app-header__menu"
        flat
        icon="mdi-menu"
        aria-label="Открыть меню"
        @click="site.toggleDrawer()"
      />

      <q-toolbar-title class="col-auto">
        <BrandLogo />
      </q-toolbar-title>

      <nav
        class="gt-sm row items-center q-gutter-xs app-header__nav"
        aria-label="Основное меню"
      >
        <q-btn-dropdown
          flat
          no-caps
          label="Услуги"
          aria-label="Услуги"
          class="app-header__link"
          dropdown-icon="mdi-chevron-down"
        >
          <q-list>
            <q-item
              v-for="item in headerServices"
              :key="item.to"
              v-close-popup
              clickable
              :to="item.to"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon || 'mdi-chevron-right'" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn
          v-for="item in headerNav"
          :key="item.to"
          flat
          no-caps
          :to="item.to"
          :label="item.label"
          class="app-header__link"
        />
      </nav>

      <q-space />

      <q-btn
        v-if="telegram"
        class="gt-sm"
        flat
        round
        :icon="telegram.icon"
        :href="hrefFor(telegram)"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="site.config.cta.telegram"
      />
      <q-btn
        v-if="viber"
        class="gt-sm"
        flat
        round
        :icon="viber.icon"
        :href="hrefFor(viber)"
        :aria-label="site.config.cta.viber"
      />

      <q-btn
        class="lt-md"
        flat
        icon="mdi-phone"
        :href="primaryHref"
        aria-label="Позвонить"
      />
      <q-btn
        class="gt-sm"
        flat
        no-caps
        icon="mdi-phone"
        :href="primaryHref"
        :label="primaryDisplay"
        aria-label="Позвонить"
      />

      <q-btn
        class="gt-sm"
        unelevated
        no-caps
        color="secondary"
        text-color="dark"
        icon="mdi-calendar"
        :label="site.config.cta.bookShort"
        to="/booking"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { headerNav, headerServices } from "@/data/navigation";
import { useMessengers } from "@/composables/useMessengers";
import { usePhone } from "@/composables/usePhone";
import { useSiteStore } from "@/stores/site";
import BrandLogo from "./BrandLogo.vue";

const site = useSiteStore();
const { primaryDisplay, toTelHref, primaryRaw } = usePhone();
const { telegram, viber, hrefFor } = useMessengers();
const primaryHref = computed(() => toTelHref(primaryRaw.value));
</script>

<style lang="scss" scoped>
.app-header {
  background: #0785b4;
  color: #fff;
}

.app-header__toolbar {
  min-height: 64px;
}

.app-header__menu {
  min-width: 44px;
  min-height: 44px;
}

.app-header__link {
  font-weight: 600;
}

.app-header :deep(.q-btn:not(.bg-secondary)) {
  color: #fff;
}
</style>
