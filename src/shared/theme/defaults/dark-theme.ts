import type { Theme } from '../types';

export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    bgPrimary: '#1a1a1a',
    bgSecondary: '#242424',
    bgTertiary: '#3a3a3a',
    border: '#444444',
    textPrimary: '#e0e0e0',
    textSecondary: '#ffffff',
    accent: '#58a6ff',
    accentHover: '#388bfd',
    danger: '#f85149',
    dangerHover: '#c93c37',
    success: '#56d364',
  },
  layout: {
    headerHeight: '60px',
    sidebarWidth: '300px',
    editorPanelWidth: '320px',
  },
};