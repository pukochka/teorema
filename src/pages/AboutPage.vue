<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="О нас" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="О сервисе"
        title="Teorema Service"
        subtitle="Автосервис в Минске: СТО, ремонт любой сложности, стапель, покрасочная камера и полировка."
      />
    </section>

    <section class="page-section page-shell">
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-6">
          <q-img
            :src="publicAsset('/images/workshop/overview.jpg')"
            alt="Мастерская Teorema Service"
            ratio="4/3"
          >
            <template #error>
              <MediaPlaceholder
                label="Фото мастерской появится здесь"
                icon="mdi-storefront"
                min-height="280px"
              />
            </template>
          </q-img>
          <div class="q-mt-md gt-xs">
            <VideoSlot label="Видео мастерской появится здесь" />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <q-list>
            <q-item
              :key="service.id"
              v-for="service in coreServices"
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
          <div class="q-mt-md">
            <q-img
              :src="publicAsset('/images/team/team.jpg')"
              alt="Команда Teorema Service"
              ratio="16/9"
            >
              <template #error>
                <MediaPlaceholder
                  label="Фото команды появится здесь"
                  icon="mdi-account-group"
                  min-height="180px"
                />
              </template>
            </q-img>
          </div>
        </div>
      </div>
    </section>

    <div class="page-shell q-pb-xl">
      <ContactCTA />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ContactCTA from "@/components/common/ContactCTA.vue";
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import VideoSlot from "@/components/common/VideoSlot.vue";
import { coreServices } from "@/data/services";
import { useSeo } from "@/composables/useSeo";
import { publicAsset } from "@/utils/publicAsset";

useSeo();
</script>
