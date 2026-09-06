import type { RouteRecordRaw } from "vue-router";
import { defaultManagedPages } from "@/data/pages";
import { defaultRedirects } from "@/data/redirects";

const publishedServices = defaultManagedPages.filter(
  page => page.type === "service" && page.status === "published"
);

const serviceRoutes: RouteRecordRaw[] = publishedServices.map(page => ({
  path: page.path.replace(/^\//, ""),
  name: `service-${page.id}`,
  component: () => import("@/pages/ServicePage.vue"),
  meta: {
    pageId: page.id,
    title: page.seoTitle,
    description: page.seoDescription,
    requiresAuth: false
  }
}));

const legacyRedirects: RouteRecordRaw[] = defaultRedirects.map(rule => ({
  path: rule.fromPath.replace(/^\//, ""),
  name: `redirect-${rule.id}`,
  component: () => import("@/pages/RedirectPage.vue"),
  meta: {
    redirectTo: rule.toPath,
    robots: "noindex, follow",
    requiresAuth: false
  }
}));

const staticPage = (
  path: string,
  name: string,
  component: () => Promise<unknown>,
  title: string,
  description: string
): RouteRecordRaw => ({
  path,
  name,
  component,
  meta: {
    title,
    description,
    requiresAuth: false
  }
});

const home = defaultManagedPages.find(page => page.id === "home");
const works = defaultManagedPages.find(page => page.id === "works");
const prices = defaultManagedPages.find(page => page.id === "prices");
const about = defaultManagedPages.find(page => page.id === "about");
const contacts = defaultManagedPages.find(page => page.id === "contacts");
const booking = defaultManagedPages.find(page => page.id === "booking");
const estimate = defaultManagedPages.find(page => page.id === "estimate");
const privacy = defaultManagedPages.find(page => page.id === "privacy");

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
          title: home?.seoTitle,
          description: home?.seoDescription,
          requiresAuth: false
        }
      },
      ...serviceRoutes,
      {
        path: "uslugi/:slug",
        name: "service",
        component: () => import("@/pages/ServicePage.vue"),
        meta: {
          requiresAuth: false
        }
      },
      ...legacyRedirects,
      staticPage(
        "works",
        "works",
        () => import("@/pages/WorksPage.vue"),
        works?.seoTitle || "Наши работы — Teorema Service",
        works?.seoDescription || ""
      ),
      staticPage(
        "prices",
        "prices",
        () => import("@/pages/PricesPage.vue"),
        prices?.seoTitle || "Цены на услуги автосервиса Teorema Service",
        prices?.seoDescription || ""
      ),
      staticPage(
        "about",
        "about",
        () => import("@/pages/AboutPage.vue"),
        about?.seoTitle || "О сервисе Teorema Service в Минске",
        about?.seoDescription || ""
      ),
      staticPage(
        "contacts",
        "contacts",
        () => import("@/pages/ContactsPage.vue"),
        contacts?.seoTitle || "Контакты Teorema Service",
        contacts?.seoDescription || ""
      ),
      staticPage(
        "booking",
        "booking",
        () => import("@/pages/BookingPage.vue"),
        booking?.seoTitle || "Записаться в сервис — Teorema Service",
        booking?.seoDescription || ""
      ),
      staticPage(
        "estimate",
        "estimate",
        () => import("@/pages/EstimatePage.vue"),
        estimate?.seoTitle || "Уточнить стоимость — Teorema Service",
        estimate?.seoDescription || ""
      ),
      staticPage(
        "privacy",
        "privacy",
        () => import("@/pages/PrivacyPage.vue"),
        privacy?.seoTitle || "Обработка данных — Teorema Service",
        privacy?.seoDescription || ""
      )
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
        path: "pages",
        name: "admin-pages",
        component: () => import("@/pages/admin/AdminPagesPage.vue"),
        meta: {
          title: "Страницы и SEO — админка Teorema Service",
          robots: "noindex, nofollow"
        }
      },
      {
        path: "pages/:id",
        name: "admin-page-edit",
        component: () => import("@/pages/admin/AdminPageEditorPage.vue"),
        meta: {
          title: "Редактирование страницы — админка Teorema Service",
          robots: "noindex, nofollow"
        }
      },
      {
        path: "preview/:id",
        name: "admin-preview",
        component: () => import("@/pages/admin/AdminPreviewPage.vue"),
        meta: {
          title: "Предпросмотр — админка Teorema Service",
          robots: "noindex, nofollow",
          preview: true
        }
      },
      {
        path: "settings",
        name: "admin-settings",
        component: () => import("@/pages/admin/AdminSettingsPage.vue"),
        meta: {
          title: "Настройки сайта — админка Teorema Service",
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
