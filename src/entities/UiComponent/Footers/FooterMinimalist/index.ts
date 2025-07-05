import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { FooterIcon } from '@/shared/ui/icons';
import staticCss from './FooterMinimalist.scss?inline';

const ID = 'footer-minimalist-v1';

export const footerMinimalistPreview: UiComponentPreview = {
  id: ID,
  name: 'footerMinimalist',
  category: 'Footers',
  previewIcon: markRaw(FooterIcon),
};

export const footerMinimalistDefinition: UiComponentDefinition = {
  ...footerMinimalistPreview,
  component: markRaw(defineAsyncComponent(() => import('./FooterMinimalist.vue'))),
  staticCss,
  defaultProps: {
    copyrightText: `© ${new Date().getFullYear()} Minimalist.`,
  },
  defaultStyles: {
    backgroundColor: 'transparent',
    paddingTop: '20px',
    paddingBottom: '20px',
    color: '#566573',
  },
};

export const footerMinimalistEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'copyrightText', label: 'copyrightText', type: 'text' },
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
      ],
    },
  ],
};
