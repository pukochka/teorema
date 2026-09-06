<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Работы</div>
      <q-btn
        unelevated
        no-caps
        color="primary"
        icon="mdi-plus"
        label="Добавить"
        @click="openCreate"
      />
    </div>

    <q-banner v-if="!items.length && !loading" class="bg-grey-2 q-mb-md">
      Пока нет работ. Добавьте первый проект — он появится на странице «Наши
      работы».
    </q-banner>

    <q-markup-table v-if="items.length" flat bordered>
      <thead>
        <tr>
          <th class="text-left">Авто</th>
          <th class="text-left">Категория</th>
          <th class="text-left">Публикация</th>
          <th class="text-right">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.brand }} {{ item.model }}</td>
          <td>{{ categoryLabel(item.category) }}</td>
          <td>{{ item.published ? "Да" : "Черновик" }}</td>
          <td class="text-right">
            <q-btn
              flat
              dense
              no-caps
              color="primary"
              label="Изменить"
              @click="openEdit(item)"
            />
            <q-btn
              flat
              dense
              no-caps
              color="negative"
              label="Удалить"
              @click="remove(item)"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <q-dialog v-model="opened" persistent>
      <q-card style="min-width: min(640px, 96vw)">
        <q-card-section>
          <div class="text-h6">{{
            editingId ? "Редактировать работу" : "Новая работа"
          }}</div>
        </q-card-section>
        <q-card-section class="column q-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-input v-model="form.brand" outlined label="Марка" />
            </div>
            <div class="col-12 col-sm-6">
              <q-input v-model="form.model" outlined label="Модель" />
            </div>
          </div>
          <q-select
            v-model="form.category"
            outlined
            emit-value
            map-options
            :options="workCategoryOptions"
            option-value="category"
            option-label="label"
            label="Категория"
          />
          <q-input
            v-model="form.damage"
            outlined
            type="textarea"
            autogrow
            label="Повреждение"
          />
          <q-input
            v-model="worksText"
            outlined
            label="Выполненные работы"
            hint="Через запятую"
          />
          <q-input
            v-model.number="form.sort_order"
            outlined
            type="number"
            label="Порядок"
          />
          <q-toggle v-model="form.published" label="Показывать на сайте" />
          <q-file
            v-model="beforeFile"
            outlined
            label="Фото до"
            accept="image/*"
            clearable
          />
          <q-file
            v-model="processFile"
            outlined
            label="Фото процесса"
            accept="image/*"
            clearable
          />
          <q-file
            v-model="afterFile"
            outlined
            label="Фото после"
            accept="image/*"
            clearable
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat no-caps label="Отмена" v-close-popup />
          <q-btn
            unelevated
            no-caps
            color="primary"
            label="Сохранить"
            :loading="saving"
            @click="save"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Dialog, Notify } from "quasar";
import { workCategoryLabels, workCategoryOptions } from "@/data/works";
import { fileExtension, uploadSiteMedia } from "@/composables/useAdminMedia";
import { useSeo } from "@/composables/useSeo";
import { supabase } from "@/lib/supabase";
import { useSiteStore } from "@/stores/site";
import type { WorkRow } from "@/types/content";
import type { WorkCategory } from "@/types/work";

useSeo();

const site = useSiteStore();
const items = ref<WorkRow[]>([]);
const loading = ref(false);
const opened = ref(false);
const saving = ref(false);
const editingId = ref("");
const worksText = ref("");
const beforeFile = ref<File | null>(null);
const processFile = ref<File | null>(null);
const afterFile = ref<File | null>(null);

const form = reactive({
  brand: "",
  model: "",
  category: "repair" as Exclude<WorkCategory, "all">,
  damage: "",
  before_url: "",
  process_url: "",
  after_url: "",
  published: true,
  sort_order: 0
});

function categoryLabel(category: string) {
  return workCategoryLabels[category] || category;
}

function resetForm() {
  editingId.value = "";
  worksText.value = "";
  beforeFile.value = null;
  processFile.value = null;
  afterFile.value = null;
  form.brand = "";
  form.model = "";
  form.category = "repair";
  form.damage = "";
  form.before_url = "";
  form.process_url = "";
  form.after_url = "";
  form.published = true;
  form.sort_order = items.value.length;
}

function openCreate() {
  resetForm();
  opened.value = true;
}

function openEdit(item: WorkRow) {
  editingId.value = item.id;
  form.brand = item.brand;
  form.model = item.model;
  form.category = item.category;
  form.damage = item.damage;
  form.before_url = item.before_url || "";
  form.process_url = item.process_url || "";
  form.after_url = item.after_url || "";
  form.published = item.published;
  form.sort_order = item.sort_order;
  worksText.value = item.works.join(", ");
  beforeFile.value = null;
  processFile.value = null;
  afterFile.value = null;
  opened.value = true;
}

async function loadItems() {
  if (!supabase) return;
  loading.value = true;
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .order("sort_order", { ascending: true });
  loading.value = false;
  if (error) {
    Notify.create({ type: "negative", message: error.message });
    return;
  }
  items.value = (data ?? []) as WorkRow[];
}

async function uploadSlot(
  workId: string,
  slot: "before" | "process" | "after",
  file: File | null,
  current: string
) {
  if (!file) return current;
  const path = `works/${workId}/${slot}-${Date.now()}.${fileExtension(file)}`;
  return uploadSiteMedia(path, file);
}

async function save() {
  if (!form.brand.trim() || !form.model.trim()) {
    Notify.create({ type: "warning", message: "Укажите марку и модель." });
    return;
  }
  if (!supabase) {
    Notify.create({ type: "warning", message: "Supabase не настроен." });
    return;
  }

  saving.value = true;
  try {
    const id = editingId.value || crypto.randomUUID();
    const [before, process, after] = await Promise.all([
      uploadSlot(id, "before", beforeFile.value, form.before_url),
      uploadSlot(id, "process", processFile.value, form.process_url),
      uploadSlot(id, "after", afterFile.value, form.after_url)
    ]);

    const payload = {
      id,
      brand: form.brand.trim(),
      model: form.model.trim(),
      category: form.category,
      damage: form.damage.trim(),
      works: worksText.value
        .split(",")
        .map(item => item.trim())
        .filter(Boolean),
      before_url: before || null,
      process_url: process || null,
      after_url: after || null,
      published: form.published,
      sort_order: Number(form.sort_order) || 0
    };

    const { error } = await supabase.from("works").upsert(payload);
    if (error) throw error;
    opened.value = false;
    await loadItems();
    await site.loadContent();
    Notify.create({ type: "positive", message: "Работа сохранена." });
  } catch (error) {
    Notify.create({
      type: "negative",
      message: error instanceof Error ? error.message : "Не удалось сохранить."
    });
  } finally {
    saving.value = false;
  }
}

function remove(item: WorkRow) {
  Dialog.create({
    title: "Удалить работу?",
    message: `${item.brand} ${item.model}`,
    cancel: { flat: true, noCaps: true, label: "Отмена" },
    ok: { unelevated: true, noCaps: true, color: "negative", label: "Удалить" }
  }).onOk(async () => {
    if (!supabase) return;
    const { error } = await supabase.from("works").delete().eq("id", item.id);
    if (error) {
      Notify.create({ type: "negative", message: error.message });
      return;
    }
    await loadItems();
    await site.loadContent();
    Notify.create({ type: "positive", message: "Работа удалена." });
  });
}

onMounted(loadItems);
</script>
