import { defineAsyncComponent, markRaw } from 'vue';

import { CarouselIcon } from '@/shared/ui/icons';

import runtimeScript from './TestimonialsCarousel.script.js?raw';
import staticCss from './TestimonialsCarousel.scss?inline';

import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';

const ID = 'testimonials-carousel-v1';

export const testimonialsCarouselPreview: UiComponentPreview = {
  id: ID,
  name: 'testimonialsCarousel',
  category: 'Carousels',
  previewIcon: markRaw(CarouselIcon),
};

export const testimonialsCarouselDefinition: UiComponentDefinition = {
  ...testimonialsCarouselPreview,
  component: markRaw(defineAsyncComponent(() => import('./TestimonialsCarousel.vue'))),
  staticCss,
  runtimeScript,
  defaultProps: {
    testimonials: [
      { id: 1, avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s', quote: 'This product has completely changed the way we work. It\'s intuitive, powerful, and the support is outstanding.', authorName: 'Jane Doe', authorTitle: 'CEO, Innovate Inc.' },
      { id: 2, avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s', quote: 'A fantastic tool that streamlined our entire workflow. I can\'t imagine going back to the old way.', authorName: 'John Smith', authorTitle: 'Project Manager, Tech Solutions' },
      { id: 3, avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s', quote: 'The best investment we\'ve made this year. The ROI was almost immediate. Highly recommended!', authorName: 'Emily White', authorTitle: 'Marketing Director, Growth Co.' },
    ],
  },
  defaultStyles: {
    backgroundColor: '#ffffff',
    paddingTop: '60px',
    paddingBottom: '60px',
  },
};

export const testimonialsCarouselEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        {
          name: 'testimonials',
          label: 'testimonials',
          type: 'object-array',
          itemSchema: [
            { name: 'avatarUrl', label: 'imageUrl', type: 'image' },
            { name: 'quote', label: 'quote', type: 'textarea' },
            { name: 'authorName', label: 'authorName', type: 'text' },
            { name: 'authorTitle', label: 'authorTitle', type: 'text' },
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