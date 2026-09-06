<template>
  <q-page class="bg-white">
    <section class="page-section page-shell">
      <PageCrumbs label="Автосервис" />
      <SectionHeading
        heading-tag="h1"
        eyebrow="Автосервис"
        title="Техническое обслуживание и ремонт автомобилей"
        subtitle="Диагностика, плановое ТО, ходовая, тормоза, двигатель, электрика и шиномонтаж для легковых автомобилей и малого коммерческого транспорта."
      />
      <div class="cta-row q-mt-lg">
        <q-btn
          unelevated
          no-caps
          color="secondary"
          text-color="dark"
          to="/booking"
          label="Записаться на сервис"
        />
        <PhoneButton />
      </div>
    </section>

    <section class="page-section page-shell">
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          v-for="category in autoServiceCategories"
          :key="category.id"
          :icon="category.icon"
          :label="category.title"
          :caption="category.description"
          header-class="text-primary"
        >
          <q-card>
            <q-card-section>
              <q-list>
                <q-item v-for="item in category.items" :key="item">
                  <q-item-section avatar>
                    <q-icon name="mdi-check" color="secondary" />
                  </q-item-section>
                  <q-item-section>{{ item }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </section>

    <div class="page-shell q-pb-xl">
      <ContactCTA />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ContactCTA from "@/components/common/ContactCTA.vue";
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import PhoneButton from "@/components/common/PhoneButton.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import { autoServiceCategories } from "@/data/services";
import { useSeo } from "@/composables/useSeo";

useSeo();
</script>
