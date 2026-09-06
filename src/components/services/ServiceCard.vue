<template>
  <q-card
    class="surface-card surface-card--interactive full-height"
    flat
    clickable
    :to="service.route"
    :aria-label="service.cta || service.title"
  >
    <q-card-section>
      <div class="surface-icon">
        <q-icon :name="service.icon" size="24px" />
      </div>
      <div class="text-h6 q-mt-md">{{ service.title }}</div>
      <p class="muted q-mb-none">{{ service.description }}</p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { Service } from "@/types/service";

defineProps<{
  service: Service;
}>();
</script>
