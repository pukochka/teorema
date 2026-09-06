<template>
  <q-layout view="hHh Lpr fFf" class="admin-login">
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="admin-login__card" flat bordered>
          <q-card-section>
            <div class="text-h5">Вход в админку</div>
            <p class="muted q-mb-none">
              Учётную запись создайте в Supabase Auth. Регистрация с сайта
              отключена.
            </p>
          </q-card-section>
          <q-card-section>
            <q-banner v-if="!configured" class="bg-warning text-dark q-mb-md">
              Supabase временно отключён. Админка и отправка заявок на сервер
              недоступны.
            </q-banner>
            <q-form class="column q-gutter-md" @submit.prevent="submit">
              <q-input
                v-model="email"
                type="email"
                outlined
                label="Email"
                autocomplete="username"
                :disable="!configured || loading"
              />
              <q-input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                outlined
                label="Пароль"
                autocomplete="current-password"
                :disable="!configured || loading"
              >
                <template #append>
                  <q-icon
                    class="cursor-pointer"
                    :name="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
              <q-btn
                unelevated
                no-caps
                color="primary"
                type="submit"
                label="Войти"
                :loading="loading"
                :disable="!configured"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notify } from "quasar";
import { useSeo } from "@/composables/useSeo";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/auth";

useSeo();

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const configured = Boolean(supabase);
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

async function submit() {
  loading.value = true;
  try {
    await auth.signIn(email.value.trim(), password.value);
    const redirect =
      typeof route.query.redirect === "string" &&
      route.query.redirect.startsWith("/admin")
        ? route.query.redirect
        : "/admin";
    await router.replace(redirect);
  } catch (error) {
    Notify.create({
      type: "negative",
      message:
        error instanceof Error ? error.message : "Не удалось войти в админку."
    });
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.admin-login {
  background: #f5f8fa;
}

.admin-login__card {
  width: min(420px, calc(100vw - 32px));
}
</style>
