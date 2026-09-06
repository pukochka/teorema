<template>
  <q-img
    v-if="src"
    fit="cover"
    class="media-frame"
    :src="resolvedSrc"
    :alt="alt"
    :ratio="resolvedRatio"
  >
    <template #error>
      <div
        class="media-slot"
        :class="slotClass"
      >
        <div class="media-slot__inner">
          <q-icon
            color="primary"
            :name="icon"
            size="36px"
          />
          <div class="media-slot__label q-mt-sm">{{ label }}</div>
          <div
            v-if="hint"
            class="media-slot__hint"
          >
            {{ hint }}
          </div>
        </div>
      </div>
    </template>
    <template #loading>
      <q-skeleton
        square
        height="100%"
      />
    </template>
  </q-img>
  <div
    v-else
    class="media-slot"
    :class="slotClass"
    :style="slotStyle"
  >
    <div class="media-slot__inner">
      <q-icon
        color="primary"
        :name="icon"
        size="36px"
      />
      <div class="media-slot__label q-mt-sm">{{ label }}</div>
      <div
        v-if="hint"
        class="media-slot__hint"
      >
        {{ hint }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { publicAsset } from "@/utils/publicAsset";

const props = withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    label?: string;
    hint?: string;
    icon?: string;
    minHeight?: string;
    ratio?: number;
    variant?: "default" | "hero" | "card" | "wide";
  }>(),
  {
    src: "",
    alt: "",
    label: "Фотография появится здесь",
    hint: "",
    icon: "mdi-camera-outline",
    variant: "default"
  }
);

const resolvedSrc = computed(() =>
  props.src ? publicAsset(props.src) : ""
);
const resolvedRatio = computed(() => props.ratio ?? 1.6);
const slotClass = computed(() => ({
  "media-slot--ratio": Boolean(props.ratio) && !props.src,
  "media-slot--hero": props.variant === "hero",
  "media-slot--wide": props.variant === "wide"
}));
const slotStyle = computed(() => {
  const style: Record<string, string> = {};

  if (props.minHeight) {
    style.minHeight = props.minHeight;
  }

  if (props.ratio) {
    style["--media-ratio"] = String(props.ratio);
  }

  return style;
});
</script>
