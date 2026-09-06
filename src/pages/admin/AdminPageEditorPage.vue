<template>
  <q-page class="q-pa-lg">
    <div class="row items-center q-mb-md">
      <q-btn
        flat
        no-caps
        icon="mdi-arrow-left"
        to="/admin/pages"
        label="К списку"
      />
    </div>
    <div class="text-h5 q-mb-sm">{{ form.name || "Страница" }}</div>
    <p class="muted">
      После публикации изменения появятся в поиске после пересборки сайта.
    </p>

    <q-banner
      v-if="warnings.length"
      class="bg-orange-1 q-mb-md"
    >
      <div
        v-for="item in warnings"
        :key="item"
      >
        {{ item }}
      </div>
    </q-banner>

    <q-form
      class="column q-gutter-md"
      style="max-width: 880px"
      @submit.prevent="save"
    >
      <q-input
        outlined
        label="Название страницы"
        v-model="form.name"
      />
      <q-input
        outlined
        label="URL / slug"
        hint="Только латиница, цифры и дефис. Для услуг путь будет /uslugi/{slug}"
        :disable="form.type !== 'service'"
        :error="slugError"
        :error-message="slugErrorMessage"
        v-model="form.slug"
      />
      <q-input
        outlined
        label="SEO Title"
        :hint="titleLengthHint(form.seoTitle)"
        v-model="form.seoTitle"
      />
      <q-input
        outlined
        autogrow
        type="textarea"
        label="Meta Description"
        :hint="descriptionLengthHint(form.seoDescription)"
        v-model="form.seoDescription"
      />
      <q-input
        outlined
        label="H1"
        v-model="form.h1"
      />
      <q-input
        outlined
        autogrow
        type="textarea"
        label="Подзаголовок"
        v-model="form.subtitle"
      />
      <q-input
        outlined
        autogrow
        type="textarea"
        label="Основной текст"
        v-model="form.intro"
      />

      <div class="text-h6">Блоки</div>
      <div
        v-for="(block, index) in form.blocks"
        :key="block.id"
        class="column q-gutter-sm"
      >
        <q-input
          outlined
          label="Заголовок блока"
          v-model="block.title"
        />
        <q-input
          outlined
          autogrow
          type="textarea"
          label="Текст блока"
          v-model="block.text"
        />
        <q-btn
          flat
          no-caps
          color="negative"
          label="Удалить блок"
          @click="form.blocks.splice(index, 1)"
        />
      </div>
      <q-btn
        outline
        no-caps
        color="primary"
        label="Добавить блок"
        @click="addBlock"
      />

      <div class="text-h6">FAQ</div>
      <div
        v-for="(item, index) in form.faq"
        :key="item.id"
        class="column q-gutter-sm"
      >
        <q-input
          outlined
          label="Вопрос"
          v-model="item.question"
        />
        <q-input
          outlined
          autogrow
          type="textarea"
          label="Ответ"
          v-model="item.answer"
        />
        <q-btn
          flat
          no-caps
          color="negative"
          label="Удалить вопрос"
          @click="form.faq.splice(index, 1)"
        />
      </div>
      <q-btn
        outline
        no-caps
        color="primary"
        label="Добавить вопрос"
        @click="addFaq"
      />

      <q-input
        outlined
        label="Изображение (URL)"
        v-model="form.image"
      />
      <q-file
        outlined
        label="Загрузить изображение"
        accept="image/jpeg,image/png,image/webp"
        @update:model-value="onUpload($event, 'image')"
      />
      <q-input
        outlined
        label="Alt изображения"
        v-model="form.imageAlt"
      />
      <q-input
        outlined
        label="Open Graph title"
        v-model="form.ogTitle"
      />
      <q-input
        outlined
        autogrow
        type="textarea"
        label="Open Graph description"
        v-model="form.ogDescription"
      />
      <q-input
        outlined
        label="Open Graph image (URL)"
        v-model="form.ogImage"
      />
      <q-file
        outlined
        label="Загрузить OG-изображение"
        accept="image/jpeg,image/png,image/webp"
        @update:model-value="onUpload($event, 'ogImage')"
      />
      <q-input
        outlined
        label="Canonical"
        hint="Пусто — подставится автоматически по URL страницы"
        v-model="form.canonical"
      />

      <q-select
        outlined
        emit-value
        map-options
        :options="statusOptions"
        label="Статус"
        v-model="form.status"
      />
      <q-toggle
        label="Разрешить индексацию"
        v-model="form.robotsIndex"
      />

      <SerpPreview
        :title="form.seoTitle"
        :description="form.seoDescription"
        :url="previewUrl"
      />

      <div class="row q-gutter-sm">
        <q-btn
          unelevated
          no-caps
          color="primary"
          type="submit"
          label="Сохранить"
          :loading="saving"
        />
        <q-btn
          outline
          no-caps
          color="primary"
          label="Предпросмотр"
          :to="`/admin/preview/${form.id}`"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { Notify } from "quasar";
import SerpPreview from "@/components/admin/SerpPreview.vue";
import { uploadSiteMedia } from "@/composables/useAdminMedia";
import { useSeo } from "@/composables/useSeo";
import { defaultManagedPages } from "@/data/pages";
import { supabase } from "@/lib/supabase";
import { useSiteStore } from "@/stores/site";
import type { ManagedPage } from "@/types/page";
import { toPageRow } from "@/types/content";
import { CONTENT_UPDATED_AT_ISO } from "@/seo/manifest";
import { flattenRedirects, wouldCreateCycle } from "@/utils/redirects";
import { normalizePath, servicePath } from "@/utils/paths";
import { isValidSlug, normalizeSlug } from "@/utils/slug";
import {
  descriptionLengthHint,
  findDuplicateSeo,
  isSlugTaken,
  titleLengthHint
} from "@/utils/seoValidation";

