import { defineAsyncComponent, markRaw } from 'vue';

import { HeaderIcon } from '@/shared/ui/icons';

import runtimeScript from './SplitHeader.script.js?raw';
import staticCss from './SplitHeader.scss?inline';

import type {
    UiComponentDefinition,
    UiComponentPreview,
    EditorConfiguration,
} from '../../model/types';
const ID = 'split-header-v1';
export const splitHeaderPreview: UiComponentPreview = {
    id: ID,
    name: 'splitHeader',
    category: 'Headers',
    previewIcon: markRaw(HeaderIcon),
};
export const splitHeaderDefinition: UiComponentDefinition = {
    ...splitHeaderPreview,
    component: markRaw(defineAsyncComponent(() => import('./SplitHeader.vue'))),
    staticCss,
    runtimeScript,
    defaultProps: {
        logoText: 'Split Co.',
        ctaPrimaryText: 'Get Started',
        ctaSecondaryText: 'Log In',
        links: [
            { id: 1, text: 'Features', url: '#' },
            { id: 2, text: 'Pricing', url: '#' },
            { id: 3, text: 'Customers', url: '#' },
        ],
    },
    defaultStyles: {
        backgroundColor: '#ffffff',
        color: '#303133',
        borderBottom: '1px solid #e0e0e0',
    },
};
export const splitHeaderEditorConfig: EditorConfiguration = {
    componentId: ID,
    tabs: [
        {
            name: 'Content',
            target: 'props',
            fields: [
                { name: 'logoText', label: 'logoText', type: 'text' },
                { name: 'ctaPrimaryText', label: 'ctaPrimaryText', type: 'text' },
                { name: 'ctaSecondaryText', label: 'ctaSecondaryText', type: 'text' },
                { name: 'links', label: 'navLinks', type: 'link-array' },
            ],
        },
        {
            name: 'Styles',
            target: 'styles',
            fields: [
                { name: 'backgroundColor', label: 'bgColor', type: 'color' },
                { name: 'color', label: 'textColor', type: 'color' },
                { name: 'borderBottom', label: 'borderBottom', type: 'text' },
            ],
        },
        {
            name: 'Scripts',
            target: 'script',
            fields: [],
        },
    ],
};