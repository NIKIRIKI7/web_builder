import { defineAsyncComponent, markRaw } from 'vue';

import { FooterIcon } from '@/shared/ui/icons';

import staticCss from './FooterDetailed.scss?inline';

import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';

const ID = 'footer-detailed-v1';

export const footerDetailedPreview: UiComponentPreview = {
  id: ID,
  name: 'footerDetailed',
  category: 'Footers',
  previewIcon: markRaw(FooterIcon),
};

export const footerDetailedDefinition: UiComponentDefinition = {
  ...footerDetailedPreview,
  component: markRaw(defineAsyncComponent(() => import('./FooterDetailed.vue'))),
  staticCss,
  defaultProps: {
    logoText: 'Detailed Inc.',
    copyrightText: `© ${new Date().getFullYear()} All Rights Reserved.`,
    columns: [
      {
        id: 1, title: 'Product',
        links: [
          { id: 11, text: 'Pricing', url: '#' },
          { id: 12, text: 'Features', url: '#' },
          { id: 13, text: 'Updates', url: '#' },
        ]
      },
      {
        id: 2, title: 'Company',
        links: [
          { id: 21, text: 'About Us', url: '#' },
          { id: 22, text: 'Careers', url: '#' },
          { id: 23, text: 'Blog', url: '#' },
        ]
      },
      {
        id: 3, title: 'Support',
        links: [
          { id: 31, text: 'Help Center', url: '#' },
          { id: 32, text: 'Contact', url: '#' },
          { id: 33, text: 'Status', url: '#' },
        ]
      },
    ]
  },
  defaultStyles: {
    backgroundColor: '#2c3e50',
    paddingTop: '60px',
    paddingBottom: '60px',
    color: '#bdc3c7',
  },
};

export const footerDetailedEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'logoText', label: 'logoText', type: 'text' },
        { name: 'copyrightText', label: 'copyrightText', type: 'text' },
        {
          name: 'columns',
          label: 'footerColumns',
          type: 'object-array',
          itemSchema: [
            { name: 'title', label: 'columnTitle', type: 'text' },
            { name: 'links', label: 'columnLinks', type: 'link-array' },
          ],
        },
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
