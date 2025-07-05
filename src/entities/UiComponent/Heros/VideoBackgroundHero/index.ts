import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { HeroIcon } from '@/shared/ui/icons';
import staticCss from './VideoBackgroundHero.scss?inline';

const ID = 'video-background-hero-v1';

export const videoBackgroundHeroPreview: UiComponentPreview = {
  id: ID,
  name: 'videoBackgroundHero',
  category: 'Heros',
  previewIcon: markRaw(HeroIcon),
};

export const videoBackgroundHeroDefinition: UiComponentDefinition = {
  ...videoBackgroundHeroPreview,
  component: markRaw(defineAsyncComponent(() => import('./VideoBackgroundHero.vue'))),
  staticCss,
  defaultProps: {
    videoUrl: 'https://cdn.coverr.co/videos/coverr-a-surfer-riding-a-wave-in-the-ocean-6119/1080p.mp4',
    title: 'Experience the Motion',
    subtitle: 'Dynamic video backgrounds that captivate your audience.',
    ctaText: 'Watch Video',
    ctaUrl: '#',
  },
  defaultStyles: {},
};

export const videoBackgroundHeroEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'videoUrl', label: 'videoUrl', type: 'text' },
        { name: 'title', label: 'title', type: 'text' },
        { name: 'subtitle', label: 'subtitle', type: 'textarea' },
        { name: 'ctaText', label: 'ctaText', type: 'text' },
        { name: 'ctaUrl', label: 'ctaUrl', type: 'text' },
      ],
    },
    {
      name: 'Styles',
      target: 'styles',
      fields: [],
    },
  ],
};
