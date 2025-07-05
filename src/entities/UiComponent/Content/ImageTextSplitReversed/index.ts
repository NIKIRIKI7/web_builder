import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { DefaultPreviewIcon } from '@/shared/ui/icons';
import staticCss from './ImageTextSplitReversed.scss?inline';

const ID = 'image-text-split-reversed-v1';

export const imageTextSplitReversedPreview: UiComponentPreview = {
  id: ID,
  name: 'imageTextSplitReversed',
  category: 'Content',
  previewIcon: markRaw(DefaultPreviewIcon),
};

export const imageTextSplitReversedDefinition: UiComponentDefinition = {
  ...imageTextSplitReversedPreview,
  component: markRaw(defineAsyncComponent(() => import('./ImageTextSplitReversed.vue'))),
  staticCss,
  defaultProps: {
    title: 'Streamline Your Workflow',
    text: 'Embrace efficiency with our intuitive tools. We help you automate repetitive tasks, allowing you to focus on what truly matters for your business growth.',
    imageUrl: 'https://source.unsplash.com/random/800x600?technology,desk',
    ctaText: 'Get Started',
    ctaUrl: '#',
  },
  defaultStyles: {
    backgroundColor: '#f0f2f5',
    paddingTop: '60px',
    paddingBottom: '60px',
    color: '#34495e',
  },
};

export const imageTextSplitReversedEditorConfig: EditorConfiguration = {
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
