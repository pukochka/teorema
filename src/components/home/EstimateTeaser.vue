<template>
  <section class="page-section">
    <div class="page-shell">
      <q-card class="estimate-teaser" flat>
        <q-card-section class="q-pa-lg q-pa-md-xl">
          <div class="row q-col-gutter-lg items-center">
            <div class="col-12 col-md-7">
              <SectionHeading
                eyebrow="Фотооценка"
                title="Оцените ремонт по фото"
                subtitle="Отправьте снимки повреждения — мы посмотрим объём работ и свяжемся с вами. Это удобно, если автомобиль ещё не на сервисе."
              />
              <div class="cta-row q-mt-lg">
                <q-btn
                  unelevated
                  no-caps
                  color="secondary"
                  text-color="dark"
                  icon="mdi-camera"
                  label="Рассчитать ремонт по фото"
                  to="/estimate"
                />
                <q-btn
                  unelevated
                  no-caps
                  color="white"
                  text-color="dark"
                  icon="mdi-calendar"
                  label="Записаться на сервис"
                  to="/booking"
                />
              </div>
            </div>
            <div class="col-12 col-md-5">
              <MediaPlaceholder
                label="Пример повреждения появится здесь"
                icon="mdi-camera-plus"
                min-height="240px"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import MediaPlaceholder from "@/components/common/MediaPlaceholder.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
</script>

<style lang="scss" scoped>
.estimate-teaser {
  overflow: hidden;
  color: #fff;
  background: linear-gradient(135deg, #056b91 0%, #0785b4 60%, #102a36 100%);
}

.estimate-teaser :deep(.section-heading),
.estimate-teaser :deep(.muted) {
  color: #fff;
}

.estimate-teaser :deep(.eyebrow) {
  color: #f5a83d;
}
</style>
