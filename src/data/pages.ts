import { CONTENT_UPDATED_AT_ISO } from "@/seo/manifest";
import type { ContentBlock, FaqItem, ManagedPage } from "@/types/page";

function block(id: string, title: string, text: string): ContentBlock {
  return { id, title, text };
}

function faq(id: string, question: string, answer: string): FaqItem {
  return { id, question, answer };
}

const stamp = CONTENT_UPDATED_AT_ISO;

export const defaultManagedPages: ManagedPage[] = [
  {
    id: "home",
    type: "home",
    name: "Главная",
    slug: "",
    path: "/",
    seoTitle: "Автосервис в Минске — ремонт и обслуживание | Teorema Service",
    seoDescription:
      "Teorema Service в Минске: обслуживание и ремонт легковых автомобилей и лёгкого коммерческого транспорта. Кузовной ремонт на стапеле, покраска в камере, шиномонтаж, заправка кондиционеров и полировка. ул. Солтыса, 108.",
    h1: "Обслуживание и ремонт легковых автомобилей и лёгкого коммерческого транспорта",
    subtitle:
      "От планового обслуживания до ремонта любой сложности. Кузовной ремонт на стапеле, покраска в камере, шиномонтаж, заправка кондиционеров и полировка кузова — в одном автосервисе",
    intro:
      "Принимаем легковые автомобили и лёгкий коммерческий транспорт, включая небольшие грузовики. Стоимость и возможность работ уточняем по телефону, заявке или фотографиям.",
    blocks: [],
    faq: [
      faq(
        "home-trucks",
        "Обслуживаете ли небольшие грузовики?",
        "Да. Работаем с легковыми автомобилями и лёгким коммерческим транспортом, включая небольшие грузовики. Возможность ремонта конкретного автомобиля лучше уточнить по телефону или в заявке."
      ),
      faq(
        "home-body",
        "Какие кузовные работы доступны?",
        "Восстанавливаем кузов после повреждений. Есть стапель: на нём возвращают геометрию кузова — правильную форму и положение основных элементов."
      ),
      faq(
        "home-paint",
        "Есть ли покрасочная камера?",
        "Да. Красим кузов и отдельные детали в покрасочной камере."
      ),
      faq(
        "home-ac",
        "Можно ли заправить кондиционер?",
        "Да, заправляем систему кондиционирования автомобиля. Другие работы с кондиционером уточняйте при обращении."
      ),
      faq(
        "home-price",
        "Как уточнить возможность ремонта и стоимость?",
        "Позвоните, оставьте заявку на запись или отправьте фотографии через форму оценки. Стоимость зависит от автомобиля и объёма работ — её сообщим после осмотра или по фото."
      )
    ],
    image: "",
    imageAlt: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp
  },
  {
    id: "maintenance",
    type: "service",
    name: "Техническое обслуживание",
    slug: "tehnicheskoe-obsluzhivanie",
    path: "/uslugi/tehnicheskoe-obsluzhivanie",
    seoTitle: "Техническое обслуживание автомобилей в Минске — Teorema Service",
    seoDescription:
      "Плановое обслуживание легковых автомобилей и лёгкого коммерческого транспорта в Teorema Service. Запись по телефону или через форму на сайте.",
    h1: "Техническое обслуживание автомобилей",
    subtitle:
      "Плановое обслуживание легковых автомобилей и лёгкого коммерческого транспорта.",
    intro:
      "Плановое обслуживание помогает вовремя заменить расходники и заметить неисправность до того, как она остановит автомобиль. Принимаем легковые машины и лёгкий коммерческий транспорт, включая небольшие грузовики.",
    blocks: [
      block(
        "what",
        "Что входит в обращение",
        "Приезжаете или оставляете заявку, описываете, что нужно сделать, и мы уточняем объём работ по автомобилю. Список операций зависит от пробега, состояния и того, что вы хотите проверить."
      ),
      block(
        "how",
        "Как записаться",
        "Позвоните, оставьте заявку на сайте или отправьте фото, если нужно заранее понять объём. Время визита подтверждаем по телефону."
      )
    ],
    faq: [
      faq(
        "maintenance-lcv",
        "Делаете ли плановое обслуживание небольших грузовиков?",
        "Да, обслуживаем лёгкий коммерческий транспорт, включая небольшие грузовики. Возможность работ по конкретному автомобилю уточните при записи."
      ),
      faq(
        "maintenance-price",
        "Сколько стоит техническое обслуживание?",
        "Стоимость зависит от автомобиля и перечня работ. Назовём её после осмотра или по заявке."
      )
    ],
    image: "",
    imageAlt: "Техническое обслуживание в Teorema Service",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp,
    serviceId: "maintenance",
    icon: "mdi-car-cog",
    cta: "Записаться на обслуживание",
    estimatePreferred: false,
    relatedIds: ["repair", "tires", "ac"],
    cardTitle: "Техническое обслуживание и ремонт",
    cardDescription:
      "Плановое обслуживание и ремонт легковых автомобилей и лёгкого коммерческого транспорта. Поможем с текущими неисправностями и сложными ремонтными работами.",
    showOnHome: true
  },
  {
    id: "repair",
    type: "service",
    name: "Ремонт автомобилей",
    slug: "remont-avtomobiley",
    path: "/uslugi/remont-avtomobiley",
    seoTitle: "Ремонт автомобилей в Минске — Teorema Service",
    seoDescription:
      "Ремонт легковых автомобилей и лёгкого коммерческого транспорта в Teorema Service: от текущих неисправностей до работ любой сложности.",
    h1: "Ремонт легковых автомобилей и лёгкого коммерческого транспорта",
    subtitle:
      "Текущие неисправности и ремонт любой сложности — без разделения на витрину отдельных цехов.",
    intro:
      "Ремонтируем легковые автомобили и лёгкий коммерческий транспорт. Берёмся за текущие неисправности и за работы, где нужен больший объём: осмотр, согласование и выполнение в одном сервисе.",
    blocks: [
      block(
        "scope",
        "Какой ремонт делаем",
        "Работаем с неисправностями разной сложности. Конкретный перечень работ зависит от автомобиля и диагностики на месте. Не публикуем список того, чего не подтверждаем оборудованием или практикой сервиса."
      ),
      block(
        "related",
        "Если нужен кузов или покраска",
        "Кузовные повреждения и окраску можно сделать здесь же: есть стапель и покрасочная камера. Для оценки удобно прислать фотографии."
      ),
      block(
        "how",
        "Как уточнить возможность ремонта",
        "Позвоните, оставьте заявку или отправьте фото. Скажем, берёмся ли за работу и что нужно для расчёта стоимости."
      )
    ],
    faq: [
      faq(
        "repair-complex",
        "Берётесь ли за сложный ремонт?",
        "Да, выполняем ремонт любой сложности, если это возможно для конкретного автомобиля. Возможность работ уточняем при обращении."
      ),
      faq(
        "repair-price",
        "Можно ли узнать стоимость заранее?",
        "Предварительно — по фотографиям или описанию. Точную стоимость называем после осмотра."
      )
    ],
    image: "",
    imageAlt: "Ремонт автомобиля в Teorema Service",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp,
    serviceId: "repair",
    icon: "mdi-car-wrench",
    cta: "Записаться на ремонт",
    estimatePreferred: true,
    relatedIds: ["maintenance", "body-repair", "painting"],
    cardTitle: "Ремонт автомобилей",
    cardDescription:
      "Текущие неисправности и ремонт любой сложности для легковых автомобилей и лёгкого коммерческого транспорта.",
    showOnHome: false
  },
  {
    id: "body-repair",
    type: "service",
    name: "Кузовной ремонт",
    slug: "kuzovnoy-remont",
    path: "/uslugi/kuzovnoy-remont",
    seoTitle: "Кузовной ремонт в Минске — стапель | Teorema Service",
    seoDescription:
      "Кузовной ремонт в Teorema Service: восстановление после повреждений и стапельные работы для геометрии кузова.",
    h1: "Кузовной ремонт",
    subtitle:
      "Восстановление кузова после повреждений. Стапельные работы для восстановления геометрии кузова.",
    intro:
      "Восстанавливаем кузов после повреждений. На стапеле возвращают геометрию кузова — его правильную форму и положение основных элементов.",
    blocks: [
      block(
        "stapel",
        "Стапель",
        "Стапель нужен, когда после удара нарушена геометрия. Автомобиль фиксируют, вытягивают силовые элементы и проверяют контрольные точки."
      ),
      block(
        "next",
        "После кузовных работ",
        "Если нужна окраска, её выполняем в покрасочной камере. Объём подготовки и покраски согласовываем отдельно."
      ),
      block(
        "how",
        "Как оценить повреждение",
        "Пришлите фотографии или запишитесь на осмотр. По снимкам можно предварительно понять объём, окончательно — после осмотра автомобиля."
      )
    ],
    faq: [
      faq(
        "body-stapel",
        "Есть ли стапель?",
        "Да. Стапель используем, чтобы восстановить геометрию кузова — правильную форму и положение основных элементов."
      ),
      faq(
        "body-paint",
        "Красите после кузовного ремонта?",
        "Да, покраска кузова и отдельных деталей выполняется в покрасочной камере."
      )
    ],
    image: "",
    imageAlt: "Стапель для кузовного ремонта",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp,
    serviceId: "body-repair",
    icon: "mdi-ruler-square",
    cta: "Оценить кузовной ремонт",
    estimatePreferred: true,
    relatedIds: ["painting", "polishing", "repair"],
    cardTitle: "Кузовной ремонт",
    cardDescription:
      "Восстановление кузова после повреждений. Стапельные работы для восстановления геометрии кузова — его правильной формы и положения основных элементов.",
    showOnHome: true
  },
  {
    id: "painting",
    type: "service",
    name: "Покраска автомобиля",
    slug: "pokraska-avtomobilya",
    path: "/uslugi/pokraska-avtomobilya",
    seoTitle: "Покраска автомобиля в Минске — покрасочная камера | Teorema Service",
    seoDescription:
      "Покраска кузова и отдельных деталей в покрасочной камере Teorema Service в Минске.",
    h1: "Покраска автомобиля",
    subtitle: "Покраска кузова и отдельных деталей в покрасочной камере.",
    intro:
      "Красим кузов и отдельные детали в покрасочной камере. Так окраска проходит в контролируемых условиях: подготовка, нанесение покрытия и сушка.",
    blocks: [
      block(
        "booth",
        "Покрасочная камера",
        "Работы выполняем в покрасочной камере. Это отдельное помещение, где держат нужные условия для нанесения и сушки покрытия."
      ),
      block(
        "scope",
        "Что можно покрасить",
        "Кузов целиком или отдельные детали — в зависимости от повреждения и задачи. Объём согласуем после осмотра или по фото."
      ),
      block(
        "how",
        "Как записаться на покраску",
        "Оставьте заявку, позвоните или пришлите фотографии детали. Подскажем, каких снимков достаточно для предварительной оценки."
      )
    ],
    faq: [
      faq(
        "paint-booth",
        "Есть ли покрасочная камера?",
        "Да. Покраска кузова и отдельных деталей выполняется в покрасочной камере."
      ),
      faq(
        "paint-part",
        "Можно покрасить одну деталь?",
        "Да, красим и отдельные детали. Возможность и объём подготовки уточним по автомобилю."
      )
    ],
    image: "",
    imageAlt: "Покрасочная камера Teorema Service",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp,
    serviceId: "painting",
    icon: "mdi-format-paint",
    cta: "Записаться на покраску",
    estimatePreferred: true,
    relatedIds: ["body-repair", "polishing"],
    cardTitle: "Покраска автомобиля",
    cardDescription: "Покраска кузова и отдельных деталей в покрасочной камере.",
    showOnHome: true
  },
  {
    id: "tires",
    type: "service",
    name: "Шиномонтаж",
    slug: "shinomontazh",
    path: "/uslugi/shinomontazh",
    seoTitle: "Шиномонтаж в Минске — Teorema Service",
    seoDescription:
      "Сезонная смена шин, шиномонтаж и балансировка колёс в Teorema Service в Минске.",
    h1: "Шиномонтаж",
    subtitle: "Сезонная смена шин и шиномонтажные работы.",
    intro:
      "Делаем сезонную смену шин и шиномонтажные работы. На оборудовании сервиса выполняем монтаж, демонтаж и балансировку колёс.",
    blocks: [
      block(
        "season",
        "Сезонная смена",
        "Меняем колёса или шины на дисках в начале сезона. Запись помогает выбрать удобное время, особенно когда очередь на шиномонтаж больше обычного."
      ),
      block(
        "balance",
        "Балансировка",
        "После монтажа балансируем колёса на шиномонтажном оборудовании сервиса."
      ),
      block(
        "how",
        "Как записаться",
        "Позвоните или оставьте заявку на сайте. Другие операции, кроме смены шин, монтажа, демонтажа и балансировки, уточняйте при обращении."
      )
    ],
    faq: [
      faq(
        "tires-season",
        "Можно записаться на сезонную смену шин?",
        "Да. Оставьте заявку или позвоните — подтвердим время."
      ),
      faq(
        "tires-balance",
        "Делаете балансировку?",
        "Да. Монтаж, демонтаж и балансировка колёс выполняются на шиномонтажном оборудовании сервиса."
      )
    ],
    image: "",
    imageAlt: "Шиномонтаж в Teorema Service",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp,
    serviceId: "tires",
    icon: "mdi-tire",
    cta: "Записаться на шиномонтаж",
    estimatePreferred: false,
    relatedIds: ["maintenance", "repair"],
    cardTitle: "Шиномонтаж",
    cardDescription: "Сезонная смена шин и шиномонтажные работы.",
    showOnHome: true
  },
  {
    id: "ac",
    type: "service",
    name: "Заправка автокондиционера",
    slug: "zapravka-kondicionera",
    path: "/uslugi/zapravka-kondicionera",
    seoTitle: "Заправка автокондиционера в Минске — Teorema Service",
    seoDescription:
      "Заправка системы кондиционирования автомобиля в Teorema Service. Запись по телефону или через форму.",
    h1: "Заправка автокондиционера",
    subtitle: "Заправка системы кондиционирования автомобиля.",
    intro:
      "Заправляем систему кондиционирования автомобиля. Если нужны другие работы с кондиционером, уточните их при обращении — не обещаем заранее то, что не подтверждено.",
    blocks: [
      block(
        "what",
        "Что делаем",
        "Заправляем систему кондиционирования. Тип хладагента и возможность заправки зависят от автомобиля — это проверяем на месте."
      ),
      block(
        "how",
        "Как записаться",
        "Позвоните или оставьте заявку. Если кондиционер не холодит, опишите симптом: так проще понять, достаточно ли заправки или нужен осмотр."
      )
    ],
    faq: [
      faq(
        "ac-refill",
        "Можно только заправить кондиционер?",
        "Да, заправляем систему кондиционирования автомобиля. Другие работы уточняйте при обращении."
      ),
      faq(
        "ac-price",
        "Сколько стоит заправка?",
        "Стоимость назовём при обращении: она зависит от автомобиля и фактического объёма работ."
      )
    ],
    image: "",
    imageAlt: "Заправка автокондиционера",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp,
    serviceId: "ac",
    icon: "mdi-snowflake",
    cta: "Записаться на заправку",
    estimatePreferred: false,
    relatedIds: ["maintenance", "repair"],
    cardTitle: "Заправка автокондиционера",
    cardDescription: "Заправка системы кондиционирования автомобиля.",
    showOnHome: true
  },
  {
    id: "polishing",
    type: "service",
    name: "Полировка кузова",
    slug: "polirovka-kuzova",
    path: "/uslugi/polirovka-kuzova",
    seoTitle: "Полировка кузова в Минске — Teorema Service",
    seoDescription:
      "Полировка лакокрасочного покрытия в Teorema Service: восстановление блеска и менее заметные мелкие поверхностные дефекты.",
    h1: "Полировка кузова",
    subtitle:
      "Полировка лакокрасочного покрытия для восстановления блеска и уменьшения заметности мелких поверхностных дефектов.",
    intro:
      "Полируем лакокрасочное покрытие, чтобы вернуть блеск и сделать менее заметными мелкие поверхностные дефекты. Глубокие царапины полировка не убирает.",
    blocks: [
      block(
        "result",
        "Какой результат ожидать",
        "После полировки покрытие обычно выглядит ровнее и блестит сильнее. Мелкие потёртости и следы эксплуатации становятся менее заметными. Глубокие повреждения краски полировкой не устраняются."
      ),
      block(
        "inspect",
        "Когда нужен осмотр",
        "Состояние краски лучше оценить на автомобиле. По фото можно предварительно понять задачу, окончательно — после осмотра."
      ),
      block(
        "how",
        "Как записаться",
        "Позвоните, оставьте заявку или пришлите фотографии кузова при дневном свете."
      )
    ],
    faq: [
      faq(
        "polish-scratches",
        "Уберёт ли полировка глубокие царапины?",
        "Нет. Полировка уменьшает заметность мелких поверхностных дефектов и возвращает блеск. Глубокие царапины так не устраняются."
      ),
      faq(
        "polish-after-paint",
        "Делаете полировку после покраски?",
        "Да, полировку можно совместить с другими работами в сервисе. Объём согласуем отдельно."
      )
    ],
    image: "",
    imageAlt: "Полировка кузова",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp,
    serviceId: "polishing",
    icon: "mdi-car-wash",
    cta: "Записаться на полировку",
    estimatePreferred: true,
    relatedIds: ["painting", "body-repair"],
    cardTitle: "Полировка кузова",
    cardDescription:
      "Полировка лакокрасочного покрытия для восстановления блеска и уменьшения заметности мелких поверхностных дефектов.",
    showOnHome: true
  },
  {
    id: "works",
    type: "static",
    name: "Наши работы",
    slug: "works",
    path: "/works",
    seoTitle: "Наши работы — Teorema Service",
    seoDescription:
      "Примеры работ Teorema Service: ремонт, кузовной ремонт, покраска, шиномонтаж и полировка.",
    h1: "Наши работы",
    subtitle: "Публикуем только реальные фотографии выполненных работ.",
    intro: "",
    blocks: [],
    faq: [],
    image: "",
    imageAlt: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp
  },
  {
    id: "prices",
    type: "static",
    name: "Цены",
    slug: "prices",
    path: "/prices",
    seoTitle: "Цены на услуги автосервиса Teorema Service",
    seoDescription:
      "Стоимость услуг Teorema Service определяется после осмотра. Для ремонта можно отправить фотографии.",
    h1: "Цены на услуги",
    subtitle:
      "Мы не публикуем выдуманные прайсы. Стоимость работ зависит от автомобиля и фактического объёма ремонта.",
    intro: "",
    blocks: [],
    faq: [],
    image: "",
    imageAlt: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp
  },
  {
    id: "about",
    type: "static",
    name: "О сервисе",
    slug: "about",
    path: "/about",
    seoTitle: "О сервисе Teorema Service в Минске",
    seoDescription:
      "Teorema Service — автосервис в Минске на ул. Солтыса, 108. Обслуживаем легковые автомобили и лёгкий коммерческий транспорт.",
    h1: "О сервисе",
    subtitle:
      "Автосервис в Минске: легковые автомобили и лёгкий коммерческий транспорт.",
    intro:
      "Teorema Service принимает легковые автомобили и лёгкий коммерческий транспорт, включая небольшие грузовики. В одном месте можно сделать обслуживание и ремонт, кузовные работы на стапеле, покраску в камере, шиномонтаж, заправку кондиционера и полировку кузова.",
    blocks: [],
    faq: [],
    image: "",
    imageAlt: "Автосервис Teorema Service",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp
  },
  {
    id: "contacts",
    type: "static",
    name: "Контакты",
    slug: "contacts",
    path: "/contacts",
    seoTitle: "Контакты Teorema Service — Минск, ул. Солтыса, 108",
    seoDescription:
      "Teorema Service, г. Минск, ул. Солтыса, 108. Телефон +375 44 518 94 32. График 9:00–18:00, воскресенье — выходной.",
    h1: "Контакты",
    subtitle: "Адрес, телефон и график работы.",
    intro: "",
    blocks: [],
    faq: [],
    image: "",
    imageAlt: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp
  },
  {
    id: "booking",
    type: "static",
    name: "Запись",
    slug: "booking",
    path: "/booking",
    seoTitle: "Записаться в сервис — Teorema Service",
    seoDescription:
      "Онлайн-запись в Teorema Service: имя, телефон и нужная услуга.",
    h1: "Записаться в сервис",
    subtitle: "Оставьте имя, телефон и услугу — мы подтвердим запись по телефону.",
    intro: "",
    blocks: [],
    faq: [],
    image: "",
    imageAlt: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp
  },
  {
    id: "estimate",
    type: "static",
    name: "Оценка по фото",
    slug: "estimate",
    path: "/estimate",
    seoTitle: "Уточнить стоимость ремонта по фото — Teorema Service",
    seoDescription:
      "Отправьте фотографии автомобиля — предварительно оценим объём работ и свяжемся с вами.",
    h1: "Уточнить стоимость по фото",
    subtitle:
      "Прикрепите фотографии — предварительно оценим объём работ и свяжемся с вами.",
    intro: "",
    blocks: [],
    faq: [],
    image: "",
    imageAlt: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp
  },
  {
    id: "privacy",
    type: "static",
    name: "Обработка данных",
    slug: "privacy",
    path: "/privacy",
    seoTitle: "Обработка данных — Teorema Service",
    seoDescription:
      "Данные из форм Teorema Service используются для обработки обращения и связи с клиентом.",
    h1: "Обработка предоставленных данных",
    subtitle: "Данные из форм сайта используются только для обработки обращения.",
    intro: "",
    blocks: [],
    faq: [],
    image: "",
    imageAlt: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    status: "published",
    robotsIndex: true,
    canonical: "",
    updatedAt: stamp
  }
];

export function getManagedPage(id: string): ManagedPage | undefined {
  return defaultManagedPages.find(page => page.id === id);
}

export function getPageByPath(
  path: string,
  pages: ManagedPage[] = defaultManagedPages
): ManagedPage | undefined {
  const normalized = path === "/" ? "/" : path.replace(/\/+$/, "") || "/";
  return pages.find(page => page.path === normalized);
}

export function getPageBySlug(
  slug: string,
  pages: ManagedPage[] = defaultManagedPages
): ManagedPage | undefined {
  return pages.find(page => page.type === "service" && page.slug === slug);
}
