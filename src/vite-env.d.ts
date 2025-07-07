/// <reference types="vite/client" />

import type { PiniaPluginContext } from 'pinia';
import 'pinia';

declare module 'pinia' {
  export interface DefineStoreOptions<Id, S, G, A> {
    persist?:
        | boolean
        | {
      key?: string;
      storage?: Storage;
      paths?: string[];
      serializer?: {
        serialize: (value: unknown) => string;
        deserialize: (value: string) => unknown;
      };
      beforeRestore?: (context: PiniaPluginContext) => void;
      afterRestore?: (context: PiniaPluginContext) => void;
    };
  }
}