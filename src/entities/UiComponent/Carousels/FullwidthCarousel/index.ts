import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { CarouselIcon } from '@/shared/ui/icons';
import staticCss from './FullwidthCarousel.scss?inline';
import runtimeScript from './FullwidthCarousel.script.js?raw';

const ID = 'fullwidth-carousel-v1';

export const fullwidthCarouselPreview: UiComponentPreview = {
  id: ID,
  name: 'fullwidthCarousel',
  category: 'Carousels',
  previewIcon: markRaw(CarouselIcon),
};

export const fullwidthCarouselDefinition: UiComponentDefinition = {
  ...fullwidthCarouselPreview,
  component: markRaw(defineAsyncComponent(() => import('./FullwidthCarousel.vue'))),
  staticCss,
  runtimeScript,
  defaultProps: {
    slides: [
      { id: 1, imageUrl: 'https://source.unsplash.com/random/1920x1080?business', title: 'Empowering Your Business', subtitle: 'Innovative solutions for the modern enterprise.', ctaText: 'Discover More', ctaUrl: '#' },
      { id: 2, imageUrl: 'https://source.unsplash.com/random/1920x1080?technology', title: 'The Future of Tech', subtitle: 'Experience the next generation of technology today.', ctaText: 'Learn How', ctaUrl: '#' },
      { id: 3, imageUrl: 'https://source.unsplash.com/random/1920x1080?creative', title: 'Unleash Creativity', subtitle: 'Tools that inspire and empower your creative process.', ctaText: 'Get Started', ctaUrl: '#' },
    ],
  },
  defaultStyles: {},
};

export const fullwidthCarouselEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        {
          name: 'slides',
          label: 'slides',
          type: 'object-array',
          itemSchema: [
            { name: 'imageUrl', label: 'imageUrl', type: 'image' },
            { name: 'title', label: 'title', type: 'text' },
            { name: 'subtitle', label: 'subtitle', type: 'textarea' },
            { name: 'ctaText', label: 'ctaText', type: 'text' },
            { name: 'ctaUrl', label: 'ctaUrl', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'Styles',
      target: 'styles',
      fields: [],
    },
    {
      name: 'Scripts',
      target: 'script',
      fields: []
    }
  ],
};