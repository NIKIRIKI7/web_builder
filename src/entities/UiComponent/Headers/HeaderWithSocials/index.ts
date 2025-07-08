import { defineAsyncComponent, markRaw } from 'vue';

import { HeaderIcon } from '@/shared/ui/icons';

import runtimeScript from './HeaderWithSocials.script.js?raw';
import staticCss from './HeaderWithSocials.scss?inline';

import type {
    UiComponentDefinition,
    UiComponentPreview,
    EditorConfiguration,
} from '../../model/types';

const ID = 'header-with-socials-v1';

export const headerWithSocialsPreview: UiComponentPreview = {
    id: ID,
    name: 'headerWithSocials',
    category: 'Headers',
    previewIcon: markRaw(HeaderIcon),
};

export const headerWithSocialsDefinition: UiComponentDefinition = {
    ...headerWithSocialsPreview,
    component: markRaw(
        defineAsyncComponent(() => import('./HeaderWithSocials.vue')),
    ),
    staticCss,
    runtimeScript,
    defaultProps: {
        logoText: 'Connect',
        links: [
            { id: 1, text: 'Blog', url: '#' },
            { id: 2, text: 'Gallery', url: '#' },
            { id: 3, text: 'Contact', url: '#' },
        ],
        socials: [
            { id: 1, name: 'Facebook', url: '#' },
            { id: 2, name: 'Twitter', url: '#' },
            { id: 3, name: 'Instagram', url: '#' },
        ],
    },
    defaultStyles: {
        backgroundColor: '#ffffff',
        color: '#34495e',
        paddingTop: '16px',
        paddingBottom: '16px',
        borderBottom: '1px solid #e0e0e0',
    },
};

export const headerWithSocialsEditorConfig: EditorConfiguration = {
    componentId: ID,
    tabs: [
        {
            name: 'Content',
            target: 'props',
            fields: [
                { name: 'logoText', label: 'logoText', type: 'text' },
                { name: 'links', label: 'navLinks', type: 'link-array' },
                { name: 'socials', label: 'socialLinks', type: 'link-array' },
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