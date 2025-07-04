import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentInfo } from '../model/types';
import { FooterIcon } from '@/shared/ui/icons';

const SimpleFooterLoader = () => import('../ui/SimpleFooter/SimpleFooter.vue');

export const simpleFooterConfig: UiComponentInfo = {
    id: 'simple-footer-v1',
    name: 'Simple Footer',
    category: 'Footers',
    component: markRaw(defineAsyncComponent(SimpleFooterLoader)),
    previewIcon: markRaw(FooterIcon),
    defaultProps: {
        copyrightText: `© ${new Date().getFullYear()} Web Builder Inc. All rights reserved.`,
    },
    defaultStyles: {
        backgroundColor: '#2c3e50',
    },
    editorTabs: [
        {
            name: 'Content',
            target: 'props',
            fields: [
                { name: 'copyrightText', label: 'Copyright Text', type: 'textarea' },
            ],
        },
        {
            name: 'Styles',
            target: 'styles',
            fields: [
                { name: 'backgroundColor', label: 'Background Color', type: 'color' },
            ],
        },
    ],
};