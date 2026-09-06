<template>
  <div
    v-if="target"
    class="fullscreen text-center q-pa-md flex flex-center error-page"
  >
    <div>
      <h1 class="text-h4 text-white">Страница переехала</h1>
      <p class="text-white q-mt-md">
        Актуальный адрес:
        <router-link
          class="text-secondary"
          :to="target"
        >
          {{ target }}
        </router-link>
      </p>
    </div>
  </div>
  <div
    v-else
    class="fullscreen text-center q-pa-md flex flex-center error-page"
  >
    <div>
      <div class="error-page__code">404</div>
      <h1 class="text-h4 text-white q-mt-md">Страница не найдена</h1>
      <div class="cta-row q-mt-xl justify-center">
        <q-btn
          unelevated
          no-caps
          color="secondary"
          text-color="dark"
          to="/"
          label="На главную"
        />
        <q-btn
          unelevated
          no-caps
          color="white"
          text-color="dark"
          to="/contacts"
          label="Контакты"
        />
      </div>
    </div>
  </div>
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

const target = computed(() =>
  resolveRedirectTarget(route.path, site.redirects)
);

useSeo({
  title: target.value
    ? "Страница переехала — Teorema Service"
    : "Страница не найдена — Teorema Service",
  description: target.value
    ? "Этот адрес больше не используется."
    : "Запрашиваемая страница не найдена.",
  robots: "noindex, follow",
  canonical: target.value
    ? absoluteUrl(target.value, site.config.seo.siteUrl)
    : undefined
});

onMounted(() => {
  if (target.value && target.value !== normalizePath(route.path)) {
    void router.replace(target.value);
  }
});
</script>
