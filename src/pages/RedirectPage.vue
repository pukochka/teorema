<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <h1 class="text-h4">Страница переехала</h1>
      <p class="text-body1">
        Актуальный адрес:
        <router-link :to="target">{{ target }}</router-link>
      </p>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSeo } from "@/composables/useSeo";
import { useSiteStore } from "@/stores/site";
import { absoluteUrl, normalizePath } from "@/utils/paths";
import { resolveRedirectTarget } from "@/utils/redirects";

const route = useRoute();
const router = useRouter();
const site = useSiteStore();

const target = computed(() => {
  const fromMeta = route.meta.redirectTo;
  if (typeof fromMeta === "string" && fromMeta) {
    return normalizePath(fromMeta);
  }
  return (
    resolveRedirectTarget(route.path, site.redirects) || "/"
  );
});

useSeo({
  title: "Страница переехала — Teorema Service",
  description: "Этот адрес больше не используется.",
  robots: "noindex, follow",
  canonical: absoluteUrl(target.value, site.config.seo.siteUrl)
});

onMounted(() => {
  if (target.value && target.value !== normalizePath(route.path)) {
    void router.replace(target.value);
  }
});
</script>
