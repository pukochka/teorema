import type {
  DirectionCard,
  PriceCategory,
  Service,
  ServiceCategory,
  TimelineStep,
  TrustItem
} from "@/types/service";

export const trustItems: TrustItem[] = [
  {
    id: "full-cycle",
    title: "Полный цикл ремонта",
    description: "От диагностики до покраски.",
    icon: "mdi-infinity"
  },
  {
    id: "body-shop",
    title: "Собственный кузовной цех",
    description: "Кузовные работы в рамках одного сервиса.",
    icon: "mdi-toolbox"
  },
  {
    id: "commercial",
    title: "Коммерческий транспорт",
    description: "Микроавтобусы, фургоны и небольшие грузовики.",
    icon: "mdi-truck"
  },
  {
    id: "estimate",
    title: "Оценка по фото",
    description: "Начните обращение без предварительного визита.",
    icon: "mdi-camera"
  }
];

export const directions: DirectionCard[] = [
  {
    id: "auto-service",
    title: "Автосервис",
    description:
      "Диагностика, плановое ТО и ремонт легковых автомобилей и коммерческого транспорта.",
    icon: "mdi-wrench",
    route: "/auto-service",
    items: [
      "диагностика",
      "ТО",
      "двигатель",
      "ходовая",
      "тормоза",
      "электрика",
      "шиномонтаж"
    ],
    cta: "Все услуги автосервиса"
  },
  {
    id: "body-repair",
    title: "Кузовной ремонт",
    description:
      "Восстановление кузова после ДТП: стапель, рихтовка, сварка и замена элементов.",
    icon: "mdi-car-wrench",
    route: "/body-repair",
    items: [
      "стапель",
      "рихтовка",
      "сварочные работы",
      "восстановление геометрии",
      "замена кузовных элементов",
      "ремонт после ДТП"
    ],
    cta: "Кузовной ремонт"
  },
  {
    id: "painting",
    title: "Покраска",
    description:
      "Локальная и полная окраска в профессиональной покрасочной камере.",
    icon: "mdi-format-paint",
    route: "/painting",
    items: [
      "подбор цвета",
      "подготовка",
      "локальная покраска",
      "покраска элементов",
      "полная покраска",
      "полировка"
    ],
    cta: "Покраска автомобилей"
  }
];

export const popularServices: Service[] = [
  {
    id: "maintenance",
    title: "Техническое обслуживание",
    description: "Плановое ТО, масло, фильтры и расходные материалы.",
    icon: "mdi-oil",
    route: "/auto-service",
    cta: "Записаться на ТО"
  },
  {
    id: "diagnostics",
    title: "Диагностика",
    description: "Компьютерная и механическая проверка систем автомобиля.",
    icon: "mdi-car-search",
    route: "/auto-service",
    cta: "Записаться на диагностику"
  },
  {
    id: "suspension",
    title: "Ходовая",
    description: "Диагностика и ремонт подвески, рычагов и амортизаторов.",
    icon: "mdi-car-cog",
    route: "/auto-service",
    cta: "Записаться по ходовой"
  },
  {
    id: "brakes",
    title: "Тормозная система",
    description: "Колодки, диски, суппорты и тормозная жидкость.",
    icon: "mdi-car-brake-abs",
    route: "/auto-service",
    cta: "Записаться по тормозам"
  },
  {
    id: "engine",
    title: "Ремонт двигателя",
    description: "Диагностика, обслуживание и ремонт силового агрегата.",
    icon: "mdi-engine",
    route: "/auto-service",
    cta: "Записаться по двигателю"
  },
  {
    id: "electrics",
    title: "Электрика",
    description: "Поиск неисправностей, датчики и электрооборудование.",
    icon: "mdi-lightning-bolt",
    route: "/auto-service",
    cta: "Записаться по электрике"
  },
  {
    id: "tires",
    title: "Шиномонтаж",
    description: "Монтаж, демонтаж и балансировка колёс.",
    icon: "mdi-tire",
    route: "/auto-service",
    cta: "Записаться на шиномонтаж"
  },
  {
    id: "body",
    title: "Кузовной ремонт",
    description: "Рихтовка, сварка, замена элементов и ремонт после ДТП.",
    icon: "mdi-car-wrench",
    route: "/body-repair",
    cta: "Оценить кузовной ремонт"
  },
  {
    id: "paint",
    title: "Покраска",
    description: "Подготовка, локальная и полная окраска в камере.",
    icon: "mdi-format-paint",
    route: "/painting",
    cta: "Записаться на покраску"
  },
  {
    id: "frame",
    title: "Стапель",
    description: "Восстановление геометрии кузова на стапеле.",
    icon: "mdi-ruler-square",
    route: "/frame-repair",
    cta: "Оценить стапельные работы"
  },
  {
    id: "accident",
    title: "Ремонт после ДТП",
    description: "Полный цикл восстановления автомобиля после аварии.",
    icon: "mdi-car-wrench",
    route: "/body-repair",
    cta: "Отправить фото повреждения"
  },
  {
    id: "commercial",
    title: "Коммерческий транспорт",
    description: "Обслуживание микроавтобусов, фургонов и малых грузовиков.",
    icon: "mdi-truck",
    route: "/commercial-vehicles",
    cta: "Записать коммерческий автомобиль"
  }
];

