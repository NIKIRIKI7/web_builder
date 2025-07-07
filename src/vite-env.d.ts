/// <reference types="vite/client" />

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
        serialize: (value: any) => string;
        deserialize: (value: string) => any;
      };
      beforeRestore?: (context: any) => void;
      afterRestore?: (context: any) => void;
    };
  }
}