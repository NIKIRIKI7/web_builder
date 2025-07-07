import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { HeroIcon } from '@/shared/ui/icons';
import staticCss from './EcommerceHero.scss?inline';

const ID = 'ecommerce-hero-v1';

export const ecommerceHeroPreview: UiComponentPreview = {
  id: ID,
  name: 'ecommerceHero',
  category: 'Heros',
  previewIcon: markRaw(HeroIcon),
};

export const ecommerceHeroDefinition: UiComponentDefinition = {
  ...ecommerceHeroPreview,
  component: markRaw(defineAsyncComponent(() => import('./EcommerceHero.vue'))),
  staticCss,
  defaultProps: {
    mainText: 'NEW',
    subText: 'ARRIVALS',
    ctaText: 'GO SHOPPING',
    ctaUrl: '#',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
  },
  defaultStyles: {
    backgroundColor: '#f9f9f9',
    paddingTop: '60px',
    paddingBottom: '60px',
  },
};

export const ecommerceHeroEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'mainText', label: 'mainText', type: 'text' },
        { name: 'subText', label: 'subText', type: 'text' },
        { name: 'ctaText', label: 'ctaText', type: 'text' },
        { name: 'ctaUrl', label: 'ctaUrl', type: 'text' },
        { name: 'imageUrl', label: 'imageUrl', type: 'image' },
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