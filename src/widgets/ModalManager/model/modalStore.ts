import { defineStore } from 'pinia';
import { shallowRef, type Component } from 'vue';

interface ModalState {
  isOpen: boolean;
  component: Component | null;
  props: Record<string, unknown>;
  // eslint-disable-next-line no-unused-vars
  resolvePromise?: (value: unknown) => void;
  // eslint-disable-next-line no-unused-vars
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
        // eslint-disable-next-line no-unused-vars
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