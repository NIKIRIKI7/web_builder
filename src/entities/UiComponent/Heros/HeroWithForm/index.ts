import { defineAsyncComponent, markRaw } from 'vue';

import { HeroIcon } from '@/shared/ui/icons';

import staticCss from './HeroWithForm.scss?inline';

import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';

const ID = 'hero-with-form-v1';

export const heroWithFormPreview: UiComponentPreview = {
  id: ID,
  name: 'heroWithForm',
  category: 'Heros',
  previewIcon: markRaw(HeroIcon),
};

export const heroWithFormDefinition: UiComponentDefinition = {
  ...heroWithFormPreview,
  component: markRaw(defineAsyncComponent(() => import('./HeroWithForm.vue'))),
  staticCss,
  defaultProps: {
    title: 'Join Our Community',
    subtitle: 'Get exclusive access to new features, tutorials, and special offers by subscribing to our newsletter.',
    placeholder: 'Enter your email address',
    ctaText: 'Subscribe',
    disclaimer: 'We respect your privacy. Unsubscribe at any time.',
  },
  defaultStyles: {
    backgroundColor: '#f8f9fa',
    paddingTop: '80px',
    paddingBottom: '80px',
  },
};

export const heroWithFormEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'title', label: 'title', type: 'text' },
        { name: 'subtitle', label: 'subtitle', type: 'textarea' },
        { name: 'placeholder', label: 'newsletterPlaceholder', type: 'text' },
        { name: 'ctaText', label: 'ctaText', type: 'text' },
        { name: 'disclaimer', label: 'disclaimer', type: 'text' },
      ],
    },
    {
      name: 'Styles',
      target: 'styles',
      fields: [
        { name: 'backgroundColor', label: 'bgColor', type: 'color' },
        { name: 'paddingTop', label: 'paddingTop', type: 'number', unit: 'px' },
        { name: 'paddingBottom', label: 'paddingBottom', type: 'number', unit: 'px' },
      ],
    },
  ],
};
