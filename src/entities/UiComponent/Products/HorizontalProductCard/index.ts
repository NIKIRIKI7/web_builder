import { defineAsyncComponent, markRaw } from 'vue';

import { ProductIcon } from '@/shared/ui/icons';

import staticCss from './HorizontalProductCard.scss?inline';

import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';

const ID = 'horizontal-product-card-v1';

export const horizontalProductCardPreview: UiComponentPreview = {
  id: ID,
  name: 'horizontalProductCard',
  category: 'Products',
  previewIcon: markRaw(ProductIcon),
};

export const horizontalProductCardDefinition: UiComponentDefinition = {
  ...horizontalProductCardPreview,
  component: markRaw(defineAsyncComponent(() => import('./HorizontalProductCard.vue'))),
  staticCss,
  defaultProps: {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
    category: 'Electronics',
    name: 'UltraBook Pro X1',
    description: 'The new generation of performance in a sleek, lightweight package. Perfect for professionals on the go.',
    price: 1299,
    url: '#',
  },
  defaultStyles: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
};

export const horizontalProductCardEditorConfig: EditorConfiguration = {
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
        { name: 'price', label: 'price', type: 'number' },
        { name: 'url', label: 'url', type: 'text' },
      ],
    },
    {
      name: 'Styles',
      target: 'styles',
      fields: [
        { name: 'paddingTop', label: 'paddingTop', type: 'number', unit: 'px' },
        { name: 'paddingBottom', label: 'paddingBottom', type: 'number', unit: 'px' },
      ],
    },
  ],
};