import type { DefineComponent } from 'vue';

export type UiComponentCategory = 'Headers' | 'Footers' | 'Content';

export interface UiComponentInfo {
    id: string;
    name: string;
    category: UiComponentCategory;
    // ИСПРАВЛЕНИЕ: Компонент больше не обернут в ShallowRef.
    // Мы используем DefineComponent, чтобы охватить как обычные, так и асинхронные компоненты.
    component: DefineComponent<{}, {}, any>;
}