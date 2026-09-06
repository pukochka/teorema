import { defineRouter } from "#q-app";
import {
  createMemoryHistory,
  createRouter,
  createWebHistory
} from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useSiteStore } from "@/stores/site";
import { normalizePath } from "@/utils/paths";
import { resolveRedirectTarget } from "@/utils/redirects";
import { isClient } from "@/utils/ssr";
import routes from "./routes";

export default defineRouter(() => {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : createWebHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE)
  });

  Router.beforeEach(async to => {
    const auth = useAuthStore();
    if (!auth.ready) {
      await auth.init();
    }

    const needsAuth = to.matched.some(record => record.meta.requiresAuth);

    if (to.name === "admin-login" && auth.isAuthenticated) {
      return { path: "/admin" };
    }

    if (
      isClient &&
      !String(to.name || "").startsWith("redirect-") &&
      !to.meta.redirectTo
    ) {
      const site = useSiteStore();
      const target = resolveRedirectTarget(to.path, site.redirects);
      if (target && target !== normalizePath(to.path)) {
        return target;
      }
    }

    if (!needsAuth) {
      return true;
    }

    if (!isClient) {
      return true;
    }

    if (!auth.isAuthenticated) {
      return {
        path: "/admin/login",
        query: { redirect: to.fullPath }
      };
    }

    return true;
  });

  return Router;
});
