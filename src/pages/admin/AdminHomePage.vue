<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 q-mb-lg">Сводка</div>
    <div class="row q-col-gutter-md">
      <div
        v-for="card in cards"
        :key="card.to"
        class="col-12 col-sm-6 col-md-3"
      >
        <q-card class="surface-card" flat bordered>
          <q-card-section>
            <div class="muted">{{ card.label }}</div>
            <div class="text-h4">{{ card.value }}</div>
          </q-card-section>
          <q-card-actions>
            <q-btn
              flat
              no-caps
              color="primary"
              :to="card.to"
              :label="card.action"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useSeo } from "@/composables/useSeo";
import { supabase } from "@/lib/supabase";

useSeo();

const bookingCount = ref(0);
const estimateCount = ref(0);
const fleetCount = ref(0);
const reviewCount = ref(0);

const cards = computed(() => [
  {
    label: "Записи",
    value: bookingCount.value,
    to: "/admin/leads",
    action: "Смотреть заявки"
  },
  {
    label: "Фотооценки",
    value: estimateCount.value,
    to: "/admin/leads",
    action: "Смотреть заявки"
  },
  {
    label: "Автопарки",
    value: fleetCount.value,
    to: "/admin/leads",
    action: "Смотреть заявки"
  },
  {
    label: "Отзывы",
    value: reviewCount.value,
    to: "/admin/reviews",
    action: "Редактировать"
  }
]);

onMounted(async () => {
  if (!supabase) return;
  const [bookings, estimates, fleet, reviews] = await Promise.all([
    supabase.from("bookings").select("id", { count: "exact", head: true }),
    supabase
      .from("repair_estimates")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("fleet_requests")
      .select("id", { count: "exact", head: true }),
    supabase.from("reviews").select("id", { count: "exact", head: true })
  ]);
  bookingCount.value = bookings.count ?? 0;
  estimateCount.value = estimates.count ?? 0;
  fleetCount.value = fleet.count ?? 0;
  reviewCount.value = reviews.count ?? 0;
});
</script>
