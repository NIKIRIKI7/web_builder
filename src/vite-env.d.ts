/// <reference types="vite/client" />

import 'pinia';
import type { PersistedStateOptions } from 'pinia-plugin-persistedstate';

declare module 'pinia' {
  export interface DefineStoreOptions<Id, S, G, A> {
    persist?: PersistedStateOptions | true;
  }
}