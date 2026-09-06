<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Отзывы</div>
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
      Пока нет отзывов. Добавленные отзывы появятся на главной.
    </q-banner>

    <q-markup-table v-if="items.length" flat bordered>
      <thead>
        <tr>
          <th class="text-left">Имя</th>
          <th class="text-left">Источник</th>
          <th class="text-left">Оценка</th>
          <th class="text-left">Публикация</th>
          <th class="text-right">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.source }}</td>
          <td>{{ item.rating }}</td>
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
      <q-card style="min-width: min(560px, 96vw)">
        <q-card-section>
          <div class="text-h6">{{
            editingId ? "Редактировать отзыв" : "Новый отзыв"
          }}</div>
        </q-card-section>
        <q-card-section class="column q-gutter-md">
          <q-input v-model="form.name" outlined label="Имя" />
          <q-input
            v-model="form.text"
            outlined
            type="textarea"
            autogrow
            label="Текст"
          />
          <q-input v-model="form.source" outlined label="Источник" />
          <q-input v-model="form.date" outlined type="date" label="Дата" />
          <q-input
            v-model.number="form.rating"
            outlined
            type="number"
            min="1"
            max="5"
            label="Оценка"
          />
          <q-input
            v-model.number="form.sort_order"
            outlined
            type="number"
            label="Порядок"
          />
          <q-toggle v-model="form.published" label="Показывать на сайте" />
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
import { useSeo } from "@/composables/useSeo";
import { supabase } from "@/lib/supabase";
import { useSiteStore } from "@/stores/site";
import type { ReviewRow } from "@/types/content";

useSeo();

const site = useSiteStore();
const items = ref<ReviewRow[]>([]);
const loading = ref(false);
const opened = ref(false);
const saving = ref(false);
const editingId = ref("");

const form = reactive({
  name: "",
  text: "",
  source: "",
  date: new Date().toISOString().slice(0, 10),
  rating: 5,
  published: true,
  sort_order: 0
});

function resetForm() {
  editingId.value = "";
  form.name = "";
  form.text = "";
  form.source = "";
  form.date = new Date().toISOString().slice(0, 10);
  form.rating = 5;
  form.published = true;
  form.sort_order = items.value.length;
}

function openCreate() {
  resetForm();
  opened.value = true;
}

function openEdit(item: ReviewRow) {
  editingId.value = item.id;
  form.name = item.name;
  form.text = item.text;
  form.source = item.source;
  form.date = item.date;
  form.rating = item.rating;
  form.published = item.published;
  form.sort_order = item.sort_order;
  opened.value = true;
}

async function loadItems() {
  if (!supabase) return;
  loading.value = true;
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("sort_order", { ascending: true });
  loading.value = false;
  if (error) {
    Notify.create({ type: "negative", message: error.message });
    return;
  }
  items.value = (data ?? []) as ReviewRow[];
}

async function save() {
  if (!form.name.trim() || !form.text.trim()) {
    Notify.create({ type: "warning", message: "Укажите имя и текст отзыва." });
    return;
  }
  if (!supabase) {
    Notify.create({ type: "warning", message: "Supabase не настроен." });
    return;
  }

  saving.value = true;
  try {
    const payload = {
      id: editingId.value || crypto.randomUUID(),
      name: form.name.trim(),
      text: form.text.trim(),
      source: form.source.trim(),
      date: form.date,
      rating: Math.min(5, Math.max(1, Number(form.rating) || 5)),
      published: form.published,
      sort_order: Number(form.sort_order) || 0
    };
    const { error } = await supabase.from("reviews").upsert(payload);
    if (error) throw error;
    opened.value = false;
    await loadItems();
    await site.loadContent();
    Notify.create({ type: "positive", message: "Отзыв сохранён." });
  } catch (error) {
    Notify.create({
      type: "negative",
      message: error instanceof Error ? error.message : "Не удалось сохранить."
    });
  } finally {
    saving.value = false;
  }
}

function remove(item: ReviewRow) {
  Dialog.create({
    title: "Удалить отзыв?",
    message: item.name,
    cancel: { flat: true, noCaps: true, label: "Отмена" },
    ok: { unelevated: true, noCaps: true, color: "negative", label: "Удалить" }
  }).onOk(async () => {
    if (!supabase) return;
    const { error } = await supabase.from("reviews").delete().eq("id", item.id);
    if (error) {
      Notify.create({ type: "negative", message: error.message });
      return;
    }
    await loadItems();
    await site.loadContent();
    Notify.create({ type: "positive", message: "Отзыв удалён." });
  });
}

onMounted(loadItems);
</script>
