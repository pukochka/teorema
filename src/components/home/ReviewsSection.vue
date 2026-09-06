<template>
  <section class="page-section page-shell">
    <SectionHeading
      eyebrow="Отзывы"
      title="Отзывы клиентов"
      subtitle="Публикуем только реальные отзывы."
    />
    <div class="q-mt-lg">
      <EmptyState
        v-if="reviews.length === 0"
        title="Отзывы клиентов скоро появятся здесь."
        text="Когда появятся реальные отзывы, они отобразятся в этом блоке: имя, текст, источник и дата."
        icon="mdi-chat-outline"
      />
      <div v-else class="row q-col-gutter-md">
        <div v-for="review in reviews" :key="review.id" class="col-12 col-md-4">
          <q-card class="surface-card full-height" flat bordered>
            <q-card-section>
              <div class="text-h6">{{ review.name }}</div>
              <p>{{ review.text }}</p>
              <div class="muted">{{ review.source }} • {{ review.date }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import EmptyState from "@/components/common/EmptyState.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import { storeToRefs } from "pinia";
import { useSiteStore } from "@/stores/site";

const { reviews } = storeToRefs(useSiteStore());
</script>
