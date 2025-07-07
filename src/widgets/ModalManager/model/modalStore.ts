import { defineStore } from 'pinia';
import { shallowRef, type Component } from 'vue';

interface ModalState {
  isOpen: boolean;
  component: Component | null;
  props: Record<string, unknown>;
   
  resolvePromise?: (value: unknown) => void;
   
  rejectPromise?: (reason?: unknown) => void;
}

export const useModalStore = defineStore('modal', {
  state: (): ModalState => ({
    isOpen: false,
    component: null,
    props: {},
    resolvePromise: undefined,
    rejectPromise: undefined,
  }),
  actions: {
    open<T = unknown>(component: Component, props: Record<string, unknown> = {}): Promise<T> {
      this.isOpen = true;
      this.component = shallowRef(component);
      this.props = props;

      return new Promise<T>((resolve, reject) => {
         
        this.resolvePromise = resolve as (value: unknown) => void;
        this.rejectPromise = reject;
      });
    },
    close() {
      if (this.rejectPromise) {
        this.rejectPromise('Modal closed by user');
      }
      this.isOpen = false;
      this.component = null;
      this.props = {};
      this.resolvePromise = undefined;
      this.rejectPromise = undefined;
    },
    resolve(value: unknown) {
      if (this.resolvePromise) {
        this.resolvePromise(value);
      }
      this.close();
    },
    reject(reason: unknown) {
      if (this.rejectPromise) {
        this.rejectPromise(reason);
      }
      this.close();
    },
  },
});