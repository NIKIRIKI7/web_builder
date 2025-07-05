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
  id:string;
  size: number;
  children: (LayoutNode | LayoutPanel)[];
}

export type LayoutItem = LayoutNode | LayoutPanel;