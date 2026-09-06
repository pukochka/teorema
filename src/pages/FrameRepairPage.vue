<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="Стапель" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="Стапель"
        title="Стапельные работы и восстановление геометрии кузова"
        subtitle="Стапель — это стенд, на котором автомобиль надёжно фиксируют, чтобы вернуть силовым элементам кузова правильное положение после удара."
      />
      <p class="muted" style="max-width: 46rem">
        Если после ДТП двери закрываются с перекосом, зазоры «поплыли» или есть
        увод по геометрии, сначала измеряют контрольные точки. Затем машину
        закрепляют на стапеле и вытягивают повреждённые элементы. После контроля
        геометрии переходят к кузовному ремонту, подготовке и покраске.
      </p>
      <q-btn
        class="q-mt-md"
        unelevated
        no-caps
        color="secondary"
        text-color="dark"
        to="/estimate"
        label="Отправить фото повреждения"
      />
    </section>

    <section class="page-section page-shell">
      <div class="row q-col-gutter-xl">
        <div class="col-12 col-md-5">
          <q-img
            :src="publicAsset('/images/frame/bench.jpg')"
            alt="Стапель Teorema Service"
            ratio="4/3"
          >
            <template #error>
              <MediaPlaceholder
                label="Фото стапеля появится здесь"
                icon="mdi-ruler-square"
                min-height="280px"
              />
            </template>
          </q-img>
        </div>
        <div class="col-12 col-md-7">
          <q-timeline color="primary">
            <q-timeline-entry
              v-for="step in frameRepairStages"
              :key="step.id"
              :title="step.title"
              :subtitle="step.description"
              icon="mdi-set-square"
            />
          </q-timeline>
        </div>
      </div>
    </section>

    <div class="page-shell q-pb-xl">
      <ContactCTA estimate-label="Отправить фото повреждения" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ContactCTA from "@/components/common/ContactCTA.vue";
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import { frameRepairStages } from "@/data/services";
import { useSeo } from "@/composables/useSeo";
import { publicAsset } from "@/utils/publicAsset";

useSeo();
</script>
