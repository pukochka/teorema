import type { WorkFilter, WorkProject } from "@/types/work";

export const workFilters: WorkFilter[] = [
  { category: "all", label: "Все" },
  { category: "body", label: "Кузовной ремонт" },
  { category: "painting", label: "Покраска" },
  { category: "frame", label: "Стапель" },
  { category: "accident", label: "После ДТП" },
  { category: "commercial", label: "Коммерческий транспорт" }
];

export const workCategoryOptions = workFilters.filter(
  item => item.category !== "all"
);

export const works: WorkProject[] = [];
