<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="О нас" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="О сервисе"
        title="Teorema Service"
        subtitle="Teorema Service — комплексный автосервис, где технический ремонт, кузовные работы, стапель и покраска доступны в одном месте."
      />
    </section>

    <section class="page-section page-shell">
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-6">
          <q-img
            src="/images/workshop/overview.jpg"
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
            <q-item>
              <q-item-section avatar
                ><q-icon name="mdi-wrench" color="primary"
              /></q-item-section>
              <q-item-section>
                <q-item-label>Автосервис</q-item-label>
                <q-item-label caption
                  >ТО, диагностика и механический ремонт</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar
                ><q-icon name="mdi-car-wrench" color="primary"
              /></q-item-section>
              <q-item-section>
                <q-item-label>Кузовной цех</q-item-label>
                <q-item-label caption
                  >Рихтовка, сварка, замена элементов</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar
                ><q-icon name="mdi-format-paint" color="primary"
              /></q-item-section>
              <q-item-section>
                <q-item-label>Покрасочная камера</q-item-label>
                <q-item-label caption>Локальная и полная окраска</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar
                ><q-icon name="mdi-ruler-square" color="primary"
              /></q-item-section>
              <q-item-section>
                <q-item-label>Стапель</q-item-label>
                <q-item-label caption
                  >Восстановление геометрии кузова</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar
                ><q-icon name="mdi-truck" color="primary"
              /></q-item-section>
              <q-item-section>
                <q-item-label>Коммерческие автомобили</q-item-label>
                <q-item-label caption
                  >Микроавтобусы, фургоны, малые грузовики</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar
                ><q-icon name="mdi-hub" color="primary"
              /></q-item-section>
              <q-item-section>
                <q-item-label>Комплексный подход</q-item-label>
                <q-item-label caption
                  >Механика и кузов в одном сервисе</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
          <div class="q-mt-md">
            <q-img
              src="/images/team/team.jpg"
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
import { useSeo } from "@/composables/useSeo";

useSeo();
</script>
