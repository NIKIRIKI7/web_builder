import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { HeaderIcon } from '@/shared/ui/icons';
import staticCss from './HeaderCentered.scss?inline';
import runtimeScript from './HeaderCentered.script.ts?raw';

const ID = 'header-centered-v1';

export const headerCenteredPreview: UiComponentPreview = {
  id: ID,
  name: 'headerCentered',
  category: 'Headers',
  previewIcon: markRaw(HeaderIcon),
};

export const headerCenteredDefinition: UiComponentDefinition = {
  ...headerCenteredPreview,
  component: markRaw(defineAsyncComponent(() => import('./HeaderCentered.vue'))),
  staticCss,
  runtimeScript,
  defaultProps: {
    logoText: 'CenterLogo',
    linksLeft: [
      { id: 1, text: 'Products', url: '#' },
      { id: 2, text: 'Features', url: '#' },
    ],
    linksRight: [
      { id: 3, text: 'About Us', url: '#' },
      { id: 4, text: 'Contact', url: '#' },
    ],
    ctaText: 'Sign Up',
  },
  defaultStyles: {
    backgroundColor: '#ffffff',
    color: '#34495e',
    paddingTop: '20px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e0e0e0',
  },
};

export const headerCenteredEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'logoText', label: 'logoText', type: 'text' },
        { name: 'ctaText', label: 'ctaText', type: 'text' },
        { name: 'linksLeft', label: 'navLinksLeft', type: 'link-array' },
        { name: 'linksRight', label: 'navLinksRight', type: 'link-array' },
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
        { name: 'borderBottom', label: 'borderBottom', type: 'text' },
      ],
    },
  ],
};