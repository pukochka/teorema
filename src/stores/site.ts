import { defineStore, acceptHMRUpdate } from "pinia";
import {
  cloneSiteConfig,
  composeAddress,
  mergeMessengers
} from "@/config/site";
import { defaultManagedPages } from "@/data/pages";
import { defaultRedirects } from "@/data/redirects";
import { reviews as fallbackReviews } from "@/data/reviews";
import {
  homeCardsFromPages,
  servicesFromPages
} from "@/data/services";
import { works as fallbackWorks } from "@/data/works";
import { supabase } from "@/lib/supabase";
import {
  mapPageRow,
  mapRedirectRow,
  mapReviewRow,
  mapWorkRow,
  mergePages,
  mergeRedirects,
  type PageRow,
  type RedirectRow,
  type ReviewRow,
  type SiteSettingsRow,
  type WorkRow
} from "@/types/content";
import type { Review } from "@/types/contact";
import type { ManagedPage, RedirectRule } from "@/types/page";
import type { WorkProject } from "@/types/work";
import { normalizePath } from "@/utils/paths";

export const useSiteStore = defineStore("site", {
  state: () => ({
    drawerOpen: false,
    contentLoaded: false,
    config: cloneSiteConfig(),
    pages: defaultManagedPages.map(page => ({ ...page })),
    redirects: defaultRedirects.map(rule => ({ ...rule })),
    works: fallbackWorks.slice() as WorkProject[],
    reviews: fallbackReviews.slice() as Review[]
  }),
  getters: {
    publishedPages: state =>
      state.pages.filter(page => page.status === "published"),
    publishedServices: state => servicesFromPages(state.pages),
    homeServiceCards: state => homeCardsFromPages(state.pages),
    serviceNav() {
      return this.publishedServices.map(service => ({
        label: service.title,
        to: service.route,
        icon: service.icon
      }));
    }
  },
  actions: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
    setDrawer(value: boolean) {
      this.drawerOpen = value;
    },
    pageByPath(path: string): ManagedPage | undefined {
      const normalized = normalizePath(path);
      return this.pages.find(page => page.path === normalized);
    },
    pageById(id: string): ManagedPage | undefined {
      return this.pages.find(page => page.id === id);
    },
    publishedPageByPath(path: string): ManagedPage | undefined {
      const page = this.pageByPath(path);
      return page?.status === "published" ? page : undefined;
    },
    applySettings(row: SiteSettingsRow) {
      if (row.name) {
        this.config.name = row.name;
        this.config.legalName = row.name;
      }
      if (typeof row.city === "string") {
        this.config.city = row.city;
        this.config.businessLocation.city = row.city;
      }
      if (typeof row.city_prepositional === "string") {
        this.config.cityPrepositional = row.city_prepositional;
      }
      if (typeof row.street === "string") {
        this.config.street = row.street;
        this.config.businessLocation.street = row.street;
      }
      if (Array.isArray(row.phones) && row.phones.length) {
        this.config.phones = row.phones;
      }
      if (typeof row.email === "string") {
        this.config.email = row.email;
      }
      if (typeof row.street === "string" || typeof row.city === "string") {
        const composed = composeAddress(this.config.city, this.config.street);
        this.config.address = row.address?.trim() || composed;
        this.config.businessLocation.address = this.config.address;
      } else if (row.address) {
        this.config.address = row.address;
        this.config.businessLocation.address = row.address;
      }
      if (typeof row.lat === "number") {
        this.config.businessLocation.lat = row.lat;
      }
      if (typeof row.lng === "number") {
        this.config.businessLocation.lng = row.lng;
      }
      if (typeof row.maps_url === "string") {
        this.config.businessLocation.mapsUrl = row.maps_url;
      }
      if (row.working_hours) {
        this.config.workingHours = {
          display:
            row.working_hours.display || this.config.workingHours.display,
          closed: row.working_hours.closed || this.config.workingHours.closed,
          schema: row.working_hours.schema?.length
            ? row.working_hours.schema
            : this.config.workingHours.schema
        };
      }
      this.config.messengers = mergeMessengers(row.messengers);
      if (Array.isArray(row.socials)) {
        this.config.socials = row.socials.filter(item => item.url);
      }
      if (row.logo) {
        this.config.logo = row.logo;
      }
      if (row.og_image) {
        this.config.seo.ogImage = row.og_image;
      }
      if (row.title_template) {
        this.config.seo.titleTemplate = row.title_template;
      }
      if (row.title_template_no_city) {
        this.config.seo.titleTemplateNoCity = row.title_template_no_city;
      }
      if (typeof row.yandex_verification === "string") {
        this.config.yandexVerification = row.yandex_verification;
      }
      if (typeof row.google_verification === "string") {
        this.config.googleVerification = row.google_verification;
      }
      if (typeof row.yandex_metrika_id === "string") {
        this.config.yandexMetrikaId = row.yandex_metrika_id.trim();
      }
      if (typeof row.ga_measurement_id === "string") {
        this.config.gaMeasurementId = row.ga_measurement_id.trim();
      }
    },
    applyPages(pages: ManagedPage[]) {
      this.pages = mergePages(defaultManagedPages, pages);
    },
    applyRedirects(rules: RedirectRule[]) {
      this.redirects = mergeRedirects(defaultRedirects, rules);
    },
    upsertLocalPage(page: ManagedPage) {
      const index = this.pages.findIndex(item => item.id === page.id);
      if (index === -1) {
        this.pages.push(page);
        return;
      }
      this.pages[index] = page;
    },
    async loadAllPagesForAdmin() {
      if (!supabase) return;
      const { data, error } = await supabase.from("pages").select("*");
      if (error) throw error;
      if (data) {
        this.applyPages((data as PageRow[]).map(mapPageRow));
      }
    },
    async loadContent() {
      if (!supabase) {
        this.contentLoaded = true;
        return;
      }

      try {
        const [
          settingsRes,
          worksRes,
          reviewsRes,
          pagesRes,
          redirectsRes,
          visibilityRes
        ] = await Promise.all([
            supabase
              .from("site_settings")
              .select("*")
              .eq("id", "default")
              .maybeSingle(),
            supabase
              .from("works")
              .select("*")
              .eq("published", true)
              .order("sort_order", { ascending: true }),
            supabase
              .from("reviews")
              .select("*")
              .eq("published", true)
              .order("sort_order", { ascending: true }),
            supabase.from("pages").select("*").eq("status", "published"),
            supabase.from("redirects").select("*"),
            supabase.from("page_visibility").select("id,status,path")
          ]);

        if (settingsRes.data) {
          this.applySettings(settingsRes.data as SiteSettingsRow);
        }
        if (worksRes.data) {
          this.works = (worksRes.data as WorkRow[]).map(mapWorkRow);
        }
        if (reviewsRes.data) {
          this.reviews = (reviewsRes.data as ReviewRow[]).map(mapReviewRow);
        }
        if (pagesRes.data) {
          this.applyPages((pagesRes.data as PageRow[]).map(mapPageRow));
        }
        const visibility = visibilityRes.data as
          | Array<{ id: string; status: string; path: string }>
          | null;
        if (visibility?.length) {
          const publishedIds = new Set(
            visibility
              .filter(item => item.status === "published")
              .map(item => item.id)
          );
          this.pages = this.pages.map(page => {
            const listed = visibility.some(item => item.id === page.id);
            if (listed && !publishedIds.has(page.id)) {
              return { ...page, status: "draft" as const };
            }
            return page;
          });
        }
        if (redirectsRes.data) {
          this.applyRedirects(
            (redirectsRes.data as RedirectRow[]).map(mapRedirectRow)
          );
        }
      } catch {
        // Keep compiled defaults if Supabase is unreachable.
      } finally {
        this.contentLoaded = true;
      }
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSiteStore, import.meta.hot));
}
