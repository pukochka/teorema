import type {
  CoreService,
  DirectionCard,
  PriceCategory,
  Service,
  TimelineStep,
  TrustItem
} from "@/types/service";
import type { ManagedPage, ServiceId } from "@/types/page";
import { defaultManagedPages } from "./pages";

export function pageToCoreService(page: ManagedPage): CoreService | null {
  if (page.type !== "service" || !page.serviceId) return null;
  return {
    id: page.serviceId,
    title: page.name,
    description: page.cardDescription || page.intro,
    pageTitle: page.h1,
    pageSubtitle: page.subtitle,
    icon: page.icon || "mdi-car-wrench",
    route: page.path,
    cta: page.cta || "Записаться",
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    estimatePreferred: Boolean(page.estimatePreferred)
  };
}

export function servicesFromPages(pages: ManagedPage[]): CoreService[] {
  return pages
    .filter(page => page.type === "service" && page.status === "published")
    .map(pageToCoreService)
    .filter((item): item is CoreService => Boolean(item));
}

export const coreServices: CoreService[] = servicesFromPages(
  defaultManagedPages
);

export function getCoreService(
  id: string | undefined,
  services: CoreService[] = coreServices
): CoreService | undefined {
  return services.find(item => item.id === id);
}

const legacyLabels: Record<string, string> = {
  "auto-service": "Ремонт автомобилей",
  СТО: "Техническое обслуживание",
  "frame-repair": "Кузовной ремонт"
};

export function coreServiceLabel(
  idOrTitle: string,
  services: CoreService[] = coreServices
): string {
  if (legacyLabels[idOrTitle]) return legacyLabels[idOrTitle];
  const found = services.find(
    item => item.id === idOrTitle || item.title === idOrTitle
  );
  return found?.title || idOrTitle;
}

export function homeCardsFromPages(pages: ManagedPage[]): DirectionCard[] {
  return pages
    .filter(
      page =>
        page.type === "service" &&
        page.status === "published" &&
        page.showOnHome
    )
    .map(page => ({
      id: page.id,
      title: page.cardTitle || page.name,
      description: page.cardDescription || page.intro,
      icon: page.icon || "mdi-car-wrench",
      route: page.path,
      cta: page.cta || "Подробнее"
    }));
}

export const directions: DirectionCard[] = homeCardsFromPages(
  defaultManagedPages
);

export const popularServices: Service[] = coreServices;

export const whyUsItems: TrustItem[] = [
  {
    id: "cars-lcv",
    title: "Легковые и лёгкий коммерческий транспорт",
    description:
      "Обслуживаем легковые автомобили и небольшие грузовики. Возможность работ уточняем по автомобилю.",
    icon: "mdi-car-estate"
  },
  {
    id: "one-shop",
    title: "Ремонт, кузов и покраска в одном месте",
    description: "Стапель, покрасочная камера, шиномонтаж и полировка — здесь же.",
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

export function priceCategoriesFromServices(
  services: CoreService[]
): PriceCategory[] {
  return services.map(service => ({
    id: service.id,
    title: service.title,
    icon: service.icon,
    note: service.estimatePreferred
      ? "Отправьте фотографии автомобиля для предварительной оценки."
      : "Стоимость определяется после осмотра.",
    items: [],
    estimatePreferred: service.estimatePreferred
  }));
}

export const priceCategories: PriceCategory[] =
  priceCategoriesFromServices(coreServices);

export function serviceFormOptionsFromServices(services: CoreService[]) {
  return services.map(service => ({
    label: service.title,
    value: service.id
  }));
}

export const serviceFormOptions = serviceFormOptionsFromServices(coreServices);

export const bookingServiceOptions = coreServices.map(service => service.title);

export const fleetServiceOptions = coreServices.map(service => service.title);

export const requestSteps: TimelineStep[] = [
  {
    id: "01",
    title: "Обращение",
    description: "Звоните, оставляете заявку или присылаете фото."
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

export const bodyRepairStages: TimelineStep[] = requestSteps;

export const serviceOrder: ServiceId[] = [
  "maintenance",
  "repair",
  "body-repair",
  "painting",
  "tires",
  "ac",
  "polishing"
];
