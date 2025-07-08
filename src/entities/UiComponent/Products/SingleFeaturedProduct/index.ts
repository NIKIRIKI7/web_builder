import { defineAsyncComponent, markRaw } from 'vue';

import { ProductIcon } from '@/shared/ui/icons';

import staticCss from './SingleFeaturedProduct.scss?inline';

import type {
    UiComponentDefinition,
    UiComponentPreview,
    EditorConfiguration,
} from '../../model/types';

const ID = 'single-featured-product-v1';

export const singleFeaturedProductPreview: UiComponentPreview = {
    id: ID,
    name: 'singleFeaturedProduct',
    category: 'Products',
    previewIcon: markRaw(ProductIcon),
};

export const singleFeaturedProductDefinition: UiComponentDefinition = {
    ...singleFeaturedProductPreview,
    component: markRaw(
        defineAsyncComponent(() => import('./SingleFeaturedProduct.vue')),
    ),
    staticCss,
    defaultProps: {
        imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
        category: 'Audio',
        name: 'Noise-Cancelling Headphones',
        description:
            'Immerse yourself in sound with our industry-leading noise-cancelling headphones. Built for comfort and engineered for an exceptional audio experience.',
        features: [
            { id: 1, text: 'Up to 30 hours of battery life' },
            { id: 2, text: 'Multipoint connection' },
            { id: 3, text: 'Crystal clear hands-free calling' },
        ],
        price: '$349.99',
        ctaText: 'Add to Cart',
        ctaUrl: '#',
    },
    defaultStyles: {
        backgroundColor: '#ffffff',
        color: '#303133',
        paddingTop: '80px',
        paddingBottom: '80px',
    },
};

export const singleFeaturedProductEditorConfig: EditorConfiguration = {
    componentId: ID,
    tabs: [
        {
            name: 'Content',
            target: 'props',
            fields: [
                { name: 'imageUrl', label: 'imageUrl', type: 'image' },
                { name: 'category', label: 'category', type: 'text' },
                { name: 'name', label: 'productName', type: 'text' },
                { name: 'description', label: 'description', type: 'textarea' },
                { name: 'price', label: 'priceAsText', type: 'text' },
                { name: 'ctaText', label: 'ctaText', type: 'text' },
                { name: 'ctaUrl', label: 'url', type: 'text' },
                {
                    name: 'features',
                    label: 'productFeatures',
                    type: 'object-array',
                    itemSchema: [{ name: 'text', label: 'featureText', type: 'text' }],
                },
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
    ],
};