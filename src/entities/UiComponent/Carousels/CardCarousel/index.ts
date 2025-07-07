import { defineAsyncComponent, markRaw } from 'vue';

import { CarouselIcon } from '@/shared/ui/icons';

import runtimeScript from './CardCarousel.script.js?raw';
import staticCss from './CardCarousel.scss?inline';

import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';

const ID = 'card-carousel-v1';

export const cardCarouselPreview: UiComponentPreview = {
  id: ID,
  name: 'cardCarousel',
  category: 'Carousels',
  previewIcon: markRaw(CarouselIcon),
};

export const cardCarouselDefinition: UiComponentDefinition = {
  ...cardCarouselPreview,
  component: markRaw(defineAsyncComponent(() => import('./CardCarousel.vue'))),
  staticCss,
  runtimeScript,
  defaultProps: {
    cards: [
      { id: 1, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s', category: 'Technology', title: 'The Future of AI in Web Development', url: '#' },
      { id: 2, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s', category: 'Design', title: '10 Principles of Modern UI/UX', url: '#' },
      { id: 3, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s', category: 'Business', title: 'How to Scale Your Startup Effectively', url: '#' },
      { id: 4, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s', category: 'Programming', title: 'A Deep Dive into Serverless Architecture', url: '#' },
      { id: 5, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s', category: 'Marketing', title: 'Content is King: A 2025 Guide', url: '#' },
    ],
  },
  defaultStyles: {
    backgroundColor: '#f0f2f5',
    paddingTop: '60px',
    paddingBottom: '60px',
  },
};

export const cardCarouselEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        {
          name: 'cards',
          label: 'cards',
          type: 'object-array',
          itemSchema: [
            { name: 'imageUrl', label: 'imageUrl', type: 'image' },
            { name: 'category', label: 'category', type: 'text' },
            { name: 'title', label: 'title', type: 'text' },
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
    {
      name: 'Scripts',
      target: 'script',
      fields: []
    }
  ],
};