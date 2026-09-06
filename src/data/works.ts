import type { WorkFilter, WorkProject } from "@/types/work";

export const workFilters: WorkFilter[] = [
  { category: "all", label: "Все" },
  { category: "repair", label: "Ремонт" },
  { category: "frame", label: "Кузовной ремонт" },
  { category: "painting", label: "Покраска" },
  { category: "polishing", label: "Полировка" }
];

export const workCategoryLabels: Record<string, string> = {
  sto: "Обслуживание",
  repair: "Ремонт",
  frame: "Кузовной ремонт",
  painting: "Покраска",
  polishing: "Полировка",
  body: "Кузовной ремонт",
  accident: "Кузовной ремонт",
  commercial: "Коммерческий транспорт"
};

export const workCategoryOptions = workFilters.filter(
  item => item.category !== "all"
);

export const works: WorkProject[] = [];
