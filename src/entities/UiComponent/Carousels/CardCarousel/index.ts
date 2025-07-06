import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { CarouselIcon } from '@/shared/ui/icons';
import staticCss from './CardCarousel.scss?inline';
import runtimeScript from './CardCarousel.script.js?raw';

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
      { id: 1, imageUrl: 'https://source.unsplash.com/random/400x300?article,tech', category: 'Technology', title: 'The Future of AI in Web Development', url: '#' },
      { id: 2, imageUrl: 'https://source.unsplash.com/random/400x300?article,design', category: 'Design', title: '10 Principles of Modern UI/UX', url: '#' },
      { id: 3, imageUrl: 'https://source.unsplash.com/random/400x300?article,business', category: 'Business', title: 'How to Scale Your Startup Effectively', url: '#' },
      { id: 4, imageUrl: 'https://source.unsplash.com/random/400x300?article,code', category: 'Programming', title: 'A Deep Dive into Serverless Architecture', url: '#' },
      { id: 5, imageUrl: 'https://source.unsplash.com/random/400x300?article,marketing', category: 'Marketing', title: 'Content is King: A 2025 Guide', url: '#' },
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