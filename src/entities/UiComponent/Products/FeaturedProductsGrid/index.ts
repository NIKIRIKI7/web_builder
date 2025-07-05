import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { ProductIcon } from '@/shared/ui/icons';
import staticCss from './FeaturedProductsGrid.scss?inline';

const ID = 'featured-products-grid-v1';

export const featuredProductsGridPreview: UiComponentPreview = {
  id: ID,
  name: 'featuredProductsGrid',
  category: 'Products',
  previewIcon: markRaw(ProductIcon),
};

export const featuredProductsGridDefinition: UiComponentDefinition = {
  ...featuredProductsGridPreview,
  component: markRaw(defineAsyncComponent(() => import('./FeaturedProductsGrid.vue'))),
  staticCss,
  defaultProps: {
    title: 'FEATURED PRODUCT',
    viewAllText: 'View All',
    viewAllUrl: '#',
    products: [
      { id: 1, imageUrl: 'https://i.ibb.co/6y40fb6/headphone.png', name: 'BLACK HEADPHONE ONE', price: 29, badgeText: 'NEW', url: '#' },
      { id: 2, imageUrl: 'https://i.ibb.co/h9W9N6w/speaker.png', name: 'SPEAKER BEATS PILL', price: 199, badgeText: 'NEW', url: '#' },
      { id: 3, imageUrl: 'https://i.ibb.co/yQzC7L1/airpods.png', name: 'APPLE AIR PODS', price: 122, badgeText: 'NEW', url: '#' },
      { id: 4, imageUrl: 'https://i.ibb.co/yBw41z1/smartwatch.png', name: 'SMART WATCH F9 NEGRO', price: 99, badgeText: 'NEW', url: '#' },
    ]
  },
  defaultStyles: {
    backgroundColor: '#ffffff',
    paddingTop: '80px',
    paddingBottom: '80px',
  },
};

export const featuredProductsGridEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'title', label: 'title', type: 'text' },
        { name: 'viewAllText', label: 'viewAllText', type: 'text' },
        { name: 'viewAllUrl', label: 'url', type: 'text' },
        {
          name: 'products',
          label: 'products',
          type: 'object-array',
          itemSchema: [
            { name: 'imageUrl', label: 'imageUrl', type: 'image' },
            { name: 'name', label: 'productName', type: 'text' },
            { name: 'price', label: 'price', type: 'number' },
            { name: 'badgeText', label: 'badgeText', type: 'text' },
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
