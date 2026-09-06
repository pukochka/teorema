<template>
  <div
    class="brand-accent"
    :class="`brand-accent--${variant}`"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "cta" | "footer";
  }>(),
  { variant: "footer" }
);
</script>
