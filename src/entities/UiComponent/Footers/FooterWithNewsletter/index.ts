import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { FooterIcon } from '@/shared/ui/icons';
import staticCss from './FooterWithNewsletter.scss?inline';

const ID = 'footer-with-newsletter-v1';

export const footerWithNewsletterPreview: UiComponentPreview = {
  id: ID,
  name: 'footerWithNewsletter',
  category: 'Footers',
  previewIcon: markRaw(FooterIcon),
};

export const footerWithNewsletterDefinition: UiComponentDefinition = {
  ...footerWithNewsletterPreview,
  component: markRaw(defineAsyncComponent(() => import('./FooterWithNewsletter.vue'))),
  staticCss,
  defaultProps: {
    title: 'Join Our Newsletter',
    subtitle: 'Get the latest news, articles, and resources, sent to your inbox weekly.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    copyrightText: '© Newsletter Corp.',
  },
  defaultStyles: {
    backgroundColor: '#ffffff',
    paddingTop: '60px',
    paddingBottom: '60px',
    color: '#34495e',
  },
};

export const footerWithNewsletterEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'title', label: 'newsletterTitle', type: 'text' },
        { name: 'subtitle', label: 'newsletterSubtitle', type: 'textarea' },
        { name: 'placeholder', label: 'newsletterPlaceholder', type: 'text' },
        { name: 'buttonText', label: 'ctaText', type: 'text' },
        { name: 'copyrightText', label: 'copyrightText', type: 'text' },
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
