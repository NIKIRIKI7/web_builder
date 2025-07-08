import { defineAsyncComponent, markRaw } from 'vue';

import { HeaderIcon } from '@/shared/ui/icons';

import runtimeScript from './MinimalistHeader.script.js?raw';
import staticCss from './MinimalistHeader.scss?inline';

import type {
    UiComponentDefinition,
    UiComponentPreview,
    EditorConfiguration,
} from '../../model/types';

const ID = 'minimalist-header-v1';

export const minimalistHeaderPreview: UiComponentPreview = {
    id: ID,
    name: 'minimalistHeader',
    category: 'Headers',
    previewIcon: markRaw(HeaderIcon),
};

export const minimalistHeaderDefinition: UiComponentDefinition = {
    ...minimalistHeaderPreview,
    component: markRaw(
        defineAsyncComponent(() => import('./MinimalistHeader.vue')),
    ),
    staticCss,
    runtimeScript,
    defaultProps: {
        logoText: 'MINIMAL',
        links: [
            { id: 1, text: 'Work', url: '#' },
            { id: 2, text: 'Journal', url: '#' },
            { id: 3, text: 'About', url: '#' },
        ],
    },
    defaultStyles: {
        backgroundColor: 'transparent',
        color: '#303133',
        paddingTop: '20px',
        paddingBottom: '20px',
    },
};

export const minimalistHeaderEditorConfig: EditorConfiguration = {
    componentId: ID,
    tabs: [
        {
            name: 'Content',
            target: 'props',
            fields: [
                { name: 'logoText', label: 'logoText', type: 'text' },
                { name: 'links', label: 'navLinks', type: 'link-array' },
            ],
        },
        {
            name: 'Styles',
            target: 'styles',
            fields: [
                { name: 'backgroundColor', label: 'bgColor', type: 'color' },
                { name: 'color', label: 'textColor', type: 'color' },
                { name: 'paddingTop', label: 'paddingTop', type: 'number', unit: 'px' },
                {
                    name: 'paddingBottom',
                    label: 'paddingBottom',
                    type: 'number',
                    unit: 'px',
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