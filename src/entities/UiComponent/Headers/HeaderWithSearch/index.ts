import { defineAsyncComponent, markRaw } from 'vue';

import { HeaderIcon } from '@/shared/ui/icons';

import staticCss from './HeaderWithSearch.scss?inline';

import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';

const ID = 'header-with-search-v1';

export const headerWithSearchPreview: UiComponentPreview = {
  id: ID,
  name: 'headerWithSearch',
  category: 'Headers',
  previewIcon: markRaw(HeaderIcon),
};

export const headerWithSearchDefinition: UiComponentDefinition = {
  ...headerWithSearchPreview,
  component: markRaw(defineAsyncComponent(() => import('./HeaderWithSearch.vue'))),
  staticCss,
  defaultProps: {
    logoText: 'Searchable',
    links: [
      { id: 1, text: 'Blog', url: '#' },
      { id: 2, text: 'Docs', url: '#' },
      { id: 3, text: 'Support', url: '#' },
    ],
    searchPlaceholder: 'Search documentation...',
  },
  defaultStyles: {
    backgroundColor: '#ffffff',
    color: '#303133',
    paddingTop: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e0e0e0',
  },
};

export const headerWithSearchEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'logoText', label: 'logoText', type: 'text' },
        { name: 'links', label: 'navLinks', type: 'link-array' },
        { name: 'searchPlaceholder', label: 'searchPlaceholder', type: 'text' },
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
