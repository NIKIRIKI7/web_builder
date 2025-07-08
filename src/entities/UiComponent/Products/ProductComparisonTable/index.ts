import { defineAsyncComponent, markRaw } from 'vue';

import { ProductIcon } from '@/shared/ui/icons';

import runtimeScript from './ProductComparisonTable.script.js?raw';
import staticCss from './ProductComparisonTable.scss?inline';

import type {
    UiComponentDefinition,
    UiComponentPreview,
    EditorConfiguration,
} from '../../model/types';

const ID = 'product-comparison-table-v1';

export const productComparisonTablePreview: UiComponentPreview = {
    id: ID,
    name: 'productComparisonTable',
    category: 'Products',
    previewIcon: markRaw(ProductIcon),
};

export const productComparisonTableDefinition: UiComponentDefinition = {
    ...productComparisonTablePreview,
    component: markRaw(
        defineAsyncComponent(() => import('./ProductComparisonTable.vue')),
    ),
    staticCss,
    runtimeScript,
    defaultProps: {
        title: 'Compare Our Models',
        features: [
            { id: 1, name: 'Screen Size' },
            { id: 2, name: 'Battery Life' },
            { id: 3, name: 'Water Resistant' },
        ],
        products: [
            {
                id: 1,
                name: 'Pro Model',
                imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
                price: '$999',
                url: '#',
                features: [
                    { key: 'Screen Size', value: '6.1 inches' },
                    { key: 'Battery Life', value: '20 hours' },
                    { key: 'Water Resistant', value: true },
                ],
            },
            {
                id: 2,
                name: 'Max Model',
                imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
                price: '$1199',
                url: '#',
                features: [
                    { key: 'Screen Size', value: '6.7 inches' },
                    { key: 'Battery Life', value: '28 hours' },
                    { key: 'Water Resistant', value: true },
                ],
            },
            {
                id: 3,
                name: 'Basic Model',
                imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
                price: '$699',
                url: '#',
                features: [
                    { key: 'Screen Size', value: '5.4 inches' },
                    { key: 'Battery Life', value: '15 hours' },
                    { key: 'Water Resistant', value: false },
                ],
            },
        ],
    },
    defaultStyles: {
        backgroundColor: '#ffffff',
        paddingTop: '80px',
        paddingBottom: '80px',
    },
};

export const productComparisonTableEditorConfig: EditorConfiguration = {
    componentId: ID,
    tabs: [
        {
            name: 'Content',
            target: 'props',
            fields: [
                { name: 'title', label: 'title', type: 'text' },
                {
                    name: 'features',
                    label: 'features',
                    type: 'object-array',
                    itemSchema: [{ name: 'name', label: 'featureName', type: 'text' }],
                },
                {
                    name: 'products',
                    label: 'productsToCompare',
                    type: 'object-array',
                    itemSchema: [
                        { name: 'name', label: 'productName', type: 'text' },
                        { name: 'imageUrl', label: 'imageUrl', type: 'image' },
                        { name: 'price', label: 'priceAsText', type: 'text' },
                        { name: 'url', label: 'url', type: 'text' },
                        {
                            name: 'features',
                            label: 'featureValues',
                            type: 'object-array',
                            itemSchema: [
                                { name: 'key', label: 'featureName', type: 'text' },
                                { name: 'value', label: 'featureValue', type: 'text' },
                            ],
                        },
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