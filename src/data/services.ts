import type {
  CoreService,
  DirectionCard,
  PriceCategory,
  Service,
  TimelineStep,
  TrustItem
} from "@/types/service";

export const coreServices: CoreService[] = [
  {
    id: "auto-service",
    title: "СТО",
    description: "Техническое обслуживание и диагностика автомобиля.",
    pageTitle: "СТО",
    pageSubtitle:
      "Диагностика, плановое обслуживание и текущий ремонт в одном сервисе.",
    icon: "mdi-wrench",
    route: "/auto-service",
    cta: "Записаться на СТО",
    seoTitle: "СТО в Минске — Teorema Service",
    seoDescription:
      "СТО Teorema Service в Минске: техническое обслуживание и диагностика автомобилей. ул. Солтыса, 108.",
    estimatePreferred: false
  },
  {
    id: "repair",
    title: "Ремонт любой сложности",
    description:
      "Механический и кузовной ремонт без ограничения по объёму работ.",
    pageTitle: "Ремонт любой сложности",
    pageSubtitle:
      "Берёмся за ремонт, когда нужен не только регламент, а восстановление автомобиля.",
    icon: "mdi-car-wrench",
    route: "/repair",
    cta: "Записаться на ремонт",
    seoTitle: "Ремонт любой сложности — Teorema Service",
    seoDescription:
      "Ремонт автомобилей любой сложности в Teorema Service: механика и кузовные работы в Минске.",
    estimatePreferred: true
  },
  {
    id: "frame-repair",
    title: "Стапель",
    description: "Восстановление геометрии кузова на стапеле.",
    pageTitle: "Стапель",
    pageSubtitle:
      "Если после удара нарушена геометрия, автомобиль фиксируют на стапеле и возвращают контрольные точки.",
    icon: "mdi-ruler-square",
    route: "/frame-repair",
    cta: "Оценить стапельные работы",
    seoTitle: "Стапельные работы — Teorema Service",
    seoDescription:
      "Стапель в Teorema Service: измерение, фиксация и восстановление геометрии кузова после ДТП.",
    estimatePreferred: true
  },
  {
    id: "painting",
    title: "Покрасочная камера",
    description: "Окраска автомобиля в профессиональной покрасочной камере.",
    pageTitle: "Покрасочная камера",
    pageSubtitle:
      "Подготовка, нанесение покрытия и сушка в контролируемых условиях.",
    icon: "mdi-format-paint",
    route: "/painting",
    cta: "Записаться на покраску",
    seoTitle: "Покрасочная камера — Teorema Service",
    seoDescription:
      "Покраска автомобилей в покрасочной камере Teorema Service в Минске.",
    estimatePreferred: true
  },
  {
    id: "polishing",
    title: "Полировка",
    description: "Полировка кузова и восстановление лакокрасочного покрытия.",
    pageTitle: "Полировка",
    pageSubtitle: "Восстанавливаем блеск ЛКП и убираем следы эксплуатации.",
    icon: "mdi-car-wash",
    route: "/polishing",
    cta: "Записаться на полировку",
    seoTitle: "Полировка автомобиля — Teorema Service",
    seoDescription:
      "Полировка кузова в Teorema Service в Минске: восстановление лакокрасочного покрытия.",
    estimatePreferred: true
  }
];

export function getCoreService(
  id: string | undefined
): CoreService | undefined {
  return coreServices.find(item => item.id === id);
}

export function coreServiceLabel(idOrTitle: string): string {
  const found = coreServices.find(
    item => item.id === idOrTitle || item.title === idOrTitle
  );
  return found?.title || idOrTitle;
}

export const directions: DirectionCard[] = coreServices.map(service => ({
  id: service.id,
  title: service.title,
  description: service.description,
  icon: service.icon,
  route: service.route,
  cta: service.cta
}));

export const popularServices: Service[] = coreServices;

export const whyUsItems: TrustItem[] = [
  {
    id: "sto-repair",
    title: "СТО и ремонт любой сложности",
    description: "Обслуживание и ремонт без длинного списка отдельных услуг.",
    icon: "mdi-wrench"
  },
  {
    id: "booth-frame",
    title: "Стапель и покрасочная камера",
    description: "Геометрия кузова и окраска в контролируемых условиях.",
    icon: "mdi-format-paint"
  },
  {
    id: "simple-request",
    title: "Простое обращение",
    description: "Имя, телефон и суть работ — остальное уточним по звонку.",
    icon: "mdi-phone"
  }
];

export const trustItems: TrustItem[] = whyUsItems;

export const priceCategories: PriceCategory[] = coreServices.map(service => ({
  id: service.id,
  title: service.title,
  icon: service.icon,
  note: service.estimatePreferred
    ? "Отправьте фотографии автомобиля для предварительной оценки."
    : "Стоимость определяется после осмотра.",
  items: [],
  estimatePreferred: service.estimatePreferred
}));

export const serviceFormOptions = coreServices.map(service => ({
  label: service.title,
  value: service.id
}));

export const bookingServiceOptions = coreServices.map(service => service.title);

export const fleetServiceOptions = [
  "СТО",
  "Ремонт любой сложности",
  "Стапель",
  "Покрасочная камера",
  "Полировка"
];

export const bodyRepairStages: TimelineStep[] = [
  {
    id: "01",
    title: "Обращение",
    description: "Оставляете контакты или присылаете фото."
  },
  {
    id: "02",
    title: "Осмотр",
    description: "Уточняем объём работ и согласовываем ремонт."
  },
  {
    id: "03",
    title: "Выполнение",
    description: "Делаем работы и отдаём автомобиль."
  }
];
