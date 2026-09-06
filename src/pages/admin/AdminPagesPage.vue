<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 q-mb-sm">Страницы и SEO</div>
    <p class="muted q-mb-lg">
      Черновики не видны посетителям. После публикации нужна пересборка сайта,
      чтобы новый HTML попал в поиск.
    </p>

    <q-banner
      v-if="!auth.isAdmin && supabaseReady"
      class="bg-warning text-dark q-mb-md"
    >
      Запись доступна только пользователям из списка администраторов.
    </q-banner>

    <q-markup-table
      flat
      bordered
    >
      <thead>
        <tr>
          <th class="text-left">Страница</th>
          <th class="text-left">URL</th>
          <th class="text-left">Статус</th>
          <th class="text-left">Индексация</th>
          <th class="text-right">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="page in pages"
          :key="page.id"
        >
          <td>{{ page.name }}</td>
          <td>{{ page.path }}</td>
          <td>{{ page.status === "published" ? "Опубликовано" : "Черновик" }}</td>
          <td>{{ page.robotsIndex ? "index" : "noindex" }}</td>
          <td class="text-right">
            <q-btn
              flat
              dense
              no-caps
              color="primary"
              label="Изменить"
              :to="`/admin/pages/${page.id}`"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { Notify } from "quasar";
import { useSeo } from "@/composables/useSeo";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth";
import { useSiteStore } from "@/stores/site";

useSeo();

const site = useSiteStore();
const auth = useAuthStore();
const supabaseReady = Boolean(supabase);
const pages = computed(() =>
  [...site.pages].sort((a, b) => a.path.localeCompare(b.path))
);

onMounted(async () => {
  try {
    await site.loadAllPagesForAdmin();
  } catch (error) {
    Notify.create({
      type: "warning",
      message:
        error instanceof Error
          ? error.message
          : "Не удалось загрузить страницы из базы. Показаны тексты из кода."
    });
  }
});
</script>
