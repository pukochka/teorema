<template>
  <q-card class="surface-card full-height" flat bordered>
    <q-img
      :src="work.after || work.before"
      :alt="`${work.brand} ${work.model}`"
      ratio="16/10"
    >
      <template #error>
        <MediaPlaceholder
          :label="`Фото работы ${work.brand} ${work.model} появится здесь`"
          min-height="200px"
        />
      </template>
      <div class="absolute-top-left q-pa-sm">
        <q-chip v-if="work.isDemo" color="accent" text-color="dark" dense>
          Демонстрационный проект
        </q-chip>
      </div>
    </q-img>
    <q-card-section>
      <div class="text-h6">{{ work.brand }} {{ work.model }}</div>
      <p class="muted">{{ work.damage }}</p>
      <div class="q-gutter-xs q-mb-md">
        <q-chip
          v-for="item in work.works"
          :key="item"
          dense
          outline
          color="primary"
        >
          {{ item }}
        </q-chip>
      </div>
      <q-btn
        unelevated
        no-caps
        color="primary"
        label="Сравнить до и после"
        @click="opened = true"
      />
    </q-card-section>
    <q-dialog v-model="opened">
      <q-card style="min-width: min(920px, 96vw)">
        <q-card-section>
          <div class="text-h6">{{ work.brand }} {{ work.model }}</div>
          <p class="muted q-mb-none">{{ work.damage }}</p>
        </q-card-section>
        <q-card-section>
          <BeforeAfterSlider
            :before-src="work.before"
            :after-src="work.after"
            :before-alt="`${work.brand} ${work.model} до ремонта`"
            :after-alt="`${work.brand} ${work.model} после ремонта`"
          />
          <div class="q-mt-md">
            <div class="text-weight-medium q-mb-sm">Процесс</div>
            <q-img
              :src="work.process"
              :alt="`Процесс ремонта ${work.brand} ${work.model}`"
              ratio="16/9"
            >
              <template #error>
                <MediaPlaceholder
                  label="Фото процесса появится здесь"
                  min-height="180px"
                />
              </template>
            </q-img>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat no-caps label="Закрыть" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import BeforeAfterSlider from "./BeforeAfterSlider.vue";
import type { WorkProject } from "@/types/work";

defineProps<{
  work: WorkProject;
}>();

const opened = ref(false);
</script>
