<template>
  <q-page
    v-if="page && (page.status === 'published' || preview)"
    class="bg-white"
  >
    <section class="page-section page-shell">
      <PageCrumbs
        :crumbs="[
          { name: 'Услуги', path: '/' },
          { name: page.name, path: page.path }
        ]"
      />
      <SectionHeading
        heading-tag="h1"
        :eyebrow="page.name"
        :title="page.h1"
        :subtitle="page.subtitle"
      />
      <p
        v-if="page.intro"
        class="text-body1 q-mt-md q-mb-none"
      >
        {{ page.intro }}
      </p>
      <div class="cta-row q-mt-lg">
        <q-btn
          unelevated
          no-caps
          color="secondary"
          text-color="dark"
          to="/booking"
          :label="page.cta || site.cta.book"
        />
        <q-btn
          v-if="page.estimatePreferred"
          unelevated
          no-caps
          color="primary"
          to="/estimate"
          :label="site.cta.clarifyPrice"
        />
      </div>
    </section>

    <section
      v-if="page.blocks.length"
      class="page-section page-shell"
    >
      <div
        v-for="block in page.blocks"
        :key="block.id"
        class="q-mb-lg"
      >
        <h2
          v-if="block.title"
          class="text-h5 q-mt-none"
        >
          {{ block.title }}
        </h2>
        <p class="text-body1 q-mb-none">{{ block.text }}</p>
      </div>
    </section>

    <FaqSection :items="page.faq" />

    <section
      v-if="related.length"
      class="page-section page-shell"
    >
      <SectionHeading title="Связанные услуги" />
      <div class="row q-col-gutter-md q-mt-md">
        <div
          v-for="item in related"
          :key="item.id"
          class="col-12 col-sm-6 col-md-4"
        >
          <q-card
            flat
            bordered
            class="surface-card full-height"
          >
            <q-card-section>
              <div class="text-h6">{{ item.name }}</div>
              <p class="muted">{{ item.cardDescription || item.intro }}</p>
              <q-btn
                unelevated
                no-caps
                color="primary"
                :to="item.path"
                label="Подробнее"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <div class="page-shell q-pb-xl">
      <ContactCTA
        title="Записаться или уточнить стоимость"
        text="Позвоните, оставьте заявку или отправьте фотографии."
        :estimate-label="site.cta.clarifyPrice"
      />
    </div>
    <component
      :is="'script'"
      v-if="serviceLd"
      type="application/ld+json"
      v-html="serviceLd"
    />
    <component
      :is="'script'"
      v-if="faqLd"
      type="application/ld+json"
      v-html="faqLd"
    />
  </q-page>
  <ErrorNotFound v-else />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import ContactCTA from "@/components/common/ContactCTA.vue";
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import FaqSection from "@/components/home/FaqSection.vue";
import { faqJsonLd, serviceJsonLd, stringifyJsonLd } from "@/composables/useJsonLd";
import { useSeo } from "@/composables/useSeo";
import ErrorNotFound from "@/pages/ErrorNotFound.vue";
import { useSiteStore } from "@/stores/site";
import type { ManagedPage } from "@/types/page";

const props = defineProps<{
  previewId?: string;
}>();

const route = useRoute();
const store = useSiteStore();
const site = store.config;
const preview = computed(() => Boolean(props.previewId || route.meta.preview));

const page = computed(() => {
  if (props.previewId) return store.pageById(props.previewId);
  const fromMeta = route.meta.pageId ? store.pageById(String(route.meta.pageId)) : undefined;
  if (fromMeta) return fromMeta;
  const slug = typeof route.params.slug === "string" ? route.params.slug : "";
  return store.pages.find(
    item => item.type === "service" && item.slug === slug
  );
});

const related = computed(() =>
  (page.value?.relatedIds || [])
    .map(id => store.pageById(id))
    .filter((item): item is ManagedPage =>
      Boolean(item && item.status === "published")
    )
);

const serviceLd = computed(() => {
  if (!page.value) return "";
  return stringifyJsonLd(
    serviceJsonLd(page.value, site.seo.siteUrl, site.name)
  );
});

const faqLd = computed(() => {
  if (!page.value?.faq.length) return "";
  const data = faqJsonLd(page.value.faq);
  return data ? stringifyJsonLd(data) : "";
});

useSeo({
  robots: preview.value ? "noindex, nofollow" : undefined
});
</script>
