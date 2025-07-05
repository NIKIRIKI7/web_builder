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
      { id: 1, imageUrl: 'https://source.unsplash.com/random/400x400?product,shoes', name: 'Running Shoes', originalPrice: 120, salePrice: 89, url: '#' },
      { id: 2, imageUrl: 'https://source.unsplash.com/random/400x400?product,camera', name: 'DSLR Camera Kit', originalPrice: 899, salePrice: 649, url: '#' },
      { id: 3, imageUrl: 'https://source.unsplash.com/random/400x400?product,jeans', name: 'Designer Jeans', originalPrice: 95, salePrice: 49, url: '#' },
      { id: 4, imageUrl: 'https://source.unsplash.com/random/400x400?product,headphone,white', name: 'Wireless Headphones', originalPrice: 199, salePrice: 149, url: '#' },
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
