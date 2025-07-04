// C:\Users\mcniki\Documents\stormprojects\Vue\web_builder\src\entities\UiComponent\Headers\SimpleHeader\index.ts
import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentInfo, UiComponentPreview } from '../../model/types';
import { HeaderIcon } from '@/shared/ui/icons';
import staticCss from './SimpleHeader.scss?inline';

const ID = 'simple-header-v1';

export const simpleHeaderPreview: UiComponentPreview = {
    id: ID,
    name: 'Simple Header',
    category: 'Headers',
    previewIcon: markRaw(HeaderIcon),
};

export const simpleHeaderConfig: UiComponentInfo = {
    ...simpleHeaderPreview,
    component: markRaw(defineAsyncComponent(() => import('./SimpleHeader.vue'))),
    staticCss,
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
        paddingTop: '16px',
        paddingBottom: '16px',
        paddingLeft: '32px',
        paddingRight: '32px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        // ИЗМЕНЕНО: Добавлен цвет текста по умолчанию
        color: '#34495e',
    },
    editorTabs: [
        {
            name: 'Content',
            target: 'props',
            fields: [
                { name: 'logoText', label: 'Logo Text', type: 'text' },
                { name: 'ctaText', label: 'Button Text', type: 'text' },
                // ИЗМЕНЕНО: Добавлено поле для редактирования ссылок
                { name: 'links', label: 'Navigation Links', type: 'link-array' },
            ],
        },
        {
            name: 'Styles',
            target: 'styles',
            fields: [
                { name: 'backgroundColor', label: 'Background Color', type: 'color' },
                // ИЗМЕНЕНО: Добавлен контрол для смены цвета текста
                { name: 'color', label: 'Text Color', type: 'color' },
                { name: 'paddingTop', label: 'Padding Top', type: 'number', unit: 'px' },
                { name: 'paddingBottom', label: 'Padding Bottom', type: 'number', unit: 'px' },
                { name: 'paddingLeft', label: 'Padding Left', type: 'number', unit: 'px' },
                { name: 'paddingRight', label: 'Padding Right', type: 'number', unit: 'px' },
                { name: 'borderBottom', label: 'Bottom Border', type: 'text' },
            ],
        },
        {
            name: 'Scripts',
            target: 'script',
            fields: []
        }
    ],
};