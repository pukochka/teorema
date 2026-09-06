<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="О сервисе" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="О сервисе"
        :title="page?.h1 || 'О сервисе'"
        :subtitle="page?.subtitle || site.tagline"
      />
      <p
        v-if="page?.intro"
        class="text-body1 q-mt-lg q-mb-none"
      >
        {{ page.intro }}
      </p>
    </section>

    <section class="page-section page-shell">
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-6">
          <q-list class="surface-card">
            <q-item
              v-for="service in services"
              :key="service.id"
              clickable
              :to="service.route"
            >
              <q-item-section avatar>
                <q-icon
                  color="primary"
                  :name="service.icon"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ service.title }}</q-item-label>
                <q-item-label caption>{{ service.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col-12 col-md-6">
          <MediaPlaceholder
            variant="wide"
            class="q-mb-lg"
            :src="page?.image"
            :alt="page?.imageAlt || 'Интерьер или территория Teorema Service'"
            label="Интерьер бокса или территория сервиса"
            hint="Горизонтальный кадр: рабочий бокс, двор или зона приёмки. Без лиц клиентов."
            :ratio="16 / 10"
          />

          <q-card
            flat
            bordered
            class="surface-card"
          >
            <q-card-section>
              <div class="text-h6">{{ site.address }}</div>
              <p class="muted q-mb-none">
                {{ site.workingHours.display }}. {{ site.workingHours.closed }}
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <div class="page-shell q-pb-xl">
      <ContactCTA :estimate-label="site.cta.clarifyPrice" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ContactCTA from "@/components/common/ContactCTA.vue";
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import { useSeo } from "@/composables/useSeo";
import { useSiteStore } from "@/stores/site";

const store = useSiteStore();
const site = store.config;
const page = computed(() => store.pageByPath("/about"));
const services = computed(() => store.publishedServices);

useSeo();
</script>
