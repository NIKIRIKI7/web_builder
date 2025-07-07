import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { ProductIcon } from '@/shared/ui/icons';
import staticCss from './ProductCardWithActions.scss?inline';

const ID = 'product-card-with-actions-v1';

export const productCardWithActionsPreview: UiComponentPreview = {
  id: ID,
  name: 'productCardWithActions',
  category: 'Products',
  previewIcon: markRaw(ProductIcon),
};

export const productCardWithActionsDefinition: UiComponentDefinition = {
  ...productCardWithActionsPreview,
  component: markRaw(defineAsyncComponent(() => import('./ProductCardWithActions.vue'))),
  staticCss,
  defaultProps: {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
    name: 'Adventure Backpack',
    price: 79,
    url: '#',
    ctaPrimaryText: 'Add to Cart',
    ctaSecondaryText: 'Quick View',
  },
  defaultStyles: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
};

export const productCardWithActionsEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'imageUrl', label: 'imageUrl', type: 'image' },
        { name: 'name', label: 'productName', type: 'text' },
        { name: 'price', label: 'price', type: 'number' },
        { name: 'url', label: 'url', type: 'text' },
        { name: 'ctaPrimaryText', label: 'ctaPrimaryText', type: 'text' },
        { name: 'ctaSecondaryText', label: 'ctaSecondaryText', type: 'text' },
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