export interface LayoutPanel {
  type: 'panel';
  id: string;
  widgetId: 'UiLibrary' | 'AppWorkspace' | 'EditorPanel';
  size: number;
}

export interface LayoutNode {
  type: 'row' | 'col';
  id: string;
  size: number;
  children: (LayoutNode | LayoutPanel)[];
}

export type LayoutItem = LayoutNode | LayoutPanel;