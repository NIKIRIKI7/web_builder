import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { FooterIcon } from '@/shared/ui/icons';
import staticCss from './SimpleFooter.scss?inline';

const ID = 'simple-footer-v1';

export const simpleFooterPreview: UiComponentPreview = {
  id: ID,
  name: 'simpleFooter',
  category: 'Footers',
  previewIcon: markRaw(FooterIcon),
};

export const simpleFooterDefinition: UiComponentDefinition = {
  ...simpleFooterPreview,
  component: markRaw(defineAsyncComponent(() => import('./SimpleFooter.vue'))),
  staticCss,
  defaultProps: {
    copyrightText: `© ${new Date().getFullYear()} Web Builder Inc. All rights reserved.`,
    links: [
      { id: 1, text: 'Privacy Policy', url: '#' },
      { id: 2, text: 'Terms of Service', url: '#' },
      { id: 3, text: 'Contact Us', url: '#' },
    ]
  },
  defaultStyles: {
    backgroundColor: '#2c3e50',
    paddingTop: '32px',
    paddingBottom: '32px',
    color: '#ecf0f1',
  },
};

export const simpleFooterEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'copyrightText', label: 'copyrightText', type: 'textarea' },
        { name: 'links', label: 'footerLinks', type: 'link-array' },
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