import { defineStore, acceptHMRUpdate } from "pinia";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { isClient } from "@/utils/ssr";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    session: null as Session | null,
    ready: false,
    isAdmin: false
  }),
  getters: {
    isAuthenticated: state => Boolean(state.session)
  },
  actions: {
    async init() {
      if (!supabase) {
        this.ready = true;
        return;
      }

      const { data } = await supabase.auth.getSession();
      this.session = data.session;
      await this.refreshAdmin();
      if (isClient) {
        supabase.auth.onAuthStateChange((_event, session) => {
          this.session = session;
          void this.refreshAdmin();
        });
      }
      this.ready = true;
    },
    async signIn(email: string, password: string) {
      if (!supabase) {
        throw new Error("Supabase не настроен.");
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      this.session = data.session;
      await this.refreshAdmin();
    },
    async refreshAdmin() {
      if (!supabase || !this.session?.user.id) {
        this.isAdmin = false;
        return;
      }
      const { data } = await supabase
        .from("site_admins")
        .select("user_id")
        .eq("user_id", this.session.user.id)
        .maybeSingle();
      this.isAdmin = Boolean(data);
    },
    async signOut() {
      if (!supabase) return;
      await supabase.auth.signOut();
      this.session = null;
      this.isAdmin = false;
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
