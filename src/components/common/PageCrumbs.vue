<template>
  <nav class="page-crumbs q-mb-md" aria-label="Навигация по разделам">
    <q-breadcrumbs separator-icon="mdi-chevron-right">
      <q-breadcrumbs-el label="Главная" to="/" />
      <q-breadcrumbs-el :label="label" />
    </q-breadcrumbs>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>
