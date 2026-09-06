import type { WorkFilter, WorkProject } from "@/types/work";

export const workFilters: WorkFilter[] = [
  { category: "all", label: "Все" },
  { category: "sto", label: "СТО" },
  { category: "repair", label: "Ремонт любой сложности" },
  { category: "frame", label: "Стапель" },
  { category: "painting", label: "Покрасочная камера" },
  { category: "polishing", label: "Полировка" }
];

export const workCategoryLabels: Record<string, string> = {
  sto: "СТО",
  repair: "Ремонт любой сложности",
  frame: "Стапель",
  painting: "Покрасочная камера",
  polishing: "Полировка",
  body: "Ремонт любой сложности",
  accident: "Ремонт любой сложности",
  commercial: "Коммерческий транспорт"
};

export const workCategoryOptions = workFilters.filter(
  item => item.category !== "all"
);

export const works: WorkProject[] = [];
