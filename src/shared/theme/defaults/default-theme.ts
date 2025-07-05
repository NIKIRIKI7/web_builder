import type { Theme } from '../types';

export const defaultTheme: Theme = {
  name: 'default',
  colors: {
    bgPrimary: '#f0f2f5',
    bgSecondary: '#ffffff',
    bgTertiary: '#2c3e50',
    border: '#dcdfe6',
    textPrimary: '#303133',
    textSecondary: '#ffffff',
    accent: '#3498db',
    accentHover: '#2980b9',
    danger: '#f56c6c',
    dangerHover: '#d32f2f',
    success: '#67c23a',
  },
  layout: {
    headerHeight: '60px',
    sidebarWidth: '300px',
    editorPanelWidth: '320px',
  },
};