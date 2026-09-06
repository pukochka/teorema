<template>
  <div
    class="media-slot"
    :class="minHeight ? '' : ''"
    :style="minHeight ? { minHeight } : undefined"
  >
    <div>
      <q-icon :name="icon" size="36px" color="primary" />
      <div class="media-slot__label q-mt-sm">{{ label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    icon?: string;
    minHeight?: string;
  }>(),
  {
    label: "Фотография появится здесь",
    icon: "mdi-image"
  }
);
</script>
