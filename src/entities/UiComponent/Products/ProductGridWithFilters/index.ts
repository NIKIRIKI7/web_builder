import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { ProductIcon } from '@/shared/ui/icons';
import staticCss from './ProductGridWithFilters.scss?inline';
import runtimeScript from './ProductGridWithFilters.script.js?raw';

const ID = 'product-grid-with-filters-v1';

export const productGridWithFiltersPreview: UiComponentPreview = {
  id: ID,
  name: 'productGridWithFilters',
  category: 'Products',
  previewIcon: markRaw(ProductIcon),
};

export const productGridWithFiltersDefinition: UiComponentDefinition = {
  ...productGridWithFiltersPreview,
  component: markRaw(defineAsyncComponent(() => import('./ProductGridWithFilters.vue'))),
  staticCss,
  runtimeScript,
  defaultProps: {
    title: 'Our Products',
    filters: [
      { key: 'all', label: 'All' },
      { key: 'tech', label: 'Technology' },
      { key: 'apparel', label: 'Apparel' },
      { key: 'accessories', label: 'Accessories' },
    ],
    products: [
      { id: 1, imageUrl: 'https://source.unsplash.com/random/400x400?product,laptop', name: 'Laptop Pro', price: 1499, category: 'tech' },
      { id: 2, imageUrl: 'https://source.unsplash.com/random/400x400?product,tshirt', name: 'Classic T-Shirt', price: 25, category: 'apparel' },
      { id: 3, imageUrl: 'https://source.unsplash.com/random/400x400?product,mouse', name: 'Gaming Mouse', price: 89, category: 'tech' },
      { id: 4, imageUrl: 'https://source.unsplash.com/random/400x400?product,sunglasses', name: 'Aviator Sunglasses', price: 120, category: 'accessories' },
      { id: 5, imageUrl: 'https://source.unsplash.com/random/400x400?product,hoodie', name: 'Cozy Hoodie', price: 65, category: 'apparel' },
      { id: 6, imageUrl: 'https://source.unsplash.com/random/400x400?product,watch', name: 'Smart Watch', price: 299, category: 'accessories' },
    ],
  },
  defaultStyles: {
    backgroundColor: '#ffffff',
    paddingTop: '80px',
    paddingBottom: '80px',
  },
};

export const productGridWithFiltersEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'title', label: 'title', type: 'text' },
        {
          name: 'filters', label: 'filters', type: 'object-array',
          itemSchema: [
            { name: 'key', label: 'filterKey', type: 'text' },
            { name: 'label', label: 'filterLabel', type: 'text' },
          ]
        },
        {
          name: 'products', label: 'products', type: 'object-array',
          itemSchema: [
            { name: 'imageUrl', label: 'imageUrl', type: 'image' },
            { name: 'name', label: 'productName', type: 'text' },
            { name: 'price', label: 'price', type: 'number' },
            { name: 'category', label: 'filterKey', type: 'text' },
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
        { name: 'paddingBottom', label: 'paddingBottom', type: 'number', unit: 'px' },
      ],
    },
    {
      name: 'Scripts',
      target: 'script',
      fields: []
    }
  ],
};