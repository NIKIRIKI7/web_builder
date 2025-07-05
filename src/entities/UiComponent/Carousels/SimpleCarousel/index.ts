import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { CarouselIcon } from '@/shared/ui/icons';
import staticCss from './SimpleCarousel.scss?inline';

const ID = 'simple-carousel-v1';

export const simpleCarouselPreview: UiComponentPreview = {
  id: ID,
  name: 'simpleCarousel',
  category: 'Carousels',
  previewIcon: markRaw(CarouselIcon),
};

export const simpleCarouselDefinition: UiComponentDefinition = {
  ...simpleCarouselPreview,
  component: markRaw(defineAsyncComponent(() => import('./SimpleCarousel.vue'))),
  staticCss,
  clientScript: `
    const track = rootElement.querySelector('.simple-carousel__track');
    const slides = rootElement.querySelectorAll('.simple-carousel__slide');
    const prevBtn = rootElement.querySelector('.simple-carousel__btn--prev');
    const nextBtn = rootElement.querySelector('.simple-carousel__btn--next');
    let currentIndex = 0;
    const slideCount = slides.length;

    function goToSlide(index) {
      if (index < 0 || index >= slideCount) return;
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      currentIndex = index;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + slideCount) % slideCount;
        goToSlide(newIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % slideCount;
        goToSlide(newIndex);
      });
    }
  `,
  defaultProps: {
    height: '400px',
    slides: [
      { id: 1, imageUrl: 'https://source.unsplash.com/random/1200x400?landscape,nature', altText: 'Nature Landscape' },
      { id: 2, imageUrl: 'https://source.unsplash.com/random/1200x400?landscape,city', altText: 'City Landscape' },
      { id: 3, imageUrl: 'https://source.unsplash.com/random/1200x400?landscape,ocean', altText: 'Ocean Landscape' },
    ],
  },
  defaultStyles: {
    paddingTop: '0px',
    paddingBottom: '0px',
  },
};

export const simpleCarouselEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'height', label: 'carouselHeight', type: 'text' },
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
        { name: 'paddingTop', label: 'paddingTop', type: 'number', unit: 'px' },
        { name: 'paddingBottom', label: 'paddingBottom', type: 'number', unit: 'px' },
      ],
    },
  ],
};
