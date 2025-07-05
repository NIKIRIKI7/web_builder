import { defineStore } from 'pinia';
import { shallowRef, type Component } from 'vue';

interface ModalState {
  isOpen: boolean;
  component: Component | null;
  props: Record<string, any>;
  resolvePromise?: (value: any) => void;
  rejectPromise?: (reason?: any) => void;
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
    open<T = any>(component: Component, props: Record<string, any> = {}): Promise<T> {
      this.isOpen = true;
      this.component = shallowRef(component);
      this.props = props;

      return new Promise<T>((resolve, reject) => {
        this.resolvePromise = resolve;
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
    resolve(value: any) {
      if (this.resolvePromise) {
        this.resolvePromise(value);
      }
      this.close();
    },
    reject(reason: any) {
      if (this.rejectPromise) {
        this.rejectPromise(reason);
      }
      this.close();
    },
  },
});