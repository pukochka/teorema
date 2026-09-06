<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 q-mb-md">Заявки</div>
    <q-tabs
      v-model="tab"
      dense
      align="left"
      active-color="primary"
      indicator-color="secondary"
    >
      <q-tab name="bookings" no-caps :label="`Запись (${bookings.length})`" />
      <q-tab
        name="estimates"
        no-caps
        :label="`Фотооценка (${estimates.length})`"
      />
      <q-tab name="fleet" no-caps :label="`Автопарки (${fleet.length})`" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="bookings" class="q-px-none">
        <q-markup-table v-if="bookings.length" flat bordered wrap-cells>
          <thead>
            <tr>
              <th class="text-left">Дата</th>
              <th class="text-left">Имя</th>
              <th class="text-left">Телефон</th>
              <th class="text-left">Авто</th>
              <th class="text-left">Услуга</th>
              <th class="text-left">Когда</th>
              <th class="text-left">Комментарий</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in bookings" :key="item.id">
              <td>{{ formatDateTime(item.created_at) }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ vehicleLabel(item.brand, item.model, item.year) }}</td>
              <td>{{ item.service }}</td>
              <td>{{
                [item.preferred_date, item.preferred_time]
                  .filter(Boolean)
                  .join(" ") || "—"
              }}</td>
              <td>{{ item.comment || "—" }}</td>
            </tr>
          </tbody>
        </q-markup-table>
        <q-banner v-else class="bg-grey-2">Заявок на запись пока нет.</q-banner>
      </q-tab-panel>

      <q-tab-panel name="estimates" class="q-px-none">
        <q-markup-table v-if="estimates.length" flat bordered wrap-cells>
          <thead>
            <tr>
              <th class="text-left">Дата</th>
              <th class="text-left">Имя</th>
              <th class="text-left">Телефон</th>
              <th class="text-left">Авто</th>
              <th class="text-left">Услуга</th>
              <th class="text-left">Фото</th>
              <th class="text-left">Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in estimates" :key="item.id">
              <td>{{ formatDateTime(item.created_at) }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ vehicleLabel(item.brand, item.model, item.year) }}</td>
              <td>{{ item.service_type }}</td>
              <td>{{ item.photo_paths?.length || 0 }}</td>
              <td>{{ item.description || "—" }}</td>
            </tr>
          </tbody>
        </q-markup-table>
        <q-banner v-else class="bg-grey-2"
          >Заявок на фотооценку пока нет.</q-banner
        >
      </q-tab-panel>

      <q-tab-panel name="fleet" class="q-px-none">
        <q-markup-table v-if="fleet.length" flat bordered wrap-cells>
          <thead>
            <tr>
              <th class="text-left">Дата</th>
              <th class="text-left">Компания</th>
              <th class="text-left">Контакт</th>
              <th class="text-left">Телефон</th>
              <th class="text-left">Автопарк</th>
              <th class="text-left">Услуги</th>
              <th class="text-left">Комментарий</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in fleet" :key="item.id">
              <td>{{ formatDateTime(item.created_at) }}</td>
              <td>{{ item.company }}</td>
              <td>{{ item.contact_name }}</td>
              <td>{{ item.phone }}</td>
              <td>{{
                [item.vehicle_count, item.vehicle_types]
                  .filter(Boolean)
                  .join(", ") || "—"
              }}</td>
              <td>{{ item.services?.join(", ") || "—" }}</td>
              <td>{{ item.comment || "—" }}</td>
            </tr>
          </tbody>
        </q-markup-table>
        <q-banner v-else class="bg-grey-2"
          >Заявок от автопарков пока нет.</q-banner
        >
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Notify } from "quasar";
import { useSeo } from "@/composables/useSeo";
import { supabase } from "@/lib/supabase";
import type { BookingRow, EstimateRow, FleetRow } from "@/types/content";
import { formatDateTime } from "@/utils/datetime";

useSeo();

const tab = ref("bookings");
const bookings = ref<BookingRow[]>([]);
const estimates = ref<EstimateRow[]>([]);
const fleet = ref<FleetRow[]>([]);

function vehicleLabel(
  brand: string | null,
  model: string | null,
  year: number | null
) {
  return [brand, model, year].filter(Boolean).join(" ") || "—";
}

onMounted(async () => {
  if (!supabase) return;
  const [bookingRes, estimateRes, fleetRes] = await Promise.all([
    supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("repair_estimates")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("fleet_requests")
      .select("*")
      .order("created_at", { ascending: false })
  ]);

  if (bookingRes.error || estimateRes.error || fleetRes.error) {
    Notify.create({
      type: "negative",
      message:
        bookingRes.error?.message ||
        estimateRes.error?.message ||
        fleetRes.error?.message ||
        "Не удалось загрузить заявки."
    });
    return;
  }

  bookings.value = (bookingRes.data ?? []) as BookingRow[];
  estimates.value = (estimateRes.data ?? []) as EstimateRow[];
  fleet.value = (fleetRes.data ?? []) as FleetRow[];
});
</script>
