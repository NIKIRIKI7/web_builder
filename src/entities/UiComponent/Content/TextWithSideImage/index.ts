import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { DefaultPreviewIcon } from '@/shared/ui/icons';
import staticCss from './TextWithSideImage.scss?inline';

const ID = 'text-with-side-image-v1';

export const textWithSideImagePreview: UiComponentPreview = {
  id: ID,
  name: 'textWithSideImage',
  category: 'Content',
  previewIcon: markRaw(DefaultPreviewIcon),
};

export const textWithSideImageDefinition: UiComponentDefinition = {
  ...textWithSideImagePreview,
  component: markRaw(defineAsyncComponent(() => import('./TextWithSideImage.vue'))),
  staticCss,
  defaultProps: {
    title: 'Our Philosophy',
    paragraphs: [
      { id: 1, text: 'We build tools that are not only powerful but also a joy to use. Every detail is crafted with the user in mind, from the smallest icon to the most complex workflow.' },
      { id: 2, text: 'Our commitment to open standards and interoperability means our platform fits perfectly into your existing ecosystem, enhancing your capabilities without locking you in.' }
    ],
    imageUrl: 'https://source.unsplash.com/random/400x400?art,abstract',
  },
  defaultStyles: {
    backgroundColor: '#ffffff',
    paddingTop: '80px',
    paddingBottom: '80px',
    color: '#34495e',
  },
};

export const textWithSideImageEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'title', label: 'title', type: 'text' },
        { name: 'imageUrl', label: 'imageUrl', type: 'image' },
        {
          name: 'paragraphs',
          label: 'paragraphs',
          type: 'object-array',
          itemSchema: [
            { name: 'text', label: 'paragraphText', type: 'textarea' },
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
      ],
    },
  ],
};
