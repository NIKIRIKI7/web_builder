// src/entities/UiComponent/model/libraryComponents.ts

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
        defaultProps: {
            logoText: 'MyWebsite',
            ctaText: 'Get Started',
            links: [
                { id: 1, text: 'Home', url: '#' },
                { id: 2, text: 'About', url: '#' },
                { id: 3, text: 'Contact', url: '#' },
            ]
        },
        editorTabs: [
            {
                name: 'Content',
                target: 'props',
                fields: [
                    { name: 'logoText', label: 'Logo Text', type: 'text' },
                    { name: 'ctaText', label: 'Button Text', type: 'text' },
                ]
            },
            {
                name: 'Styles',
                target: 'styles',
                fields: [
                    { name: 'backgroundColor', label: 'Background Color', type: 'color' },
                    { name: 'paddingTop', label: 'Padding Top (px)', type: 'number' },
                    { name: 'paddingBottom', label: 'Padding Bottom (px)', type: 'number' },
                ]
            }
        ]
    },
    {
        id: 'simple-footer-v1',
        name: 'Simple Footer',
        category: 'Footers',
        component: defineAsyncComponent(SimpleFooterLoader),
        defaultProps: {
            copyrightText: `© ${new Date().getFullYear()} Web Builder Inc. All rights reserved.`
        },
        editorTabs: [
            {
                name: 'Content',
                target: 'props',
                fields: [
                    { name: 'copyrightText', label: 'Copyright Text', type: 'textarea' },
                ]
            },
            {
                name: 'Styles',
                target: 'styles',
                fields: [
                    { name: 'backgroundColor', label: 'Background Color', type: 'color' },
                ]
            }
        ]
    },
];

export const componentsMap = new Map<string, UiComponentInfo>(
    libraryComponents.map(c => [c.id, c])
);