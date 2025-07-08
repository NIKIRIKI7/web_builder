import { defineAsyncComponent, markRaw } from 'vue';

import { ProductIcon } from '@/shared/ui/icons';

import staticCss from './ProductListView.scss?inline';

import type {
    UiComponentDefinition,
    UiComponentPreview,
    EditorConfiguration,
} from '../../model/types';

const ID = 'product-list-view-v1';

export const productListViewPreview: UiComponentPreview = {
    id: ID,
    name: 'productListView',
    category: 'Products',
    previewIcon: markRaw(ProductIcon),
};

export const productListViewDefinition: UiComponentDefinition = {
    ...productListViewPreview,
    component: markRaw(defineAsyncComponent(() => import('./ProductListView.vue'))),
    staticCss,
    defaultProps: {
        title: 'All Products',
        products: [
            {
                id: 1,
                imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
                name: 'Wireless Mouse',
                description:
                    'Ergonomic wireless mouse with long battery life and silent clicks.',
                price: 49,
                url: '#',
            },
            {
                id: 2,
                imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
                name: 'Mechanical Keyboard',
                description: 'RGB backlit mechanical keyboard with tactile blue switches.',
                price: 119,
                url: '#',
            },
            {
                id: 3,
                imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
                name: '4K Webcam',
                description: 'Crystal clear 4K webcam with auto-focus and a built-in mic.',
                price: 89,
                url: '#',
            },
        ],
    },
    defaultStyles: {
        backgroundColor: '#f8f9fa',
        paddingTop: '60px',
        paddingBottom: '60px',
    },
};

export const productListViewEditorConfig: EditorConfiguration = {
    componentId: ID,
    tabs: [
        {
            name: 'Content',
            target: 'props',
            fields: [
                { name: 'title', label: 'title', type: 'text' },
                {
                    name: 'products',
                    label: 'products',
                    type: 'object-array',
                    itemSchema: [
                        { name: 'imageUrl', label: 'imageUrl', type: 'image' },
                        { name: 'name', label: 'productName', type: 'text' },
                        { name: 'description', label: 'description', type: 'textarea' },
                        { name: 'price', label: 'price', type: 'number' },
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