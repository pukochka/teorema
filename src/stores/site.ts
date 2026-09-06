import { defineStore, acceptHMRUpdate } from "pinia";
import { cloneSiteConfig, mergeMessengers } from "@/config/site";
import { supabase } from "@/lib/supabase";
import { reviews as fallbackReviews } from "@/data/reviews";
import { works as fallbackWorks } from "@/data/works";
import {
  mapReviewRow,
  mapWorkRow,
  type ReviewRow,
  type SiteSettingsRow,
  type WorkRow
} from "@/types/content";
import type { Review } from "@/types/contact";
import type { WorkProject } from "@/types/work";

export const useSiteStore = defineStore("site", {
  state: () => ({
    drawerOpen: false,
    contentLoaded: false,
    config: cloneSiteConfig(),
    works: fallbackWorks.slice() as WorkProject[],
    reviews: fallbackReviews.slice() as Review[]
  }),
  actions: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
    setDrawer(value: boolean) {
      this.drawerOpen = value;
    },
    applySettings(row: SiteSettingsRow) {
      if (Array.isArray(row.phones) && row.phones.length) {
        this.config.phones = row.phones;
      }
      if (typeof row.email === "string") {
        this.config.email = row.email;
      }
      if (row.address) {
        this.config.address = row.address;
        this.config.businessLocation.address = row.address;
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
    },
    async loadContent() {
      if (!supabase) {
        this.contentLoaded = true;
        return;
      }

      try {
        const [settingsRes, worksRes, reviewsRes] = await Promise.all([
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
            .order("sort_order", { ascending: true })
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
