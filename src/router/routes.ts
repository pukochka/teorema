import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/pages/IndexPage.vue"),
        meta: {
          title:
            "СТО Teorema Service — ремонт, кузовные работы и покраска автомобилей",
          description:
            "СТО Teorema Service: техническое обслуживание автомобилей, кузовной ремонт, покраска в покрасочной камере, стапельные работы и обслуживание коммерческого транспорта.",
          requiresAuth: false
        }
      },
      {
        path: "auto-service",
        name: "auto-service",
        component: () => import("@/pages/AutoServicePage.vue"),
        meta: {
          title: "Автосервис в Teorema Service — ТО, диагностика и ремонт",
          description:
            "Техническое обслуживание, диагностика, ходовая, тормоза, двигатель, электрика и шиномонтаж легковых автомобилей и коммерческого транспорта.",
          requiresAuth: false
        }
      },
      {
        path: "body-repair",
        name: "body-repair",
        component: () => import("@/pages/BodyRepairPage.vue"),
        meta: {
          title: "Кузовной ремонт автомобилей — Teorema Service",
          description:
            "Кузовной ремонт после ДТП: дефектовка, стапель, рихтовка, сварка, замена элементов, подготовка и покраска.",
          requiresAuth: false
        }
      },
      {
        path: "painting",
        name: "painting",
        component: () => import("@/pages/PaintingPage.vue"),
        meta: {
          title: "Покраска автомобилей в покрасочной камере — Teorema Service",
          description:
            "Профессиональная покраска автомобилей: подбор цвета, подготовка, локальная и полная окраска, полировка.",
          requiresAuth: false
        }
      },
      {
        path: "frame-repair",
        name: "frame-repair",
        component: () => import("@/pages/FrameRepairPage.vue"),
        meta: {
          title: "Стапельные работы и восстановление геометрии кузова",
          description:
            "Стапельные работы в Teorema Service: измерение, фиксация, вытяжка и контроль геометрии кузова после ДТП.",
          requiresAuth: false
        }
      },
      {
        path: "commercial-vehicles",
        name: "commercial-vehicles",
        component: () => import("@/pages/CommercialVehiclesPage.vue"),
        meta: {
          title: "Ремонт коммерческого транспорта — Teorema Service",
          description:
            "Обслуживание микроавтобусов, фургонов и небольших грузовиков: ТО, диагностика, кузовной ремонт и покраска.",
          requiresAuth: false
        }
      },
      {
        path: "fleet",
        name: "fleet",
        component: () => import("@/pages/FleetPage.vue"),
        meta: {
          title: "Обслуживание корпоративных автопарков — Teorema Service",
          description:
            "Teorema Service работает с компаниями, которым необходимо регулярно обслуживать несколько автомобилей.",
          requiresAuth: false
        }
      },
      {
        path: "works",
        name: "works",
        component: () => import("@/pages/WorksPage.vue"),
        meta: {
          title: "Наши работы — кузовной ремонт и покраска Teorema Service",
          description:
            "Примеры кузовного ремонта, покраски, стапельных работ и восстановления автомобилей после ДТП.",
          requiresAuth: false
        }
      },
      {
        path: "equipment",
        name: "equipment",
        component: () => import("@/pages/EquipmentPage.vue"),
        meta: {
          title: "Оборудование автосервиса Teorema Service",
          description:
            "Покрасочная камера, стапель, подъёмники, диагностическое и шиномонтажное оборудование.",
          requiresAuth: false
        }
      },
      {
        path: "prices",
        name: "prices",
        component: () => import("@/pages/PricesPage.vue"),
        meta: {
          title: "Цены на услуги автосервиса Teorema Service",
          description:
            "Стоимость услуг Teorema Service определяется после диагностики. Для кузовного ремонта можно отправить фотографии.",
          requiresAuth: false
        }
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/pages/AboutPage.vue"),
        meta: {
          title: "О сервисе Teorema Service",
          description:
            "Teorema Service — комплексный автосервис: технический ремонт, кузовной цех, стапель и покраска в одном месте.",
          requiresAuth: false
        }
      },
      {
        path: "contacts",
        name: "contacts",
        component: () => import("@/pages/ContactsPage.vue"),
        meta: {
          title: "Контакты Teorema Service — адрес и телефоны",
          description:
            "Teorema Service, ул. Солтыса, 10В. Телефоны +375 25 666 93 13 и +375 44 518 94 32. График 9:00–18:00, воскресенье — выходной.",
          requiresAuth: false
        }
      },
      {
        path: "booking",
        name: "booking",
        component: () => import("@/pages/BookingPage.vue"),
        meta: {
          title: "Записаться на сервис — Teorema Service",
          description:
            "Онлайн-запись в Teorema Service: выберите услугу, удобную дату и время.",
          requiresAuth: false
        }
      },
      {
        path: "estimate",
        name: "estimate",
        component: () => import("@/pages/EstimatePage.vue"),
        meta: {
          title: "Оценка ремонта по фото — Teorema Service",
          description:
            "Отправьте фотографии автомобиля — мы предварительно оценим объём кузовного ремонта, покраски или стапельных работ.",
          requiresAuth: false
        }
      },
      {
        path: "privacy",
        name: "privacy",
        component: () => import("@/pages/PrivacyPage.vue"),
        meta: {
          title: "Обработка данных — Teorema Service",
          description:
            "Данные из форм Teorema Service используются для обработки обращения и связи с клиентом.",
          requiresAuth: false
        }
      }
    ]
  },
  {
    path: "/admin/login",
    name: "admin-login",
    component: () => import("@/pages/admin/AdminLoginPage.vue"),
    meta: {
      title: "Вход в админку — Teorema Service",
      requiresAuth: false,
      robots: "noindex, nofollow"
    }
  },
  {
    path: "/admin",
    component: () => import("@/layouts/AdminLayout.vue"),
    meta: {
      requiresAuth: true,
      robots: "noindex, nofollow"
    },
    children: [
      {
        path: "",
        name: "admin-home",
        component: () => import("@/pages/admin/AdminHomePage.vue"),
        meta: {
          title: "Админка — Teorema Service",
          robots: "noindex, nofollow"
        }
      },
      {
        path: "settings",
        name: "admin-settings",
        component: () => import("@/pages/admin/AdminSettingsPage.vue"),
        meta: {
          title: "Контакты — админка Teorema Service",
          robots: "noindex, nofollow"
        }
      },
      {
        path: "works",
        name: "admin-works",
        component: () => import("@/pages/admin/AdminWorksPage.vue"),
        meta: {
          title: "Работы — админка Teorema Service",
          robots: "noindex, nofollow"
        }
      },
      {
        path: "reviews",
        name: "admin-reviews",
        component: () => import("@/pages/admin/AdminReviewsPage.vue"),
        meta: {
          title: "Отзывы — админка Teorema Service",
          robots: "noindex, nofollow"
        }
      },
      {
        path: "leads",
        name: "admin-leads",
        component: () => import("@/pages/admin/AdminLeadsPage.vue"),
        meta: {
          title: "Заявки — админка Teorema Service",
          robots: "noindex, nofollow"
        }
      }
    ]
  },
  {
    path: "/:catchAll(.*)*",
    name: "not-found",
    component: () => import("@/pages/ErrorNotFound.vue")
  }
];

export default routes;