export const autoServiceCategories: ServiceCategory[] = [
  {
    id: "maintenance",
    title: "Техническое обслуживание",
    icon: "mdi-oil",
    description: "Плановые работы, которые сохраняют ресурс автомобиля.",
    items: ["масло", "фильтры", "расходные материалы", "плановое ТО"]
  },
  {
    id: "suspension",
    title: "Ходовая часть",
    icon: "mdi-car-cog",
    description: "Диагностика и ремонт подвески легковых и коммерческих авто.",
    items: [
      "диагностика",
      "амортизаторы",
      "рычаги",
      "сайлентблоки",
      "ступицы",
      "подшипники"
    ]
  },
  {
    id: "brakes",
    title: "Тормозная система",
    icon: "mdi-car-brake-abs",
    description: "Обслуживание тормозных механизмов и жидкости.",
    items: ["колодки", "диски", "суппорты", "тормозная жидкость"]
  },
  {
    id: "engine",
    title: "Двигатель",
    icon: "mdi-engine",
    description: "Проверка и ремонт силового агрегата.",
    items: ["диагностика", "обслуживание", "ремонт"]
  },
  {
    id: "electrics",
    title: "Электрика",
    icon: "mdi-lightning-bolt",
    description: "Поиск неисправностей электрооборудования.",
    items: ["диагностика", "датчики", "поиск неисправностей"]
  },
  {
    id: "tires",
    title: "Шиномонтаж",
    icon: "mdi-tire",
    description: "Сезонная замена и обслуживание колёс.",
    items: ["монтаж", "демонтаж", "балансировка"]
  }
];

export const bodyRepairStages: TimelineStep[] = [
  {
    id: "01",
    title: "Приём автомобиля",
    description: "Осматриваем повреждения и фиксируем состояние автомобиля."
  },
  {
    id: "02",
    title: "Дефектовка",
    description: "Определяем скрытые и видимые повреждения кузова."
  },
  {
    id: "03",
    title: "Согласование",
    description: "Согласовываем объём работ и дальнейшие шаги."
  },
  {
    id: "04",
    title: "Кузовной ремонт",
    description: "Рихтуем, варим и восстанавливаем повреждённые элементы."
  },
  {
    id: "05",
    title: "Стапель при необходимости",
    description: "Восстанавливаем геометрию кузова, если она нарушена."
  },
  {
    id: "06",
    title: "Подготовка",
    description: "Готовим поверхности к окраске: шпаклёвка, грунт, маскировка."
  },
  {
    id: "07",
    title: "Покраска",
    description: "Окрашиваем элементы в покрасочной камере."
  },
  {
    id: "08",
    title: "Сборка",
    description: "Возвращаем на место детали и проверяем посадки."
  },
  {
    id: "09",
    title: "Контроль результата",
    description: "Проверяем геометрию, зазоры, цвет и качество сборки."
  },
  {
    id: "10",
    title: "Выдача",
    description: "Передаём автомобиль после завершения работ."
  }
];

