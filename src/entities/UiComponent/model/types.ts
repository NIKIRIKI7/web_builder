import type { DefineComponent, ShallowRef } from 'vue';

export type UiComponentCategory = 'Headers' | 'Footers' | 'Content';

export interface UiComponentInfo {
    id: string;
    name: string;
    category: UiComponentCategory;
    component: ShallowRef<DefineComponent<{}, {}, any>>;
}