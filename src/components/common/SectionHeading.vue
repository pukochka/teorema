<template>
  <div
    class="section-heading-wrap"
    :class="align === 'center' ? 'text-center' : ''"
  >
    <div v-if="eyebrow" class="eyebrow q-mb-sm">{{ eyebrow }}</div>
    <component :is="headingTag" class="section-heading q-ma-none">
      {{ title }}
    </component>
    <p
      v-if="subtitle"
      class="muted q-mt-md q-mb-none"
      :class="wide ? '' : 'section-heading-wrap__lead'"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string;
    title: string;
    subtitle?: string;
    headingTag?: "h1" | "h2" | "h3";
    align?: "left" | "center";
    wide?: boolean;
  }>(),
  {
    headingTag: "h2",
    align: "left",
    wide: false
  }
);
</script>

<style lang="scss" scoped>
.section-heading-wrap__lead {
  max-width: 42rem;
}

.text-center .section-heading-wrap__lead {
  margin-left: auto;
  margin-right: auto;
}
</style>
