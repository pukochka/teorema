import type { RouteRecordRaw } from "vue-router";
import { coreServices } from "@/data/services";

const serviceRoutes: RouteRecordRaw[] = coreServices.map(service => ({
  path: service.route.replace(/^\//, ""),
  name: service.id,
  component: () => import("@/pages/ServicePage.vue"),
  meta: {
    serviceId: service.id,
    title: service.seoTitle,
    description: service.seoDescription,
    requiresAuth: false
  }
}));

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
            "СТО Teorema Service — ремонт, стапель, покраска и полировка",
          description:
            "СТО Teorema Service в Минске: ремонт любой сложности, стапель, покрасочная камера и полировка.",
          requiresAuth: false
        }
      },
      ...serviceRoutes,
      { path: "body-repair", redirect: "/repair" },
      { path: "commercial-vehicles", redirect: "/" },
      { path: "fleet", redirect: "/" },
      { path: "equipment", redirect: "/" },
      {
        path: "works",
        name: "works",
        component: () => import("@/pages/WorksPage.vue"),
        meta: {
          title: "Наши работы — Teorema Service",
          description:
            "Примеры работ Teorema Service: СТО, ремонт, стапель, покраска и полировка.",
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
            "Стоимость услуг Teorema Service определяется после осмотра. Для ремонта можно отправить фотографии.",
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
            "Teorema Service — СТО в Минске: ремонт любой сложности, стапель, покрасочная камера и полировка.",
          requiresAuth: false
        }
      },
      {
        path: "contacts",
        name: "contacts",
        component: () => import("@/pages/ContactsPage.vue"),
        meta: {
          title: "Контакты Teorema Service — адрес и телефон",
          description:
            "Teorema Service, г. Минск, ул. Солтыса, 108. Телефон +375 44 518 94 32. График 9:00–18:00, воскресенье — выходной.",
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
            "Онлайн-запись в Teorema Service: имя, телефон и нужная услуга.",
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
            "Отправьте фотографии автомобиля — предварительно оценим объём работ и свяжемся с вами.",
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
