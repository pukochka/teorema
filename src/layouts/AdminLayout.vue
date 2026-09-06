<template>
  <q-layout view="hHh Lpr lFf" class="admin-layout">
    <q-header class="admin-layout__header">
      <q-toolbar>
        <q-btn
          class="lt-md"
          flat
          round
          dense
          icon="mdi-menu"
          aria-label="Открыть меню"
          @click="drawer = !drawer"
        />
        <q-toolbar-title>Админка Teorema Service</q-toolbar-title>
        <q-btn
          flat
          no-caps
          icon="mdi-open-in-new"
          label="На сайт"
          to="/"
          target="_blank"
        />
        <q-btn flat no-caps icon="mdi-logout" label="Выйти" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
      :width="260"
      class="admin-layout__drawer"
    >
      <q-list padding>
        <q-item
          v-for="item in nav"
          :key="item.to"
          v-ripple
          clickable
          :to="item.to"
          exact
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" color="primary" />
          </q-item-section>
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSeo } from "@/composables/useSeo";
import { useAuthStore } from "@/stores/auth";

useSeo();

const router = useRouter();
const auth = useAuthStore();
const drawer = ref(false);

const nav = [
  { label: "Сводка", to: "/admin", icon: "mdi-view-dashboard" },
  { label: "Контакты", to: "/admin/settings", icon: "mdi-card-account-phone" },
  { label: "Работы", to: "/admin/works", icon: "mdi-image-multiple" },
  { label: "Отзывы", to: "/admin/reviews", icon: "mdi-star-outline" },
  { label: "Заявки", to: "/admin/leads", icon: "mdi-inbox" }
];

async function logout() {
  await auth.signOut();
  await router.push("/admin/login");
}
</script>

<style lang="scss" scoped>
.admin-layout__header {
  background: #102a36;
  color: #fff;
}

.admin-layout__header :deep(.q-btn) {
  color: #fff;
}
</style>
