import { defineStore, acceptHMRUpdate } from "pinia";

interface StoredLead {
  id?: string;
  type: "estimate" | "booking" | "fleet";
  createdAt: string;
  payload: Record<string, unknown>;
}

export const useLeadsStore = defineStore("leads", {
  state: () => ({
    items: [] as StoredLead[]
  }),
  actions: {
    addEstimate(payload: Record<string, unknown>) {
      this.items.unshift({
        type: "estimate",
        createdAt: new Date().toISOString(),
        payload
      });
    },
    addBooking(payload: Record<string, unknown>) {
      this.items.unshift({
        type: "booking",
        createdAt: new Date().toISOString(),
        payload
      });
    },
    addFleet(payload: Record<string, unknown>) {
      this.items.unshift({
        type: "fleet",
        createdAt: new Date().toISOString(),
        payload
      });
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLeadsStore, import.meta.hot));
}