export const frameRepairStages: TimelineStep[] = [
  {
    id: "1",
    title: "Осмотр",
    description: "Оцениваем характер повреждения и решаем, нужен ли стапель."
  },
  {
    id: "2",
    title: "Измерение",
    description:
      "Снимаем контрольные точки и сравниваем их с геометрией кузова."
  },
  {
    id: "3",
    title: "Фиксация автомобиля",
    description: "Надёжно закрепляем машину на стапеле."
  },
  {
    id: "4",
    title: "Вытяжка",
    description: "Возвращаем силовые элементы в расчётные положения."
  },
  {
    id: "5",
    title: "Контроль геометрии",
    description: "Повторно измеряем кузов и проверяем результат вытяжки."
  },
  {
    id: "6",
    title: "Кузовной ремонт",
    description: "Переходим к рихтовке, сварке и замене элементов."
  },
  {
    id: "7",
    title: "Подготовка",
    description: "Готовим восстановленные поверхности к окраске."
  },
  {
    id: "8",
    title: "Покраска",
    description: "Окрашиваем отремонтированные зоны в камере."
  }
];

export const paintingServices: string[] = [
  "подбор цвета",
  "подготовка",
  "грунтование",
  "локальная окраска",
  "окраска детали",
  "окраска нескольких элементов",
  "полная покраска",
  "лак",
  "сушка",
  "полировка"
];

export const bodyRepairSections: ServiceCategory[] = [
  {
    id: "inspection",
    title: "Дефектовка",
    icon: "mdi-magnify",
    description: "Фиксируем видимые и скрытые повреждения.",
    items: ["осмотр кузова", "оценка скрытых дефектов", "согласование работ"]
  },
  {
    id: "straightening",
    title: "Рихтовка",
    icon: "mdi-hammer-wrench",
    description: "Восстанавливаем форму повреждённых панелей.",
    items: ["рихтовка", "восстановление плоскостей"]
  },
  {
    id: "frame",
    title: "Стапель",
    icon: "mdi-ruler-square",
    description: "Выправляем геометрию на стапеле.",
    items: ["фиксация", "вытяжка", "контроль точек"]
  },
  {
    id: "geometry",
    title: "Восстановление геометрии",
    icon: "mdi-set-square",
    description: "Возвращаем кузов к расчётным параметрам.",
    items: ["измерение", "коррекция", "повторный контроль"]
  },
  {
    id: "welding",
    title: "Сварочные работы",
    icon: "mdi-fire",
    description: "Соединяем и восстанавливаем силовые элементы.",
    items: ["сварка", "замена вставок"]
  },
  {
    id: "replacement",
    title: "Замена элементов",
    icon: "mdi-swap-horizontal",
    description: "Меняем панели, которые нецелесообразно восстанавливать.",
    items: ["крылья", "двери", "бамперы", "пороги"]
  },
  {
    id: "prep",
    title: "Подготовка",
    icon: "mdi-brush",
    description: "Готовим кузов к окраске.",
    items: ["шпаклёвка", "шлифовка", "грунт"]
  },
  {
    id: "paint",
    title: "Покраска",
    icon: "mdi-format-paint",
    description: "Окрашиваем элементы в покрасочной камере.",
    items: ["локальная окраска", "окраска деталей", "лак"]
  },
  {
    id: "assembly",
    title: "Сборка",
    icon: "mdi-hammer-screwdriver",
    description: "Собираем автомобиль после ремонта.",
    items: ["установка деталей", "регулировка зазоров"]
  },
  {
    id: "check",
    title: "Проверка результата",
    icon: "mdi-check-decagram",
    description: "Контролируем качество перед выдачей.",
    items: ["геометрия", "цвет", "сборка"]
  }
];

