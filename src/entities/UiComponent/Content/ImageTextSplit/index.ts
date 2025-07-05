import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { DefaultPreviewIcon } from '@/shared/ui/icons';
import staticCss from './ImageTextSplit.scss?inline';

const ID = 'image-text-split-v1';

export const imageTextSplitPreview: UiComponentPreview = {
  id: ID,
  name: 'imageTextSplit',
  category: 'Content',
  previewIcon: markRaw(DefaultPreviewIcon),
};

export const imageTextSplitDefinition: UiComponentDefinition = {
  ...imageTextSplitPreview,
  component: markRaw(defineAsyncComponent(() => import('./ImageTextSplit.vue'))),
  staticCss,
  defaultProps: {
    title: 'Discover Our Features',
    text: 'Our platform provides a comprehensive suite of tools designed to boost your productivity. From advanced analytics to seamless integrations, we have everything you need to succeed.',
    imageUrl: 'https://source.unsplash.com/random/800x600?nature,water',
    ctaText: 'Learn More',
    ctaUrl: '#',
  },
  defaultStyles: {
    backgroundColor: '#ffffff',
    paddingTop: '60px',
    paddingBottom: '60px',
    color: '#34495e',
  },
};

export const imageTextSplitEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'title', label: 'title', type: 'text' },
        { name: 'text', label: 'text', type: 'textarea' },
        { name: 'imageUrl', label: 'imageUrl', type: 'image' },
        { name: 'ctaText', label: 'ctaText', type: 'text' },
        { name: 'ctaUrl', label: 'ctaUrl', type: 'text' },
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
