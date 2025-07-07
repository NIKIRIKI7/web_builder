import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { ProductIcon } from '@/shared/ui/icons';
import staticCss from './SalesGrid.scss?inline';

const ID = 'sales-grid-v1';

export const salesGridPreview: UiComponentPreview = {
  id: ID,
  name: 'salesGrid',
  category: 'Products',
  previewIcon: markRaw(ProductIcon),
};

export const salesGridDefinition: UiComponentDefinition = {
  ...salesGridPreview,
  component: markRaw(defineAsyncComponent(() => import('./SalesGrid.vue'))),
  staticCss,
  defaultProps: {
    title: 'Hot Deals!',
    products: [
      { id: 1, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s', name: 'Running Shoes', originalPrice: 120, salePrice: 89, url: '#' },
      { id: 2, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s', name: 'DSLR Camera Kit', originalPrice: 899, salePrice: 649, url: '#' },
      { id: 3, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s', name: 'Designer Jeans', originalPrice: 95, salePrice: 49, url: '#' },
      { id: 4, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s', name: 'Wireless Headphones', originalPrice: 199, salePrice: 149, url: '#' },
    ],
  },
  defaultStyles: {
    backgroundColor: '#ffffff',
    paddingTop: '60px',
    paddingBottom: '60px',
  },
};

export const salesGridEditorConfig: EditorConfiguration = {
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
            { name: 'originalPrice', label: 'originalPrice', type: 'number' },
            { name: 'salePrice', label: 'salePrice', type: 'number' },
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
        { name: 'paddingBottom', label: 'paddingBottom', type: 'number', unit: 'px' },
      ],
    },
  ],
};