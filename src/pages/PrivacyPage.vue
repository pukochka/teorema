<template>
  <q-page class="bg-white">
    <section class="page-section page-shell" style="max-width: 820px">
      <PageCrumbs label="Обработка данных" />
      <SectionHeading
        heading-tag="h1"
        title="Обработка предоставленных данных"
        subtitle="Данные из форм сайта используются только для обработки обращения."
      />
      <div class="q-mt-lg text-body1">
        <p>
          Когда вы отправляете форму записи, оценки ремонта по фото или заявку
          на обслуживание автопарка, Teorema Service получает указанные вами
          сведения: имя, телефон, при необходимости email, данные автомобиля и
          описание работ.
        </p>
        <p>
          Эти данные нужны, чтобы связаться с вами, уточнить детали и ответить
          на обращение. Фотографии повреждений используются только для
          предварительной оценки ремонта.
        </p>
        <p>
          Мы не обещаем сроки хранения, передачу третьим лицам или иные условия,
          которые нельзя подтвердить. Если нужно удалить обращение, напишите или
          позвоните по контактным телефонам сервиса.
        </p>
        <p class="muted">
          Отправляя форму, вы соглашаетесь на обработку предоставленных данных.
        </p>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import PageCrumbs from "@/components/common/PageCrumbs.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import { useSeo } from "@/composables/useSeo";

useSeo();
</script>
