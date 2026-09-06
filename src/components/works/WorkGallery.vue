<template>
  <div>
    <div class="row items-center q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-auto">
        <q-tabs
          v-model="category"
          class="lt-md"
          align="left"
          active-color="primary"
          indicator-color="secondary"
          narrow-indicator
          outside-arrows
          mobile-arrows
        >
          <q-tab
            v-for="filter in workFilters"
            :key="filter.category"
            :name="filter.category"
            :label="filter.label"
            no-caps
          />
        </q-tabs>
      </div>
      <div class="col-12 col-md-auto">
        <q-btn-toggle
          v-model="category"
          no-caps
          unelevated
          toggle-color="primary"
          :options="
            workFilters.map(item => ({
              label: item.label,
              value: item.category
            }))
          "
          class="gt-sm"
        />
      </div>
    </div>

    <EmptyState
      v-if="filtered.length === 0"
      title="Фотографии выполненных работ скоро появятся здесь."
      text="Структура карточек уже готова: марка, модель, повреждение, работы, фото до / процесс / после."
      icon="mdi-image-multiple"
    />

    <div v-else class="row q-col-gutter-md">
      <div v-for="work in filtered" :key="work.id" class="col-12 col-md-6">
        <WorkCard :work="work" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import EmptyState from "@/components/common/EmptyState.vue";
import WorkCard from "./WorkCard.vue";
import { workFilters } from "@/data/works";
import { useSiteStore } from "@/stores/site";
import type { WorkCategory } from "@/types/work";

const site = useSiteStore();
const category = ref<WorkCategory>("all");
const filtered = computed(() =>
  category.value === "all"
    ? site.works
    : site.works.filter(item => item.category === category.value)
);
</script>
