<template>
  <footer class="app-footer">
    <BrandStripe variant="footer" />
    <div class="page-shell q-py-xl">
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-4">
          <BrandLogo />
          <p class="app-footer__about q-mt-md q-mb-none">
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
              class="q-px-none"
              :to="item.to"
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
              class="q-px-none"
              :to="item.to"
            >
              <q-item-section>{{ item.label }}</q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-12 col-md-3">
          <div class="app-footer__title">Контакты</div>
          <q-list>
            <q-item
              clickable
              class="q-px-none"
              to="/contacts"
            >
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
              class="q-px-none"
              :href="toTelHref(phone.raw)"
              @click="onPhoneClick"
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
              class="q-px-none"
              rel="noopener noreferrer"
              :href="hrefFor(messenger)"
              :target="messenger.id === 'telegram' ? '_blank' : undefined"
              @click="onMessengerClick(messenger.id)"
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
          <q-btn
            flat
            no-caps
            to="/privacy"
            label="Обработка данных"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { footerClients } from "@/data/navigation";
import { useAnalytics } from "@/composables/useAnalytics";
import { useMessengers } from "@/composables/useMessengers";
import { toTelHref } from "@/composables/usePhone";
import { useSiteStore } from "@/stores/site";
import BrandLogo from "./BrandLogo.vue";
import BrandStripe from "../common/BrandStripe.vue";

const store = useSiteStore();
const site = store.config;
const { serviceNav: footerServices } = storeToRefs(store);
const { messengers, hrefFor } = useMessengers();
const { trackEvent } = useAnalytics();
const year = computed(() => new Date().getFullYear());

function onPhoneClick() {
  trackEvent("phone_click", { place: "footer" });
}

function onMessengerClick(id: string) {
  trackEvent("messenger_click", { network: id });
}
</script>
