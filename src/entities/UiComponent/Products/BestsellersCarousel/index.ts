import { defineAsyncComponent, markRaw } from 'vue';

import { ProductIcon } from '@/shared/ui/icons';

import runtimeScript from './BestsellersCarousel.script.js?raw';
import staticCss from './BestsellersCarousel.scss?inline';

import type {
    UiComponentDefinition,
    UiComponentPreview,
    EditorConfiguration,
} from '../../model/types';

const ID = 'bestsellers-carousel-v1';

export const bestsellersCarouselPreview: UiComponentPreview = {
    id: ID,
    name: 'bestsellersCarousel',
    category: 'Products',
    previewIcon: markRaw(ProductIcon),
};

export const bestsellersCarouselDefinition: UiComponentDefinition = {
    ...bestsellersCarouselPreview,
    component: markRaw(
        defineAsyncComponent(() => import('./BestsellersCarousel.vue')),
    ),
    staticCss,
    runtimeScript,
    defaultProps: {
        title: 'Our Bestsellers',
        products: [
            {
                id: 1,
                imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
                name: 'Classic Leather Watch',
                price: 189,
                url: '#',
            },
            {
                id: 2,
                imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
                name: 'Modern Desk Lamp',
                price: 79,
                url: '#',
            },
            {
                id: 3,
                imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
                name: 'Ceramic Coffee Mug',
                price: 25,
                url: '#',
            },
            {
                id: 4,
                imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
                name: 'Scented Soy Candle',
                price: 35,
                url: '#',
            },
            {
                id: 5,
                imageUrl:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
                name: 'Wool Throw Blanket',
                price: 120,
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

export const bestsellersCarouselEditorConfig: EditorConfiguration = {
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
        {
            name: 'Scripts',
            target: 'script',
            fields: [],
        },
    ],
};