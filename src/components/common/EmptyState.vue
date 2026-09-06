<template>
  <q-card flat bordered class="empty-state">
    <q-card-section class="column items-center text-center q-pa-xl">
      <q-icon :name="icon" size="42px" color="primary" />
      <div class="text-h6 q-mt-md">{{ title }}</div>
      <p v-if="text" class="muted q-mb-none q-mt-sm">{{ text }}</p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    text?: string;
    icon?: string;
  }>(),
  {
    icon: "mdi-timer-sand-empty"
  }
);
</script>
