<template>
  <q-page class="bg-white">
    <div class="q-pa-md bg-grey-2">
      <q-banner class="bg-warning text-dark">
        Предпросмотр. Черновики не видны посетителям и не попадают в sitemap.
      </q-banner>
      <div class="q-mt-sm">
        <q-btn
          flat
          no-caps
          color="primary"
          :to="`/admin/pages/${page?.id || ''}`"
          label="Вернуться к редактированию"
        />
      </div>
    </div>

    <ServicePage
      v-if="page?.type === 'service'"
      :preview-id="page.id"
    />
    <section
      v-else-if="page"
      class="page-section page-shell"
    >
      <h1 class="text-h4">{{ page.h1 }}</h1>
      <p
        v-if="page.subtitle"
        class="text-body1"
      >
        {{ page.subtitle }}
      </p>
      <p
        v-if="page.intro"
        class="text-body1"
      >
        {{ page.intro }}
      </p>
      <div
        v-for="block in page.blocks"
        :key="block.id"
        class="q-mt-lg"
      >
        <h2 class="text-h6">{{ block.title }}</h2>
        <p>{{ block.text }}</p>
      </div>
    </section>
    <section
      v-else
      class="page-section page-shell"
    >
      <p>Страница не найдена.</p>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import ServicePage from "@/pages/ServicePage.vue";
import { useSeo } from "@/composables/useSeo";
import { useSiteStore } from "@/stores/site";

const route = useRoute();
const site = useSiteStore();
const page = computed(() => site.pageById(String(route.params.id || "")));

useSeo({
  title: "Предпросмотр — Teorema Service",
  robots: "noindex, nofollow"
});

onMounted(async () => {
  try {
    await site.loadAllPagesForAdmin();
  } catch {
    // keep defaults
  }
});
</script>
