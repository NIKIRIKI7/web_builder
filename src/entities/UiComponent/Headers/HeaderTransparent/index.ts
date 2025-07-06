import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { HeaderIcon } from '@/shared/ui/icons';
import staticCss from './HeaderTransparent.scss?inline';
import runtimeScript from './HeaderTransparent.script.js?raw';

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
  runtimeScript,
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
    {
      name: 'Scripts',
      target: 'script',
      fields: []
    }
  ],
};