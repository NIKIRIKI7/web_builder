export interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  danger: string;
  dangerHover: string;
  success: string;
}

export interface ThemeLayout {
  headerHeight: string;
  sidebarWidth: string;
  editorPanelWidth: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
  layout: ThemeLayout;
}