import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { ProductIcon } from '@/shared/ui/icons';
import staticCss from './HorizontalProductCard.scss?inline';

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
    imageUrl: 'https://source.unsplash.com/random/400x400?product,laptop',
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