useSeo();

const route = useRoute();
const site = useSiteStore();
const saving = ref(false);
const original = ref<ManagedPage | null>(null);

const form = reactive<ManagedPage>({
  id: "",
  type: "static",
  name: "",
  slug: "",
  path: "/",
  seoTitle: "",
  seoDescription: "",
  h1: "",
  subtitle: "",
  intro: "",
  blocks: [],
  faq: [],
  image: "",
  imageAlt: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  status: "published",
  robotsIndex: true,
  canonical: "",
  updatedAt: CONTENT_UPDATED_AT_ISO
});

const statusOptions = [
  { label: "Опубликовано", value: "published" },
  { label: "Черновик", value: "draft" }
];

const slugError = computed(() => {
  if (form.type !== "service") return false;
  const slug = normalizeSlug(form.slug);
  return !isValidSlug(slug) || isSlugTaken(slug, form.id, site.pages);
});

const slugErrorMessage = computed(() => {
  if (form.type !== "service") return "";
  if (!isValidSlug(normalizeSlug(form.slug))) {
    return "Допустимы строчные латинские буквы, цифры и дефис.";
  }
  if (isSlugTaken(normalizeSlug(form.slug), form.id, site.pages)) {
    return "Такой slug уже занят.";
  }
  return "";
});

const warnings = computed(() => {
  const items: string[] = [];
  if (!form.seoTitle.trim()) items.push("SEO Title пустой.");
  if (!form.seoDescription.trim()) items.push("Meta Description пустое.");
  const dup = findDuplicateSeo(form, site.pages);
  if (dup.title) items.push("Такой title уже есть у другой страницы.");
  if (dup.description) items.push("Такое description уже есть у другой страницы.");
  return items;
});

const previewUrl = computed(() =>
  `${site.config.seo.siteUrl.replace(/\/$/, "")}${form.path === "/" ? "/" : form.path}`
);

function assignPage(page: ManagedPage) {
  original.value = structuredClone(page);
  Object.assign(form, structuredClone(page));
  form.blocks = page.blocks.map(item => ({ ...item }));
  form.faq = page.faq.map(item => ({ ...item }));
}

function addBlock() {
  form.blocks.push({
    id: `block-${Date.now()}`,
    title: "",
    text: ""
  });
}

function addFaq() {
  form.faq.push({
    id: `faq-${Date.now()}`,
    question: "",
    answer: ""
  });
}

async function onUpload(file: File | File[] | null, field: "image" | "ogImage") {
  const selected = Array.isArray(file) ? file[0] : file;
  if (!selected) return;
  try {
    const url = await uploadSiteMedia(`pages/${form.id}/${field}`, selected);
    form[field] = url;
    Notify.create({ type: "positive", message: "Файл загружен." });
  } catch (error) {
    Notify.create({
      type: "negative",
      message: error instanceof Error ? error.message : "Не удалось загрузить файл."
    });
  }
}

onMounted(async () => {
  const id = String(route.params.id || "");
  try {
    await site.loadAllPagesForAdmin();
  } catch {
    // defaults remain
  }
  const page =
    site.pageById(id) || defaultManagedPages.find(item => item.id === id);
  if (page) assignPage(page);
});

async function save() {
  if (form.type === "service") {
    form.slug = normalizeSlug(form.slug);
    if (!isValidSlug(form.slug)) {
      Notify.create({ type: "negative", message: "Исправьте slug." });
      return;
    }
    if (isSlugTaken(form.slug, form.id, site.pages)) {
      Notify.create({ type: "negative", message: "Slug должен быть уникальным." });
      return;
    }
    form.path = servicePath(form.slug);
  }

  const previous = original.value;
  const nextRedirects = [...site.redirects];

  if (
    previous &&
    previous.status === "published" &&
    previous.path !== form.path
  ) {
    if (wouldCreateCycle(nextRedirects, previous.path, form.path)) {
      Notify.create({
        type: "negative",
        message: "Такой редирект создаст цикл. Выберите другой URL."
      });
      return;
    }
    nextRedirects.push({
      id: `redirect-${Date.now()}`,
      fromPath: normalizePath(previous.path),
      toPath: normalizePath(form.path),
      createdAt: new Date().toISOString()
    });
  }

  const flattened = flattenRedirects(nextRedirects);
  form.updatedAt = new Date().toISOString();
  saving.value = true;

  try {
    if (!supabase) {
      site.upsertLocalPage({ ...form });
      site.applyRedirects(flattened);
      Notify.create({
        type: "warning",
        message: "Сохранено только в этой вкладке: Supabase не настроен."
      });
      original.value = structuredClone(form);
      return;
    }

    const { error } = await supabase.from("pages").upsert(toPageRow({ ...form }));
    if (error) throw error;

    if (previous && previous.path !== form.path) {
      const added = flattened.filter(
        rule => rule.fromPath === normalizePath(previous.path)
      );
      for (const rule of added) {
        const { error: redirectError } = await supabase
          .from("redirects")
          .upsert(
            {
              from_path: rule.fromPath,
              to_path: rule.toPath
            },
            { onConflict: "from_path" }
          );
        if (redirectError) throw redirectError;
      }
    }

    site.upsertLocalPage({ ...form });
    site.applyRedirects(flattened);
    original.value = structuredClone(form);
    Notify.create({
      type: "positive",
      message:
        "Сохранено. Чтобы изменения появились в публичном HTML, нужна пересборка сайта."
    });
  } catch (error) {
    Notify.create({
      type: "negative",
      message: error instanceof Error ? error.message : "Не удалось сохранить."
    });
  } finally {
    saving.value = false;
  }
}
</script>
