import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { DefaultPreviewIcon } from '@/shared/ui/icons';
import staticCss from './TextThenImage.scss?inline';

const ID = 'text-then-image-v1';

export const textThenImagePreview: UiComponentPreview = {
  id: ID,
  name: 'textThenImage',
  category: 'Content',
  previewIcon: markRaw(DefaultPreviewIcon),
};

export const textThenImageDefinition: UiComponentDefinition = {
  ...textThenImagePreview,
  component: markRaw(defineAsyncComponent(() => import('./TextThenImage.vue'))),
  staticCss,
  defaultProps: {
    title: 'Designed for Impact',
    text: 'We believe in clean aesthetics and powerful functionality. Our design philosophy centers around user experience, ensuring that every interaction is both beautiful and intuitive.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
  },
  defaultStyles: {
    backgroundColor: '#ffffff',
    paddingTop: '60px',
    paddingBottom: '60px',
    color: '#34495e',
  },
};

export const textThenImageEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'title', label: 'title', type: 'text' },
        { name: 'text', label: 'text', type: 'textarea' },
        { name: 'imageUrl', label: 'imageUrl', type: 'image' },
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