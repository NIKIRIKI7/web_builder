import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { CarouselIcon } from '@/shared/ui/icons';
import staticCss from './ThumbnailsCarousel.scss?inline';
import runtimeScript from './ThumbnailsCarousel.script.js?raw';

const ID = 'thumbnails-carousel-v1';

export const thumbnailsCarouselPreview: UiComponentPreview = {
  id: ID,
  name: 'thumbnailsCarousel',
  category: 'Carousels',
  previewIcon: markRaw(CarouselIcon),
};

export const thumbnailsCarouselDefinition: UiComponentDefinition = {
  ...thumbnailsCarouselPreview,
  component: markRaw(defineAsyncComponent(() => import('./ThumbnailsCarousel.vue'))),
  staticCss,
  runtimeScript,
  defaultProps: {
    slides: [
      { id: 1, imageUrl: 'https://source.unsplash.com/random/800x450?product,watch', altText: 'Watch' },
      { id: 2, imageUrl: 'https://source.unsplash.com/random/800x450?product,shoes', altText: 'Shoes' },
      { id: 3, imageUrl: 'https://source.unsplash.com/random/800x450?product,camera', altText: 'Camera' },
      { id: 4, imageUrl: 'https://source.unsplash.com/random/800x450?product,headphone', altText: 'Headphone' },
    ],
  },
  defaultStyles: {
    backgroundColor: '#ffffff',
    paddingTop: '40px',
    paddingBottom: '40px',
  },
};

export const thumbnailsCarouselEditorConfig: EditorConfiguration = {
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
            { name: 'altText', label: 'altText', type: 'text' },
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