import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentInfo, UiComponentPreview } from '../../model/types';
import { FooterIcon } from '@/shared/ui/icons';
import staticCss from './SimpleFooter.scss?inline';

const ID = 'simple-footer-v1';

export const simpleFooterPreview: UiComponentPreview = {
    id: ID,
    name: 'Simple Footer',
    category: 'Footers',
    previewIcon: markRaw(FooterIcon),
};

export const simpleFooterConfig: UiComponentInfo = {
    ...simpleFooterPreview,
    component: markRaw(defineAsyncComponent(() => import('./SimpleFooter.vue'))),
    staticCss,
    defaultProps: {
        copyrightText: `© ${new Date().getFullYear()} Web Builder Inc. All rights reserved.`,
        links: [
            { id: 1, text: 'Privacy Policy', url: '#' },
            { id: 2, text: 'Terms of Service', url: '#' },
            { id: 3, text: 'Contact Us', url: '#' },
        ]
    },
    defaultStyles: {
        backgroundColor: '#2c3e50',
        paddingTop: '32px',
        paddingBottom: '32px',
        color: '#ecf0f1',
    },
    editorTabs: [
        {
            name: 'Content',
            target: 'props',
            fields: [
                { name: 'copyrightText', label: 'Copyright Text', type: 'textarea' },
                { name: 'links', label: 'Footer Links', type: 'link-array' },
            ],
        },
        {
            name: 'Styles',
            target: 'styles',
            fields: [
                { name: 'backgroundColor', label: 'Background Color', type: 'color' },
                { name: 'color', label: 'Text Color', type: 'color' },
                { name: 'paddingTop', label: 'Padding Top', type: 'number', unit: 'px' },
                { name: 'paddingBottom', label: 'Padding Bottom', type: 'number', unit: 'px' },
            ],
        },
    ],
};