<template>
  <section
    v-if="items.length"
    class="page-section page-shell"
  >
    <SectionHeading
      eyebrow="Вопросы"
      title="Ответы на частые вопросы"
      subtitle="Коротко о том, какие автомобили принимаем и какие работы делаем."
    />
    <q-list
      bordered
      class="faq-list rounded-borders q-mt-lg"
    >
      <q-expansion-item
        v-for="item in items"
        :key="item.id"
        :label="item.question"
        header-class="text-weight-medium"
      >
        <q-card>
          <q-card-section class="text-body1">
            {{ item.answer }}
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from "@/components/common/SectionHeading.vue";
import type { FaqItem } from "@/types/page";

defineProps<{
  items: FaqItem[];
}>();
</script>
