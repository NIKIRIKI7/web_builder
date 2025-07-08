import { defineAsyncComponent, markRaw } from 'vue';

import { HeaderIcon } from '@/shared/ui/icons';

import runtimeScript from './HeaderWithSecondaryNav.script.js?raw';
import staticCss from './HeaderWithSecondaryNav.scss?inline';

import type {
    UiComponentDefinition,
    UiComponentPreview,
    EditorConfiguration,
} from '../../model/types';

const ID = 'header-with-secondary-nav-v1';

export const headerWithSecondaryNavPreview: UiComponentPreview = {
    id: ID,
    name: 'headerWithSecondaryNav',
    category: 'Headers',
    previewIcon: markRaw(HeaderIcon),
};

export const headerWithSecondaryNavDefinition: UiComponentDefinition = {
    ...headerWithSecondaryNavPreview,
    component: markRaw(
        defineAsyncComponent(() => import('./HeaderWithSecondaryNav.vue')),
    ),
    staticCss,
    runtimeScript,
    defaultProps: {
        logoText: 'MegaStore',
        utilityLinks: [
            { id: 1, text: 'Help', url: '#' },
            { id: 2, text: 'Login', url: '#' },
        ],
        mainLinks: [
            { id: 1, text: 'Shop', url: '#' },
            { id: 2, text: 'New Arrivals', url: '#' },
            { id: 3, text: 'Brands', url: '#' },
        ],
    },
    defaultStyles: {
        backgroundColor: '#ffffff',
        color: '#303133',
    },
};

export const headerWithSecondaryNavEditorConfig: EditorConfiguration = {
    componentId: ID,
    tabs: [
        {
            name: 'Content',
            target: 'props',
            fields: [
                { name: 'logoText', label: 'logoText', type: 'text' },
                {
                    name: 'utilityLinks',
                    label: 'utilityNavLinks',
                    type: 'link-array',
                },
                { name: 'mainLinks', label: 'mainNavLinks', type: 'link-array' },
            ],
        },
        {
            name: 'Styles',
            target: 'styles',
            fields: [
                { name: 'backgroundColor', label: 'bgColor', type: 'color' },
                { name: 'color', label: 'textColor', type: 'color' },
            ],
        },
        {
            name: 'Scripts',
            target: 'script',
            fields: [],
        },
    ],
};