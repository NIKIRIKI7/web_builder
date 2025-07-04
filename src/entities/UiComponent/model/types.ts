import type { DefineComponent } from 'vue';

export type UiComponentCategory = 'Headers' | 'Footers' | 'Content';

export interface UiComponentInfo {
    id: string;
    name: string;
    category: UiComponentCategory;
    component: DefineComponent<{}, {}, any>;
    // Добавляем поле для пропсов по умолчанию.
    // Оно необязательное, так как у некоторых компонентов их может не быть.
    defaultProps?: Record<string, any>;
}