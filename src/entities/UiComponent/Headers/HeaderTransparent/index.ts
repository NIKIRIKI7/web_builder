import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { HeaderIcon } from '@/shared/ui/icons';
import staticCss from './HeaderTransparent.scss?inline';

const ID = 'header-transparent-v1';

export const headerTransparentPreview: UiComponentPreview = {
  id: ID,
  name: 'headerTransparent',
  category: 'Headers',
  previewIcon: markRaw(HeaderIcon),
};

export const headerTransparentDefinition: UiComponentDefinition = {
  ...headerTransparentPreview,
  component: markRaw(defineAsyncComponent(() => import('./HeaderTransparent.vue'))),
  staticCss,
  clientScript: `
    const scrollThreshold = 50;
    const headerElement = rootElement.querySelector('.header-transparent');

    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        headerElement.classList.add('header-transparent--scrolled');
      } else {
        headerElement.classList.remove('header-transparent--scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup function could be added if script was removable
    // For now, it lives with the page.
  `,
  defaultProps: {
    logoText: 'Aura',
    ctaText: 'Explore',
    links: [
      { id: 1, text: 'Home', url: '#' },
      { id: 2, text: 'Showcase', url: '#' },
      { id: 3, text: 'Pricing', url: '#' },
    ],
  },
  defaultStyles: {
    paddingTop: '24px',
    paddingBottom: '24px',
    color: '#ffffff',
  },
};

export const headerTransparentEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'logoText', label: 'logoText', type: 'text' },
        { name: 'ctaText', label: 'ctaText', type: 'text' },
        { name: 'links', label: 'navLinks', type: 'link-array' },
      ],
    },
    {
      name: 'Styles',
      target: 'styles',
      fields: [
        { name: 'color', label: 'textColor', type: 'color' },
        { name: 'paddingTop', label: 'paddingTop', type: 'number', unit: 'px' },
        { name: 'paddingBottom', label: 'paddingBottom', type: 'number', unit: 'px' },
      ],
    },
  ],
};
