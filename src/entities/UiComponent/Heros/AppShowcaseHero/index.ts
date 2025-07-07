import { defineAsyncComponent, markRaw } from 'vue';

import { HeroIcon } from '@/shared/ui/icons';

import staticCss from './AppShowcaseHero.scss?inline';

import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';

const ID = 'app-showcase-hero-v1';

export const appShowcaseHeroPreview: UiComponentPreview = {
  id: ID,
  name: 'appShowcaseHero',
  category: 'Heros',
  previewIcon: markRaw(HeroIcon),
};

export const appShowcaseHeroDefinition: UiComponentDefinition = {
  ...appShowcaseHeroPreview,
  component: markRaw(defineAsyncComponent(() => import('./AppShowcaseHero.vue'))),
  staticCss,
  defaultProps: {
    title: 'The All-In-One Platform for Your Team',
    subtitle: 'Manage projects, track progress, and collaborate seamlessly in one intuitive workspace.',
    ctaPrimaryText: 'Start Free Trial',
    ctaPrimaryUrl: '#',
    ctaSecondaryText: 'Request a Demo',
    ctaSecondaryUrl: '#',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7ZNvEgS3zsUfFgu20Q_99R_qh_EHrhdhUA&s',
  },
  defaultStyles: {
    backgroundColor: '#ffffff',
    paddingTop: '80px',
    paddingBottom: '80px',
  },
};

export const appShowcaseHeroEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'title', label: 'title', type: 'text' },
        { name: 'subtitle', label: 'subtitle', type: 'textarea' },
        { name: 'ctaPrimaryText', label: 'ctaPrimaryText', type: 'text' },
        { name: 'ctaPrimaryUrl', label: 'ctaUrl', type: 'text' },
        { name: 'ctaSecondaryText', label: 'ctaSecondaryText', type: 'text' },
        { name: 'ctaSecondaryUrl', label: 'ctaSecondaryUrl', type: 'text' },
        { name: 'imageUrl', label: 'imageUrl', type: 'image' },
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