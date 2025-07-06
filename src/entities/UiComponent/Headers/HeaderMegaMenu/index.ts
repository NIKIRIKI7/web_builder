import { defineAsyncComponent, markRaw } from 'vue';
import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from '../../model/types';
import { HeaderIcon } from '@/shared/ui/icons';
import staticCss from './HeaderMegaMenu.scss?inline';

const ID = 'header-mega-menu-v1';

export const headerMegaMenuPreview: UiComponentPreview = {
  id: ID,
  name: 'headerMegaMenu',
  category: 'Headers',
  previewIcon: markRaw(HeaderIcon),
};

export const headerMegaMenuDefinition: UiComponentDefinition = {
  ...headerMegaMenuPreview,
  component: markRaw(defineAsyncComponent(() => import('./HeaderMegaMenu.vue'))),
  staticCss,
  defaultProps: {
    logoText: 'MegaCorp',
    menuItems: [
      {
        id: 1,
        title: 'Solutions',
        columns: [
          {
            id: 11,
            title: 'By Industry',
            links: [
              { id: 111, text: 'Finance', url: '#' },
              { id: 112, text: 'Healthcare', url: '#' },
              { id: 113, text: 'Retail', url: '#' },
            ]
          },
          {
            id: 12,
            title: 'By Use Case',
            links: [
              { id: 121, text: 'Analytics', url: '#' },
              { id: 122, text: 'Automation', url: '#' },
              { id: 123, text: 'Security', url: '#' },
            ]
          }
        ]
      },
      { id: 2, title: 'Pricing', url: '#' },
      { id: 3, title: 'Company', url: '#' },
    ]
  },
  defaultStyles: {
    backgroundColor: '#ffffff',
    color: '#34495e',
    paddingTop: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e0e0e0',
  },
};

export const headerMegaMenuEditorConfig: EditorConfiguration = {
  componentId: ID,
  tabs: [
    {
      name: 'Content',
      target: 'props',
      fields: [
        { name: 'logoText', label: 'logoText', type: 'text' },
        {
          name: 'menuItems',
          label: 'menuItems',
          type: 'object-array',
          itemSchema: [
            { name: 'title', label: 'menuItemTitle', type: 'text' },
            { name: 'url', label: 'menuItemUrl', type: 'text' },
            {
              name: 'columns',
              label: 'menuColumns',
              type: 'object-array',
              itemSchema: [
                { name: 'title', label: 'columnTitle', type: 'text' },
                { name: 'links', label: 'columnLinks', type: 'link-array' },
              ],
            },
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
    {
      name: 'Scripts',
      target: 'script',
      fields: []
    }
  ],
};