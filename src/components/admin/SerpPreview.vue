<template>
  <q-card
    flat
    bordered
    class="q-pa-md"
  >
    <div class="text-caption muted q-mb-sm">Пример в поиске</div>
    <div class="text-primary text-h6">{{ title || "Заголовок страницы" }}</div>
    <div class="text-positive text-caption">{{ url }}</div>
    <div class="text-body2">{{ description || "Описание страницы" }}</div>
    <p class="muted q-mb-none q-mt-sm text-caption">
      Поисковик может показать другой заголовок и описание, чем заданы здесь.
    </p>
  </q-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  url: string;
}>();
</script>
