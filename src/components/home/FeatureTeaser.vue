<template>
  <section class="page-section page-shell">
    <div
      class="row q-col-gutter-xl items-center"
      :class="reverse ? 'reverse' : ''"
    >
      <div class="col-12 col-md-6">
        <SectionHeading :eyebrow="eyebrow" :title="title" :subtitle="text" />
        <q-list v-if="items.length" class="q-mt-md">
          <q-item v-for="item in items" :key="item" class="q-px-none">
            <q-item-section avatar>
              <q-icon name="mdi-check-circle" color="secondary" />
            </q-item-section>
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>
        <div class="cta-row q-mt-lg">
          <q-btn
            unelevated
            no-caps
            color="secondary"
            text-color="dark"
            :to="primaryTo"
            :label="primaryLabel"
          />
          <q-btn
            v-if="secondaryTo"
            outline
            no-caps
            color="primary"
            :to="secondaryTo"
            :label="secondaryLabel"
          />
        </div>
      </div>
      <div class="col-12 col-md-6">
        <q-img
          :src="image"
          :alt="imageAlt"
          ratio="16/10"
          fit="cover"
          class="rounded-borders"
        >
          <template #error>
            <MediaPlaceholder
              :label="placeholder"
              :icon="icon"
              min-height="280px"
            />
          </template>
          <template #loading>
            <q-skeleton height="100%" square />
          </template>
        </q-img>
        <div v-if="showVideo" class="q-mt-md gt-xs">
          <VideoSlot :label="videoLabel" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import VideoSlot from "@/components/common/VideoSlot.vue";

withDefaults(
  defineProps<{
    eyebrow: string;
    title: string;
    text: string;
    items?: string[];
    image: string;
    imageAlt: string;
    placeholder: string;
    icon?: string;
    primaryTo: string;
    primaryLabel: string;
    secondaryTo?: string;
    secondaryLabel?: string;
    reverse?: boolean;
    showVideo?: boolean;
    videoLabel?: string;
  }>(),
  {
    items: () => [],
    icon: "mdi-image",
    reverse: false,
    showVideo: false,
    videoLabel: "Видео появится здесь"
  }
);
</script>
