import { defineAsyncComponent, markRaw } from 'vue';

import { DefaultPreviewIcon } from '@/shared/ui/icons';

import staticCss from './ImageWithTextOverlay.scss?inline';

import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';

const ID = 'image-with-text-overlay-v1';

export const imageWithTextOverlayPreview: UiComponentPreview = {
  id: ID,
  name: 'imageWithTextOverlay',
  category: 'Content',
  previewIcon: markRaw(DefaultPreviewIcon),
};

export const imageWithTextOverlayDefinition: UiComponentDefinition = {
  ...imageWithTextOverlayPreview,
  component: markRaw(defineAsyncComponent(() => import('./ImageWithTextOverlay.vue'))),
  staticCss,
  defaultProps: {
    title: 'Boldly Go',
    subtitle: 'Explore new horizons with our cutting-edge solutions.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
  },
  defaultStyles: {
    paddingTop: '120px',
    paddingBottom: '120px',
    color: '#ffffff',
  },
};

export const imageWithTextOverlayEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'title', label: 'title', type: 'text' },
        { name: 'subtitle', label: 'subtitle', type: 'textarea' },
        { name: 'imageUrl', label: 'imageUrl', type: 'image' },
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