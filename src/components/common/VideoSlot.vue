<template>
  <div class="video-slot">
    <video
      v-if="src"
      class="video-slot__media"
      :src="src"
      :poster="poster"
      controls
      playsinline
      preload="metadata"
    />
    <div v-else class="media-slot video-slot__placeholder">
      <div>
        <q-icon name="mdi-movie" size="40px" color="primary" />
        <div class="media-slot__label q-mt-sm">{{ label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src?: string;
    poster?: string;
    label?: string;
  }>(),
  {
    src: "",
    poster: "",
    label: "Здесь будет видео"
  }
);
</script>

<style lang="scss" scoped>
.video-slot,
.video-slot__media,
.video-slot__placeholder {
  width: 100%;
  border-radius: 14px;
}

.video-slot__media {
  display: block;
  min-height: 220px;
  background: #102a36;
}

.video-slot__placeholder {
  min-height: 260px;
}
</style>
