<template>
  <section class="page-section page-shell">
    <div class="row q-col-gutter-md">
      <div
        v-for="item in trustItems"
        :key="item.id"
        class="col-12 col-sm-6 col-lg-3"
      >
        <q-card class="surface-card full-height" flat>
          <q-card-section>
            <div class="surface-icon">
              <q-icon :name="item.icon" size="24px" />
            </div>
            <div class="text-h6 q-mt-md">{{ item.title }}</div>
            <p class="muted q-mb-none">{{ item.description }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { trustItems } from "@/data/services";
</script>
