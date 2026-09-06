import type { NavItem } from "@/types/navigation";
import { coreServices } from "./services";

export const headerServices: NavItem[] = coreServices.map(service => ({
  label: service.title,
  to: service.route,
  icon: service.icon
}));

export const headerNav: NavItem[] = [
  { label: "Наши работы", to: "/works", icon: "mdi-image-multiple" },
  { label: "Цены", to: "/prices", icon: "mdi-cash-multiple" },
  { label: "Контакты", to: "/contacts", icon: "mdi-map-marker" }
];

export const footerServices: NavItem[] = headerServices.map(item => ({
  label: item.label,
  to: item.to
}));

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
  ...headerNav,
  { label: "О нас", to: "/about", icon: "mdi-information" }
];
