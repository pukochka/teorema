import type { EquipmentItem } from "@/types/equipment";

export const equipmentItems: EquipmentItem[] = [
  {
    id: "paint-booth",
    title: "Покрасочная камера",
    description:
      "Красим кузов и отдельные детали в покрасочной камере: подготовка, нанесение покрытия и сушка.",
    icon: "mdi-format-paint",
    image: "/images/equipment/paint-booth.jpg",
    imageAlt: "Покрасочная камера Teorema Service",
    shotHint: "Камера целиком, авто или деталь внутри, без сильных бликов"
  },
  {
    id: "frame",
    title: "Стапель",
    description:
      "Стапель нужен, чтобы вернуть кузову геометрию: зафиксировать автомобиль и восстановить правильную форму и положение основных элементов.",
    icon: "mdi-ruler-square",
    image: "/images/equipment/frame.jpg",
    imageAlt: "Стапель для восстановления геометрии кузова",
    shotHint: "Стапель с зафиксированным авто, свет сверху"
  },
  {
    id: "tires",
    title: "Шиномонтаж",
    description:
      "Сезонная смена шин, монтаж, демонтаж и балансировка колёс на шиномонтажном оборудовании сервиса.",
    icon: "mdi-tire",
    image: "/images/equipment/tires.jpg",
    imageAlt: "Шиномонтажное оборудование",
    shotHint: "Станок и колесо крупно, чистый пол"
  }
];

export const featuredEquipmentIds = ["paint-booth", "frame", "tires"] as const;
