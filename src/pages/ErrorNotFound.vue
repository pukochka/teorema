<template>
  <div class="fullscreen text-center q-pa-md flex flex-center error-page">
    <div>
      <div class="error-page__code">404</div>
      <div class="text-h4 text-white q-mt-md">Страница не найдена</div>
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
import { useSeo } from "@/composables/useSeo";

useSeo({
  title: "Страница не найдена — Teorema Service",
  description: "Запрашиваемая страница не найдена.",
  robots: "noindex, nofollow"
});
</script>

<style lang="scss" scoped>
.error-page {
  background: linear-gradient(135deg, #056b91, #102a36);
}

.error-page__code {
  font-family: "Oswald", sans-serif;
  font-size: clamp(6rem, 18vw, 12rem);
  line-height: 1;
  color: #f4d329;
}
</style>
