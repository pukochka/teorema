<template>
  <div
    class="ba-slider"
    role="slider"
    tabindex="0"
    :aria-valuemin="0"
    :aria-valuemax="100"
    :aria-valuenow="Math.round(position)"
    aria-label="Сравнение до и после"
    @pointerdown="onPointerDown"
    @keydown="onKeydown"
  >
    <div class="ba-slider__pane ba-slider__pane--after">
      <q-img :src="afterSrc" :alt="afterAlt" ratio="16/10" fit="cover">
        <template #error>
          <MediaPlaceholder
            :label="afterPlaceholder"
            icon="mdi-image"
            min-height="280px"
          />
        </template>
        <template #loading>
          <q-skeleton height="100%" square />
        </template>
      </q-img>
      <q-badge
        class="ba-slider__label ba-slider__label--after"
        color="secondary"
        text-color="dark"
      >
        После
      </q-badge>
    </div>
    <div
      class="ba-slider__pane ba-slider__pane--before"
      :style="{ width: `${position}%` }"
    >
      <q-img :src="beforeSrc" :alt="beforeAlt" ratio="16/10" fit="cover">
        <template #error>
          <MediaPlaceholder
            :label="beforePlaceholder"
            icon="mdi-image"
            min-height="280px"
          />
        </template>
        <template #loading>
          <q-skeleton height="100%" square />
        </template>
      </q-img>
      <q-badge
        class="ba-slider__label ba-slider__label--before"
        color="primary"
      >
        До
      </q-badge>
    </div>
    <div class="ba-slider__handle" :style="{ left: `${position}%` }">
      <span class="ba-slider__grip" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";

withDefaults(
  defineProps<{
    beforeSrc?: string;
    afterSrc?: string;
    beforeAlt?: string;
    afterAlt?: string;
    beforePlaceholder?: string;
    afterPlaceholder?: string;
  }>(),
  {
    beforeSrc: "/images/before-after/before.jpg",
    afterSrc: "/images/before-after/after.jpg",
    beforeAlt: "Автомобиль до ремонта",
    afterAlt: "Автомобиль после ремонта",
    beforePlaceholder: "Фото до ремонта появится здесь",
    afterPlaceholder: "Фото после ремонта появится здесь"
  }
);

const position = ref(50);
const dragging = ref(false);
const rootEl = ref<HTMLElement | null>(null);

function setFromClientX(clientX: number) {
  const root = rootEl.value;
  if (!root) return;
  const rect = root.getBoundingClientRect();
  const next = ((clientX - rect.left) / rect.width) * 100;
  position.value = Math.min(100, Math.max(0, next));
}

function onPointerDown(event: PointerEvent) {
  dragging.value = true;
  rootEl.value = event.currentTarget as HTMLElement;
  rootEl.value.setPointerCapture(event.pointerId);
  setFromClientX(event.clientX);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
}

function onPointerMove(event: PointerEvent) {
  if (!dragging.value) return;
  setFromClientX(event.clientX);
}

function onPointerUp() {
  dragging.value = false;
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowLeft") {
    position.value = Math.max(0, position.value - 5);
    event.preventDefault();
  }
  if (event.key === "ArrowRight") {
    position.value = Math.min(100, position.value + 5);
    event.preventDefault();
  }
  if (event.key === "Home") {
    position.value = 0;
    event.preventDefault();
  }
  if (event.key === "End") {
    position.value = 100;
    event.preventDefault();
  }
}

onBeforeUnmount(() => {
  onPointerUp();
});
</script>

<style lang="scss" scoped>
.ba-slider {
  position: relative;
  overflow: hidden;
  user-select: none;
  border-radius: 14px;
  outline: none;
  touch-action: none;
  container-type: inline-size;
}

.ba-slider:focus-visible {
  box-shadow: 0 0 0 3px rgba(7, 133, 180, 0.35);
}

.ba-slider__pane--after {
  width: 100%;
}

.ba-slider__pane--before {
  position: absolute;
  inset: 0 auto 0 0;
  overflow: hidden;
}

.ba-slider__pane--before :deep(.q-img) {
  width: 100cqw;
  max-width: none;
}

.ba-slider__label {
  position: absolute;
  top: 12px;
  z-index: 2;
}

.ba-slider__label--before {
  left: 12px;
}

.ba-slider__label--after {
  right: 12px;
}

.ba-slider__handle {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  width: 44px;
  background: transparent;
  transform: translateX(-50%);
}

.ba-slider__handle::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 3px;
  background: #fff;
  transform: translateX(-50%);
}

.ba-slider__grip {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  border: 3px solid #fff;
  border-radius: 50%;
  background: #0785b4;
  transform: translate(-50%, -50%);
}
</style>
