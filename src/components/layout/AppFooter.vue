<template>
  <footer class="app-footer brand-diagonal">
    <BrandStripe variant="footer" />
    <div class="page-shell q-py-xl">
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-4">
          <BrandLogo />
          <p class="q-mt-md q-mb-none" style="max-width: 22rem">
            {{ site.shortDescription }}
          </p>
        </div>
        <div class="col-12 col-sm-6 col-md-2">
          <div class="app-footer__title">Услуги</div>
          <q-list>
            <q-item
              v-for="item in footerServices"
              :key="item.to"
              clickable
              :to="item.to"
              class="q-px-none"
            >
              <q-item-section>{{ item.label }}</q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="app-footer__title">Клиентам</div>
          <q-list>
            <q-item
              v-for="item in footerClients"
              :key="item.to"
              clickable
              :to="item.to"
              class="q-px-none"
            >
              <q-item-section>{{ item.label }}</q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-12 col-md-3">
          <div class="app-footer__title">Контакты</div>
          <q-list>
            <q-item class="q-px-none">
              <q-item-section avatar>
                <q-icon name="mdi-map-marker" />
              </q-item-section>
              <q-item-section>{{ site.address }}</q-item-section>
            </q-item>
            <q-item
              v-for="phone in site.phones"
              :key="phone.raw"
              clickable
              tag="a"
              :href="toTelHref(phone.raw)"
              class="q-px-none"
            >
              <q-item-section avatar>
                <q-icon name="mdi-phone" />
              </q-item-section>
              <q-item-section>{{ phone.display }}</q-item-section>
            </q-item>
            <q-item class="q-px-none">
              <q-item-section avatar>
                <q-icon name="mdi-clock-outline" />
              </q-item-section>
              <q-item-section>{{ site.workingHours.display }}</q-item-section>
            </q-item>
            <q-item
              v-for="messenger in messengers"
              :key="messenger.id"
              clickable
              tag="a"
              :href="hrefFor(messenger)"
              :target="messenger.id === 'telegram' ? '_blank' : undefined"
              rel="noopener noreferrer"
              class="q-px-none"
            >
              <q-item-section avatar>
                <q-icon :name="messenger.icon" />
              </q-item-section>
              <q-item-section>{{ messenger.name }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <q-separator dark class="q-my-lg" />
      <div class="row items-center justify-between q-col-gutter-sm">
        <div class="col-12 col-sm-auto"> © {{ year }} {{ site.name }} </div>
        <div class="col-12 col-sm-auto">
          <q-btn flat no-caps to="/privacy" label="Обработка данных" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { footerClients, footerServices } from "@/data/navigation";
import { useMessengers } from "@/composables/useMessengers";
import { toTelHref } from "@/composables/usePhone";
import { useSiteStore } from "@/stores/site";
import BrandLogo from "./BrandLogo.vue";
import BrandStripe from "../common/BrandStripe.vue";

const site = useSiteStore().config;
const { messengers, hrefFor } = useMessengers();
const year = computed(() => new Date().getFullYear());
</script>

<style lang="scss" scoped>
.app-footer {
  position: relative;
  color: #fff;
  background: #102a36;
}

.app-footer__title {
  margin-bottom: 12px;
  font-family: "Oswald", sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.app-footer :deep(.q-item) {
  color: #fff;
  min-height: 44px;
}

.app-footer :deep(.brand-logo__sub) {
  color: #f5a83d;
}
</style>
