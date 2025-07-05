import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { FooterIcon } from '@/shared/ui/icons';
import staticCss from './FooterWithSocials.scss?inline';

const ID = 'footer-with-socials-v1';

export const footerWithSocialsPreview: UiComponentPreview = {
  id: ID,
  name: 'footerWithSocials',
  category: 'Footers',
  previewIcon: markRaw(FooterIcon),
};

export const footerWithSocialsDefinition: UiComponentDefinition = {
  ...footerWithSocialsPreview,
  component: markRaw(defineAsyncComponent(() => import('./FooterWithSocials.vue'))),
  staticCss,
  defaultProps: {
    copyrightText: `© ${new Date().getFullYear()} Social Co.`,
    socialLinks: [
      { id: 1, name: 'Facebook', url: '#' },
      { id: 2, name: 'Twitter', url: '#' },
      { id: 3, name: 'Instagram', url: '#' },
    ]
  },
  defaultStyles: {
    backgroundColor: '#34495e',
    paddingTop: '40px',
    paddingBottom: '40px',
    color: '#ecf0f1',
  },
};

export const footerWithSocialsEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'copyrightText', label: 'copyrightText', type: 'text' },
        { name: 'socialLinks', label: 'socialLinks', type: 'link-array' },
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
