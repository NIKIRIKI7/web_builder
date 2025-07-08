import { defineAsyncComponent, markRaw } from 'vue';

import { ProductIcon } from '@/shared/ui/icons';

import staticCss from './CategoryShowcase.scss?inline';

import type {
    UiComponentDefinition,
    UiComponentPreview,
    EditorConfiguration,
} from '../../model/types';

const ID = 'category-showcase-v1';

export const categoryShowcasePreview: UiComponentPreview = {
    id: ID,
    name: 'categoryShowcase',
    category: 'Products',
    previewIcon: markRaw(ProductIcon),
};

export const categoryShowcaseDefinition: UiComponentDefinition = {
    ...categoryShowcasePreview,
    component: markRaw(defineAsyncComponent(() => import('./CategoryShowcase.vue'))),
    staticCss,
    defaultProps: {
        title: 'Shop by Category',
        categories: [
            {
                id: 1,
                name: 'Electronics',
                imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
                url: '#',
            },
            {
                id: 2,
                name: 'Apparel',
                imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
                url: '#',
            },
            {
                id: 3,
                name: 'Home Goods',
                imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
                url: '#',
            },
        ],
    },
    defaultStyles: {
        backgroundColor: '#ffffff',
        paddingTop: '60px',
        paddingBottom: '60px',
    },
};

export const categoryShowcaseEditorConfig: EditorConfiguration = {
    componentId: ID,
    tabs: [
        {
            name: 'Content',
            target: 'props',
            fields: [
                { name: 'title', label: 'title', type: 'text' },
                {
                    name: 'categories',
                    label: 'productCategories',
                    type: 'object-array',
                    itemSchema: [
                        { name: 'name', label: 'categoryName', type: 'text' },
                        { name: 'imageUrl', label: 'imageUrl', type: 'image' },
                        { name: 'url', label: 'url', type: 'text' },
                    ],
                },
            ],
        },
        {
            name: 'Styles',
            target: 'styles',
            fields: [
                { name: 'backgroundColor', label: 'bgColor', type: 'color' },
                { name: 'paddingTop', label: 'paddingTop', type: 'number', unit: 'px' },
                {
                    name: 'paddingBottom',
                    label: 'paddingBottom',
                    type: 'number',
                    unit: 'px',
                },
            ],
        },
    ],
};