import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { HeaderIcon } from '@/shared/ui/icons';
import staticCss from './SimpleHeader.scss?inline';

const ID = 'simple-header-v1';

export const simpleHeaderPreview: UiComponentPreview = {
  id: ID,
  name: 'Simple Header',
  category: 'Headers',
  previewIcon: markRaw(HeaderIcon),
};

export const simpleHeaderDefinition: UiComponentDefinition = {
  ...simpleHeaderPreview,
  component: markRaw(defineAsyncComponent(() => import('./SimpleHeader.vue'))),
  staticCss,
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
        { name: 'logoText', label: 'Logo Text', type: 'text' },
        { name: 'ctaText', label: 'Button Text', type: 'text' },
        { name: 'links', label: 'Navigation Links', type: 'link-array' },
      ],
    },
    {
      name: 'Styles',
      target: 'styles',
      fields: [
        { name: 'backgroundColor', label: 'Background Color', type: 'color' },
        { name: 'color', label: 'Text Color', type: 'color' },
        { name: 'paddingTop', label: 'Padding Top', type: 'number', unit: 'px' },
        { name: 'paddingBottom', label: 'Padding Bottom', type: 'number', unit: 'px' },
        { name: 'paddingLeft', label: 'Padding Left', type: 'number', unit: 'px' },
        { name: 'paddingRight', label: 'Padding Right', type: 'number', unit: 'px' },
        { name: 'borderBottom', label: 'Bottom Border', type: 'text' },
      ],
    },
    {
      name: 'Scripts',
      target: 'script',
      fields: []
    }
  ],
};