<template>
  <div
    class="brand-stripe"
    :class="`brand-stripe--${variant}`"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "section" | "hero" | "cta" | "footer";
  }>(),
  { variant: "section" }
);
</script>

<style lang="scss" scoped>
.brand-stripe {
  pointer-events: none;
  position: absolute;
}

.brand-stripe--section {
  top: 0;
  right: 0;
  width: 28%;
  height: 18px;
  background: linear-gradient(90deg, #0785b4, #f5a83d);
  clip-path: polygon(12% 0, 100% 0, 100% 100%, 0 100%);
}

.brand-stripe--hero {
  top: 12%;
  right: 0;
  width: 38%;
  height: 72px;
  background: linear-gradient(120deg, #f4d329 0%, #f5a83d 55%, transparent 56%);
  clip-path: polygon(18% 0, 100% 0, 82% 100%, 0 100%);
  opacity: 0.9;
}

.brand-stripe--cta {
  inset: auto 0 0 0;
  height: 16px;
  background: linear-gradient(90deg, #056b91, #0785b4 40%, #f5a83d);
  clip-path: polygon(0 40%, 100% 0, 100% 100%, 0 100%);
}

.brand-stripe--footer {
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background: linear-gradient(90deg, #f4d329, #f5a83d 35%, #0785b4);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 8% 100%);
}
</style>
