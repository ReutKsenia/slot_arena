import { defineStore } from 'pinia';

import type { ToastStateData, ToastType } from '@/types/toast.types';

interface ToastState {
  data: Array<ToastStateData>;
  counter: number;
}

export const useToastStore = defineStore('toast', {
  state: (): ToastState => ({
    data: [],
    counter: 0,
  }),

  getters: {
    toasts: (state) => state.data,
    count: (state) => state.counter,
  },

  actions: {
    show(notification: ToastType, message: string) {
      const isSameError = this.toasts.some(
        toast => toast.type === notification && toast.message === message,
      );

      if (!isSameError) {
        this.counter += 1;
        const id = this.counter;
        this.toasts.push({ 
          id,
          type: notification,
          message,
        });
        return id;
      }
      return 0;
    },
    hide(id: number) {
      this.data = this.data.filter((item) => item.id !== id);
    },
    hideAll() {
      this.data = [];
    },
  },
});
