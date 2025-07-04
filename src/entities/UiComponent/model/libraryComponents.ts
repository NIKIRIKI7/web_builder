import { shallowRef } from 'vue';
import type { UiComponentInfo } from './types';

// Динамические импорты для ленивой загрузки компонентов
const SimpleHeader = () => import('../ui/SimpleHeader/SimpleHeader.vue');
const SimpleFooter = () => import('../ui/SimpleFooter/SimpleFooter.vue');

export const libraryComponents: UiComponentInfo[] = [
    {
        id: 'simple-header-v1',
        name: 'Simple Header',
        category: 'Headers',
        component: shallowRef(SimpleHeader as any),
    },
    {
        id: 'simple-footer-v1',
        name: 'Simple Footer',
        category: 'Footers',
        component: shallowRef(SimpleFooter as any),
    },
];

/**
 * Создаем Map для быстрого доступа к компонентам по их ID.
 * Это эффективнее, чем каждый раз искать в массиве.
 */
export const componentsMap = new Map<string, UiComponentInfo>(
    libraryComponents.map(c => [c.id, c])
);