import { defineAsyncComponent } from 'vue';
import type { UiComponentInfo } from './types';

const SimpleHeaderLoader = () => import('../ui/SimpleHeader/SimpleHeader.vue');
const SimpleFooterLoader = () => import('../ui/SimpleFooter/SimpleFooter.vue');

export const libraryComponents: UiComponentInfo[] = [
    {
        id: 'simple-header-v1',
        name: 'Simple Header',
        category: 'Headers',
        component: defineAsyncComponent(SimpleHeaderLoader),
        // Определяем пропсы по умолчанию для хедера
        defaultProps: {
            logoText: 'MyWebsite',
            ctaText: 'Get Started',
            links: [
                { id: 1, text: 'Home', url: '#' },
                { id: 2, text: 'About', url: '#' },
                { id: 3, text: 'Contact', url: '#' },
            ]
        },
    },
    {
        id: 'simple-footer-v1',
        name: 'Simple Footer',
        category: 'Footers',
        component: defineAsyncComponent(SimpleFooterLoader),
        // Определяем пропсы по умолчанию для футера
        defaultProps: {
            copyrightText: `© ${new Date().getFullYear()} Web Builder Inc. All rights reserved.`
        }
    },
];

export const componentsMap = new Map<string, UiComponentInfo>(
    libraryComponents.map(c => [c.id, c])
);