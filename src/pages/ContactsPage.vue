<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="Контакты" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="Контакты"
        :title="page?.h1 || 'Контакты'"
        :subtitle="page?.subtitle || 'Адрес, телефон и график работы.'"
      />

      <div class="row q-col-gutter-lg q-mt-lg">
        <div class="col-12 col-md-5">
          <q-card class="surface-card" flat bordered>
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="mdi-storefront" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Teorema Service</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="mdi-map-marker" color="primary" />
                </q-item-section>
                <q-item-section>{{ site.address }}</q-item-section>
              </q-item>
              <q-item
                v-for="phone in site.phones"
                :key="phone.raw"
                clickable
                tag="a"
                :href="toTelHref(phone.raw)"
                @click="onPhoneClick"
              >
                <q-item-section avatar>
                  <q-icon name="mdi-phone" color="primary" />
                </q-item-section>
                <q-item-section>{{ phone.display }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="mdi-clock-outline" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ site.workingHours.display }}</q-item-label>
                  <q-item-label caption>{{
                    site.workingHours.closed
                  }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-for="messenger in messengers"
                :key="messenger.id"
                clickable
                tag="a"
                :href="hrefFor(messenger)"
                :target="messenger.id === 'telegram' ? '_blank' : undefined"
                rel="noopener noreferrer"
                @click="onMessengerClick(messenger.id)"
              >
                <q-item-section avatar>
                  <q-icon :name="messenger.icon" color="primary" />
                </q-item-section>
                <q-item-section>{{ messenger.name }}</q-item-section>
              </q-item>
            </q-list>
            <q-card-actions class="q-pa-md column items-stretch">
              <MessengerButtons v-if="hasMessengers" full-width />
              <div class="cta-row q-mt-sm">
                <q-btn
                  unelevated
                  no-caps
                  color="secondary"
                  text-color="dark"
                  to="/booking"
                  label="Записаться"
                />
                <q-btn
                  unelevated
                  no-caps
                  color="primary"
                  to="/estimate"
                  label="Фотооценка"
                />
              </div>
            </q-card-actions>
          </q-card>
        </div>
        <div class="col-12 col-md-7">
          <MediaPlaceholder
            variant="wide"
            class="q-mb-lg"
            :src="page?.image"
            :alt="page?.imageAlt || 'Фасад и въезд Teorema Service'"
            label="Фасад и въезд"
            hint="Горизонтальный кадр въезда или фасада, чтобы было видно, как подъехать."
            :ratio="16 / 10"
          />

          <MapEmbed />
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import MapEmbed from "@/components/common/MapEmbed.vue";
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import MessengerButtons from "@/components/common/MessengerButtons.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import { useMessengers } from "@/composables/useMessengers";
import { toTelHref } from "@/composables/usePhone";
import { computed } from "vue";
import { useAnalytics } from "@/composables/useAnalytics";
import { useSeo } from "@/composables/useSeo";
import { useSiteStore } from "@/stores/site";

const store = useSiteStore();
const site = store.config;
const page = computed(() => store.pageByPath("/contacts"));
const { messengers, hasMessengers, hrefFor } = useMessengers();
const { trackEvent } = useAnalytics();

function onPhoneClick() {
  trackEvent("phone_click", { place: "contacts" });
}

function onMessengerClick(id: string) {
  trackEvent("messenger_click", { network: id });
}

useSeo();
</script>
