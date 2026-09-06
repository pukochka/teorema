<template>
  <div>
    <q-file
      :model-value="null"
      multiple
      use-chips
      clearable
      outlined
      stack-label
      accept=".jpg,.jpeg,.png,.webp,image/*"
      label="Фотографии повреждения"
      hint="До 10 файлов, до 10 МБ каждый. JPG, PNG, WEBP."
      @update:model-value="onFiles"
    >
      <template #prepend>
        <q-icon name="mdi-paperclip" />
      </template>
    </q-file>

    <div v-if="photos.length" class="row q-col-gutter-sm q-mt-md">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="col-6 col-sm-4 col-md-3"
      >
        <q-card flat bordered>
          <q-img :src="photo.previewUrl" :alt="photo.name" ratio="1">
            <template #error>
              <MediaPlaceholder :label="photo.name" min-height="120px" />
            </template>
          </q-img>
          <q-card-section class="q-pa-sm">
            <div class="ellipsis">{{ photo.name }}</div>
            <q-btn
              flat
              no-caps
              color="negative"
              icon="mdi-delete"
              label="Удалить"
              @click="$emit('remove', photo.id)"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import type { EstimatePhoto } from "@/types/estimate";

defineProps<{
  photos: EstimatePhoto[];
}>();

const emit = defineEmits<{
  add: [files: File[]];
  remove: [id: string];
}>();

function onFiles(value: File[] | File | null) {
  const files = Array.isArray(value) ? value : value ? [value] : [];
  if (files.length) emit("add", files);
}
</script>
