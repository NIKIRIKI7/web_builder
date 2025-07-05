import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { CarouselIcon } from '@/shared/ui/icons';
import staticCss from './ThumbnailsCarousel.scss?inline';

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
  clientScript: `
    const mainImage = rootElement.querySelector('.thumbnails-carousel__main-image');
    const thumbButtons = rootElement.querySelectorAll('.thumbnails-carousel__thumb-btn');
    const slidesData = api.getProp('slides');
    let currentActiveButton = thumbButtons[0];

    if (currentActiveButton) {
      currentActiveButton.classList.add('is-active');
    }

    thumbButtons.forEach(button => {
      button.addEventListener('click', () => {
        const index = parseInt(button.dataset.index, 10);
        if (mainImage && slidesData[index]) {
          mainImage.style.opacity = '0';
          setTimeout(() => {
            mainImage.src = slidesData[index].imageUrl;
            mainImage.alt = slidesData[index].altText;
            mainImage.style.opacity = '1';
          }, 200);
        }
        if (currentActiveButton) {
          currentActiveButton.classList.remove('is-active');
        }
        button.classList.add('is-active');
        currentActiveButton = button;
      });
    });
  `,
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
  ],
};
