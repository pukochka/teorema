<template>
  <q-card v-if="hasMessengers" class="messenger-prompt" flat bordered>
    <q-card-section class="q-pa-lg">
      <div class="eyebrow">Без звонка и форм</div>
      <h2 class="text-h5 q-mt-sm q-mb-sm">{{ title }}</h2>
      <p class="muted q-mb-md">{{ text }}</p>
      <MessengerButtons :message="message" />
      <p v-if="preview" class="muted q-mt-md q-mb-none text-caption">
        В чат подставится текст: «{{ preview }}»
      </p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useMessengers } from "@/composables/useMessengers";
import MessengerButtons from "./MessengerButtons.vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    text?: string;
    message?: string | undefined;
  }>(),
  {
    title: "Напишите нам в Telegram или Viber",
    text: "Отправьте сообщение — подтвердим запись и ответим на вопросы."
  }
);

const { hasMessengers, messengers } = useMessengers();
const preview = computed(
  () => props.message || messengers.value[0]?.prefillMessage || ""
);
</script>
