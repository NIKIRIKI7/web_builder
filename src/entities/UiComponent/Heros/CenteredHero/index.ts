import { defineAsyncComponent, markRaw } from 'vue';

import { HeroIcon } from '@/shared/ui/icons';

import staticCss from './CenteredHero.scss?inline';

import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';

const ID = 'centered-hero-v1';

export const centeredHeroPreview: UiComponentPreview = {
  id: ID,
  name: 'centeredHero',
  category: 'Heros',
  previewIcon: markRaw(HeroIcon),
};

export const centeredHeroDefinition: UiComponentDefinition = {
  ...centeredHeroPreview,
  component: markRaw(defineAsyncComponent(() => import('./CenteredHero.vue'))),
  staticCss,
  defaultProps: {
    title: 'Build Your Next Project Faster',
    subtitle: 'A powerful and flexible component-based builder that helps you create beautiful websites without writing a single line of code.',
    ctaPrimaryText: 'Get Started for Free',
    ctaPrimaryUrl: '#',
    ctaSecondaryText: 'View Docs',
    ctaSecondaryUrl: '#',
  },
  defaultStyles: {
    backgroundColor: '#ffffff',
    paddingTop: '100px',
    paddingBottom: '100px',
  },
};

export const centeredHeroEditorConfig: EditorConfiguration = {
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
