import type { WidgetId } from './constants';

export type { WidgetId } from './constants';

export interface LayoutPanel {
  type: 'panel';
  id: string;
  widgetId: WidgetId;
  size: number;
}

export interface LayoutNode {
  type: 'row' | 'col';
  id: string;
  size: number;
  children: (LayoutNode | LayoutPanel)[];
}

export type LayoutItem = LayoutNode | LayoutPanel;

export interface DropTarget {
  panelId: string;
  side: 'before' | 'after';
}

export interface LayoutState {
  isEditMode: boolean;
  layout: LayoutNode;
}