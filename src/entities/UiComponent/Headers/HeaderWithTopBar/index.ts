import { defineAsyncComponent, markRaw } from 'vue';

import { HeaderIcon } from '@/shared/ui/icons';

import runtimeScript from './HeaderWithTopBar.script.js?raw';
import staticCss from './HeaderWithTopBar.scss?inline';

import type {
    UiComponentDefinition,
    UiComponentPreview,
    EditorConfiguration,
} from '../../model/types';

const ID = 'header-with-top-bar-v1';

export const headerWithTopBarPreview: UiComponentPreview = {
    id: ID,
    name: 'headerWithTopBar',
    category: 'Headers',
    previewIcon: markRaw(HeaderIcon),
};

export const headerWithTopBarDefinition: UiComponentDefinition = {
    ...headerWithTopBarPreview,
    component: markRaw(defineAsyncComponent(() => import('./HeaderWithTopBar.vue'))),
    staticCss,
    runtimeScript,
    defaultProps: {
        logoText: 'Brand',
        topBarText: 'Special Announcement! Save 20% this week!',
        ctaText: 'Shop Now',
        links: [
            { id: 1, text: 'Home', url: '#' },
            { id: 2, text: 'Products', url: '#' },
            { id: 3, text: 'About', url: '#' },
        ],
    },
    defaultStyles: {
        '--top-bar-bg-color': '#2c3e50',
        '--top-bar-text-color': '#ffffff',
        backgroundColor: '#ffffff',
        color: '#34495e',
    },
};

export const headerWithTopBarEditorConfig: EditorConfiguration = {
    componentId: ID,
    tabs: [
        {
            name: 'Content',
            target: 'props',
            fields: [
                { name: 'logoText', label: 'logoText', type: 'text' },
                { name: 'topBarText', label: 'topBarText', type: 'text' },
                { name: 'ctaText', label: 'ctaText', type: 'text' },
                { name: 'links', label: 'navLinks', type: 'link-array' },
            ],
        },
        {
            name: 'Styles',
            target: 'styles',
            fields: [
                { name: 'backgroundColor', label: 'bgColor', type: 'color' },
                { name: 'color', label: 'textColor', type: 'color' },
                {
                    name: '--top-bar-bg-color',
                    label: 'topBarBgColor',
                    type: 'color',
                },
                {
                    name: '--top-bar-text-color',
                    label: 'topBarTextColor',
                    type: 'color',
                },
            ],
        },
        {
            name: 'Scripts',
            target: 'script',
            fields: [],
        },
    ],
};