export const whyUsItems: TrustItem[] = [
  {
    id: "complex",
    title: "Комплексный ремонт",
    description: "Механический и кузовной ремонт в одном месте.",
    icon: "mdi-hub"
  },
  {
    id: "booth",
    title: "Покрасочная камера",
    description: "Профессиональная подготовка и окраска.",
    icon: "mdi-format-paint"
  },
  {
    id: "frame",
    title: "Стапель",
    description: "Восстановление геометрии автомобиля.",
    icon: "mdi-ruler-square"
  },
  {
    id: "commercial",
    title: "Коммерческий транспорт",
    description: "Обслуживание микроавтобусов и небольших грузовиков.",
    icon: "mdi-truck"
  },
  {
    id: "remote",
    title: "Оценка по фото",
    description: "Начать обращение можно дистанционно.",
    icon: "mdi-camera-plus"
  }
];

export const priceCategories: PriceCategory[] = [
  {
    id: "to",
    title: "ТО",
    icon: "mdi-oil",
    note: "Стоимость определяется после диагностики",
    items: ["плановое ТО", "замена масла", "фильтры", "расходные материалы"]
  },
  {
    id: "diagnostics",
    title: "Диагностика",
    icon: "mdi-car-search",
    note: "Стоимость рассчитывается индивидуально",
    items: [
      "компьютерная диагностика",
      "диагностика ходовой",
      "диагностика двигателя"
    ]
  },
  {
    id: "suspension",
    title: "Ходовая",
    icon: "mdi-car-cog",
    note: "Стоимость определяется после диагностики",
    items: ["амортизаторы", "рычаги", "сайлентблоки", "ступицы"]
  },
  {
    id: "brakes",
    title: "Тормоза",
    icon: "mdi-car-brake-abs",
    note: "Стоимость определяется после диагностики",
    items: ["колодки", "диски", "суппорты", "тормозная жидкость"]
  },
  {
    id: "tires",
    title: "Шиномонтаж",
    icon: "mdi-tire",
    note: "Стоимость рассчитывается индивидуально",
    items: ["монтаж", "демонтаж", "балансировка"]
  },
  {
    id: "body",
    title: "Кузов",
    icon: "mdi-car-wrench",
    note: "Отправьте фотографии автомобиля для предварительной оценки.",
    items: ["рихтовка", "сварка", "замена элементов", "ремонт после ДТП"]
  },
  {
    id: "painting",
    title: "Покраска",
    icon: "mdi-format-paint",
    note: "Отправьте фотографии автомобиля для предварительной оценки.",
    items: [
      "локальная окраска",
      "окраска элемента",
      "полная покраска",
      "полировка"
    ]
  },
  {
    id: "frame",
    title: "Стапель",
    icon: "mdi-ruler-square",
    note: "Отправьте фотографии автомобиля для предварительной оценки.",
    items: [
      "измерение геометрии",
      "вытяжка",
      "восстановление силовых элементов"
    ]
  }
];

export const bookingServiceOptions = [
  "Диагностика",
  "Техническое обслуживание",
  "Ходовая часть",
  "Тормозная система",
  "Двигатель",
  "Электрика",
  "Шиномонтаж",
  "Кузовной ремонт",
  "Покраска",
  "Стапельные работы",
  "Ремонт после ДТП",
  "Коммерческий транспорт",
  "Другое"
];

export const fleetServiceOptions = [
  "Техническое обслуживание",
  "Диагностика",
  "Механический ремонт",
  "Кузовной ремонт",
  "Покраска",
  "Обслуживание коммерческих автомобилей"
];
