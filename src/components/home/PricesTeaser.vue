<template>
  <section class="page-section page-shell">
    <SectionHeading
      eyebrow="Стоимость"
      title="Цены"
      subtitle="Точную стоимость работ называем после диагностики. Для кузова и покраски можно начать с фотографий."
    />
    <div class="row q-col-gutter-md q-mt-lg">
      <div class="col-12 col-md-4">
        <q-card class="surface-card full-height" flat bordered>
          <q-card-section>
            <div class="text-h6">Диагностика и ТО</div>
            <p class="muted">Стоимость определяется после диагностики</p>
            <q-btn
              unelevated
              no-caps
              color="primary"
              to="/prices"
              label="Смотреть разделы цен"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="surface-card full-height" flat bordered>
          <q-card-section>
            <div class="text-h6">Кузов и покраска</div>
            <p class="muted">
              Отправьте фотографии автомобиля для предварительной оценки.
            </p>
            <q-btn
              unelevated
              no-caps
              color="secondary"
              text-color="dark"
              to="/estimate"
              label="Оценить по фото"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="surface-card full-height" flat bordered>
          <q-card-section>
            <div class="text-h6">Индивидуальный расчёт</div>
            <p class="muted">Стоимость рассчитывается индивидуально</p>
            <q-btn
              outline
              no-caps
              color="primary"
              to="/booking"
              label="Записаться на сервис"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from "@/components/common/SectionHeading.vue";
</script>
