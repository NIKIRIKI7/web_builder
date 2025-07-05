export const WIDGET_ID = {
  UI_LIBRARY: 'UiLibrary',
  APP_WORKSPACE: 'AppWorkspace',
  EDITOR_PANEL: 'EditorPanel',
} as const;

export type WidgetId = typeof WIDGET_ID[keyof typeof WIDGET_ID];