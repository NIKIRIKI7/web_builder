import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { CarouselIcon } from '@/shared/ui/icons';
import staticCss from './CardCarousel.scss?inline';

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
  clientScript: `
    const viewport = rootElement.querySelector('.card-carousel__viewport');
    const track = rootElement.querySelector('.card-carousel__track');
    const slides = rootElement.querySelectorAll('.card-carousel__slide');
    const prevBtn = rootElement.querySelector('.card-carousel__btn--prev');
    const nextBtn = rootElement.querySelector('.card-carousel__btn--next');
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    
    function getVisibleSlides() {
      if (window.innerWidth < 576) return 1;
      if (window.innerWidth < 768) return 2;
      return 3;
    }

    function goToSlide(index) {
      const visibleSlides = getVisibleSlides();
      const maxIndex = Math.max(0, slides.length - visibleSlides);
      const newIndex = Math.max(0, Math.min(index, maxIndex));
      
      const slideWidth = slides[0].offsetWidth;
      const moveDistance = newIndex * (slideWidth + gap);
      track.style.transform = 'translateX(-' + moveDistance + 'px)';
      currentIndex = newIndex;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(currentIndex + 1);
      });
    }
    
    window.addEventListener('resize', () => goToSlide(currentIndex), { passive: true });
  `,
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
  ],
};
