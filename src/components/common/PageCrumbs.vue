<template>
  <nav
    class="page-crumbs q-mb-md"
    aria-label="Навигация по разделам"
  >
    <q-breadcrumbs separator-icon="mdi-chevron-right">
      <q-breadcrumbs-el
        label="Главная"
        to="/"
      />
      <q-breadcrumbs-el
        v-for="item in items"
        :key="item.path"
        :label="item.name"
        :to="item.path === currentPath ? undefined : item.path"
      />
    </q-breadcrumbs>
  </nav>
  <component
    :is="'script'"
    type="application/ld+json"
    v-html="schema"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { breadcrumbJsonLd, stringifyJsonLd } from "@/composables/useJsonLd";
import { useSiteStore } from "@/stores/site";
import { normalizePath } from "@/utils/paths";

const props = defineProps<{
  label?: string;
  crumbs?: Array<{ name: string; path: string }>;
}>();

const route = useRoute();
const site = useSiteStore();
const currentPath = computed(() => normalizePath(route.path));

const items = computed(() => {
  if (props.crumbs?.length) return props.crumbs;
  if (props.label) {
    return [{ name: props.label, path: currentPath.value }];
  }
  return [];
});

const schema = computed(() => {
  const trail = [
    { name: "Главная", path: "/" },
    ...items.value.map(item => ({
      name: item.name,
      path: item.path || currentPath.value
    }))
  ];
  return stringifyJsonLd(breadcrumbJsonLd(trail, site.config.seo.siteUrl));
});
</script>
