import type { NavItem } from "@/types/navigation";

export const headerServices: NavItem[] = [
  { label: "Автосервис", to: "/auto-service", icon: "mdi-wrench" },
  { label: "Кузовной ремонт", to: "/body-repair", icon: "mdi-car-wrench" },
  { label: "Покраска", to: "/painting", icon: "mdi-format-paint" },
  { label: "Стапель", to: "/frame-repair", icon: "mdi-ruler-square" },
  { label: "Грузовики", to: "/commercial-vehicles", icon: "mdi-truck" }
];

export const headerNav: NavItem[] = [
  { label: "Наши работы", to: "/works", icon: "mdi-image-multiple" },
  { label: "Цены", to: "/prices", icon: "mdi-cash-multiple" },
  { label: "Контакты", to: "/contacts", icon: "mdi-map-marker" }
];

export const footerServices: NavItem[] = [
  { label: "Автосервис", to: "/auto-service" },
  { label: "Кузовной ремонт", to: "/body-repair" },
  { label: "Покраска", to: "/painting" },
  { label: "Стапель", to: "/frame-repair" },
  { label: "Коммерческий транспорт", to: "/commercial-vehicles" }
];

export const footerClients: NavItem[] = [
  { label: "Онлайн-запись", to: "/booking" },
  { label: "Оценка по фото", to: "/estimate" },
  { label: "Наши работы", to: "/works" },
  { label: "Цены", to: "/prices" },
  { label: "Контакты", to: "/contacts" }
];

export const drawerNav: NavItem[] = [
  { label: "Главная", to: "/", icon: "mdi-home" },
  ...headerServices,
  { label: "Автопарки", to: "/fleet", icon: "mdi-office-building" },
  { label: "Оборудование", to: "/equipment", icon: "mdi-robot-industrial" },
  ...headerNav,
  { label: "О нас", to: "/about", icon: "mdi-information" }
];
