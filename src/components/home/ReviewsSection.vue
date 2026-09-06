<template>
  <section
    v-if="reviews.length"
    class="page-section page-shell"
  >
    <SectionHeading
      eyebrow="Отзывы"
      title="Отзывы клиентов"
      subtitle="Публикуем только реальные отзывы."
    />
    <div class="row q-col-gutter-md q-mt-lg">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="col-12 col-md-4"
      >
        <q-card
          flat
          bordered
          class="surface-card full-height"
        >
          <q-card-section>
            <div class="text-h6">{{ review.name }}</div>
            <p>{{ review.text }}</p>
            <div
              v-if="review.source || review.date"
              class="muted"
            >
              {{ [review.source, review.date].filter(Boolean).join(" • ") }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import SectionHeading from "@/components/common/SectionHeading.vue";
import { useSiteStore } from "@/stores/site";

const { reviews } = storeToRefs(useSiteStore());
</script>
