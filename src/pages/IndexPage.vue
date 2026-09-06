<template>
  <q-page class="bg-white">
    <HomeHero />
    <TrustStrip />
    <DirectionsSection />
    <PopularServices />
    <EstimateTeaser />
    <FeatureTeaser
      eyebrow="Кузовной ремонт"
      title="Кузовной цех в одном сервисе"
      text="Восстанавливаем автомобиль после ДТП: дефектовка, рихтовка, сварка, замена элементов и подготовка к покраске."
      :items="['дефектовка', 'рихтовка', 'сварка', 'замена элементов']"
      image="/images/workshop/body.jpg"
      image-alt="Кузовной цех Teorema Service"
      placeholder="Фото кузовного цеха появится здесь"
      icon="mdi-car-wrench"
      primary-to="/body-repair"
      primary-label="Кузовной ремонт"
      secondary-to="/estimate"
      secondary-label="Оценить по фото"
    />
    <FeatureTeaser
      eyebrow="Стапель"
      title="Стапельные работы"
      text="Если после удара нарушена геометрия кузова, автомобиль фиксируют на стапеле и возвращают контрольные точки в расчётные положения."
      :items="['измерение', 'фиксация', 'вытяжка', 'контроль геометрии']"
      image="/images/frame/bench.jpg"
      image-alt="Стапель Teorema Service"
      placeholder="Фото стапеля появится здесь"
      icon="mdi-ruler-square"
      primary-to="/frame-repair"
      primary-label="Стапельные работы"
      secondary-to="/estimate"
      secondary-label="Отправить фото повреждения"
      reverse
    />
    <FeatureTeaser
      eyebrow="Покраска"
      title="Покрасочная камера"
      text="Работы выполняются в покрасочной камере: подготовка, нанесение покрытия и сушка в контролируемых условиях."
      :items="['подбор цвета', 'подготовка', 'окраска', 'полировка']"
      image="/images/painting/booth.jpg"
      image-alt="Покрасочная камера Teorema Service"
      placeholder="Фото покрасочной камеры появится здесь"
      icon="mdi-format-paint"
      primary-to="/painting"
      primary-label="Покраска автомобилей"
      secondary-to="/booking"
      secondary-label="Записаться на сервис"
      show-video
      video-label="Видео покраски появится здесь"
    />
    <FeatureTeaser
      eyebrow="Коммерческий транспорт"
      title="Микроавтобусы и небольшие грузовики"
      text="Обслуживаем малый коммерческий транспорт: ТО, диагностика, ходовая, кузовной ремонт и покраска."
      image="/images/commercial/van.jpg"
      image-alt="Коммерческий транспорт в сервисе"
      placeholder="Фото коммерческого автомобиля появится здесь"
      icon="mdi-truck"
      primary-to="/commercial-vehicles"
      primary-label="Записать коммерческий автомобиль"
      reverse
    />
    <FeatureTeaser
      eyebrow="Автопарки"
      title="Обслуживание корпоративных автопарков"
      text="Teorema Service работает с компаниями, которым необходимо регулярно обслуживать несколько автомобилей."
      image="/images/commercial/fleet.jpg"
      image-alt="Корпоративный автопарк"
      placeholder="Фото автопарка появится здесь"
      icon="mdi-office-building"
      primary-to="/fleet"
      primary-label="Обсудить обслуживание автопарка"
    />
    <RepairTimeline />
    <section class="page-section page-shell">
      <SectionHeading
        eyebrow="Результат"
        title="До / После"
        subtitle="Когда появятся реальные фотографии работ, сравнение можно будет посмотреть в этом блоке."
      />
      <div class="q-mt-lg">
        <BeforeAfterSlider />
      </div>
    </section>
    <EquipmentTeaser />
    <WhyUs />
    <PricesTeaser />
    <ReviewsSection />
    <div class="page-shell q-pb-xl">
      <ContactCTA />
    </div>
    <section class="page-section page-shell">
      <SectionHeading
        eyebrow="Адрес"
        title="Как нас найти"
        :subtitle="site.address"
      />
      <div class="q-mt-lg">
        <MapEmbed />
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import ContactCTA from "@/components/common/ContactCTA.vue";
import MapEmbed from "@/components/common/MapEmbed.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import DirectionsSection from "@/components/home/DirectionsSection.vue";
import EquipmentTeaser from "@/components/home/EquipmentTeaser.vue";
import EstimateTeaser from "@/components/home/EstimateTeaser.vue";
import FeatureTeaser from "@/components/home/FeatureTeaser.vue";
import HomeHero from "@/components/home/HomeHero.vue";
import PopularServices from "@/components/home/PopularServices.vue";
import PricesTeaser from "@/components/home/PricesTeaser.vue";
import RepairTimeline from "@/components/home/RepairTimeline.vue";
import ReviewsSection from "@/components/home/ReviewsSection.vue";
import TrustStrip from "@/components/home/TrustStrip.vue";
import WhyUs from "@/components/home/WhyUs.vue";
import BeforeAfterSlider from "@/components/works/BeforeAfterSlider.vue";
import { useSeo } from "@/composables/useSeo";
import { useSiteStore } from "@/stores/site";

const site = useSiteStore().config;
useSeo();
</script>
