import { defineAsyncComponent, markRaw } from 'vue';

import { HeaderIcon } from '@/shared/ui/icons';

import runtimeScript from './SimpleHeader.script.js?raw';
import staticCss from './SimpleHeader.scss?inline';

import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';

const ID = 'simple-header-v1';

export const simpleHeaderPreview: UiComponentPreview = {
  id: ID,
  name: 'simpleHeader',
  category: 'Headers',
  previewIcon: markRaw(HeaderIcon),
};

export const simpleHeaderDefinition: UiComponentDefinition = {
  ...simpleHeaderPreview,
  component: markRaw(defineAsyncComponent(() => import('./SimpleHeader.vue'))),
  staticCss,
  runtimeScript,
  defaultProps: {
    logoText: 'MyWebsite',
    ctaText: 'Get Started',
    links: [
      { id: 1, text: 'Home', url: '#' },
      { id: 2, text: 'About', url: '#' },
      { id: 3, text: 'Contact', url: '#' },
    ],
  },
  defaultStyles: {
    paddingTop: '16px',
    paddingBottom: '16px',
    paddingLeft: '32px',
    paddingRight: '32px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    color: '#34495e',
  },
};

export const simpleHeaderEditorConfig: EditorConfiguration = {
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
        { name: 'backgroundColor', label: 'bgColor', type: 'color' },
        { name: 'color', label: 'textColor', type: 'color' },
        { name: 'paddingTop', label: 'paddingTop', type: 'number', unit: 'px' },
        { name: 'paddingBottom', label: 'paddingBottom', type: 'number', unit: 'px' },
        { name: 'paddingLeft', label: 'paddingLeft', type: 'number', unit: 'px' },
        { name: 'paddingRight', label: 'paddingRight', type: 'number', unit: 'px' },
        { name: 'borderBottom', label: 'borderBottom', type: 'text' },
      ],
    },
    {
      name: 'Scripts',
      target: 'script',
      fields: []
    }
  ],
};