import type { EquipmentItem } from "@/types/equipment";

export const equipmentItems: EquipmentItem[] = [
  {
    id: "paint-booth",
    title: "Покрасочная камера",
    description:
      "Окраска выполняется в профессиональной покрасочной камере: подготовка, нанесение и сушка в контролируемых условиях.",
    icon: "mdi-format-paint",
    image: "/images/equipment/paint-booth.jpg",
    imageAlt: "Покрасочная камера Teorema Service"
  },
  {
    id: "frame",
    title: "Стапель",
    description:
      "Стапель нужен, чтобы вернуть кузову геометрию после удара: зафиксировать автомобиль, вытянуть силовые элементы и проверить контрольные точки.",
    icon: "mdi-ruler-square",
    image: "/images/equipment/frame.jpg",
    imageAlt: "Стапель для восстановления геометрии кузова"
  },
  {
    id: "lifts",
    title: "Подъёмники",
    description:
      "Подъёмники позволяют безопасно обслуживать ходовую, тормоза и днище легковых и коммерческих автомобилей.",
    icon: "mdi-car-lifted-pickup",
    image: "/images/equipment/lifts.jpg",
    imageAlt: "Подъёмники в автосервисе Teorema Service"
  },
  {
    id: "diagnostics",
    title: "Диагностическое оборудование",
    description:
      "Диагностика помогает найти неисправность до начала ремонта и точнее определить объём работ.",
    icon: "mdi-car-search",
    image: "/images/equipment/diagnostics.jpg",
    imageAlt: "Диагностическое оборудование автосервиса"
  },
  {
    id: "tires",
    title: "Шиномонтажное оборудование",
    description:
      "Монтаж, демонтаж и балансировка колёс на шиномонтажном оборудовании сервиса.",
    icon: "mdi-tire",
    image: "/images/equipment/tires.jpg",
    imageAlt: "Шиномонтажное оборудование"
  }
];
