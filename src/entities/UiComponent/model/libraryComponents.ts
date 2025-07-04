// 1. Импортируем defineAsyncComponent из Vue
import { defineAsyncComponent } from 'vue';
import type { UiComponentInfo } from './types';

// Определяем функции-загрузчики
const SimpleHeaderLoader = () => import('../ui/SimpleHeader/SimpleHeader.vue');
const SimpleFooterLoader = () => import('../ui/SimpleFooter/SimpleFooter.vue');

export const libraryComponents: UiComponentInfo[] = [
    {
        id: 'simple-header-v1',
        name: 'Simple Header',
        category: 'Headers',
        // 2. Оборачиваем загрузчик в defineAsyncComponent
        component: defineAsyncComponent(SimpleHeaderLoader),
    },
    {
        id: 'simple-footer-v1',
        name: 'Simple Footer',
        category: 'Footers',
        // 3. Делаем то же самое для всех остальных компонентов
        component: defineAsyncComponent(SimpleFooterLoader),
    },
];

/**
 * Карта остается без изменений.
 */
export const componentsMap = new Map<string, UiComponentInfo>(
    libraryComponents.map(c => [c.id, c])
);