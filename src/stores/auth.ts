import { defineStore, acceptHMRUpdate } from "pinia";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    session: null as Session | null,
    ready: false
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
      supabase.auth.onAuthStateChange((_event, session) => {
        this.session = session;
      });
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
    },
    async signOut() {
      if (!supabase) return;
      await supabase.auth.signOut();
      this.session = null;
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
