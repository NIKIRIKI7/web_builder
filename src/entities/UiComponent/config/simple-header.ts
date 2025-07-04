import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentInfo } from '../model/types';
import { HeaderIcon } from '@/shared/ui/icons';

const SimpleHeaderLoader = () => import('../ui/SimpleHeader/SimpleHeader.vue');

export const simpleHeaderConfig: UiComponentInfo = {
    id: 'simple-header-v1',
    name: 'Simple Header',
    category: 'Headers',
    component: markRaw(defineAsyncComponent(SimpleHeaderLoader)),
    previewIcon: markRaw(HeaderIcon),
    defaultProps: {
        logoText: 'MyWebsite',
        ctaText: 'Get Started',
        links: [
            { id: 1, text: 'Home', url: '#' },
            { id: 2, text: 'About', url: '#' },
            { id: 3, text: 'Contact', url: '#' },
        ],
    },
    defaultStyles: {
        paddingTop: '0px',
        paddingBottom: '0px',
        backgroundColor: '#ffffff',
    },
    editorTabs: [
        {
            name: 'Content',
            target: 'props',
            fields: [
                { name: 'logoText', label: 'Logo Text', type: 'text' },
                { name: 'ctaText', label: 'Button Text', type: 'text' },
            ],
        },
        {
            name: 'Styles',
            target: 'styles',
            fields: [
                { name: 'backgroundColor', label: 'Background Color', type: 'color' },
                { name: 'paddingTop', label: 'Padding Top', type: 'number' },
                { name: 'paddingBottom', label: 'Padding Bottom', type: 'number' },
            ],
        },
    ],
};