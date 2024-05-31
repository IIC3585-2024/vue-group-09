// src/stores/eventStore.ts
import { defineStore } from 'pinia';
import { getEvents } from '../services/eventService';

export const useEventStore = defineStore({
  id: 'event',
  state: () => ({
    events: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchEvents() {
      this.loading = true;
      this.error = null;
      try {
        this.events = await getEvents();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
});