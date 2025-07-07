import { klona } from 'klona/lite';
import { defineStore } from 'pinia';

import { WIDGET_ID } from './constants';
import { LayoutService } from './layout.service';

import type { LayoutNode } from './types';


interface DropTarget {
  panelId: string;
  side: 'before' | 'after';
}

interface LayoutState {
  isEditMode: boolean;
  layout: LayoutNode;
  draggedPanelId: string | null;
  dropTarget: DropTarget | null;
}

const defaultLayout: LayoutNode = {
  id: 'root',
  type: 'row',
  size: 100,
  children: [
    { type: 'panel', id: 'panel-1', widgetId: WIDGET_ID.UI_LIBRARY, size: 25 },
    { type: 'panel', id: 'panel-2', widgetId: WIDGET_ID.APP_WORKSPACE, size: 75 },
  ]
};

export const useLayoutStore = defineStore('layout', {
  state: (): LayoutState => ({
    isEditMode: false,
    layout: klona(defaultLayout),
    draggedPanelId: null,
    dropTarget: null,
  }),
  actions: {
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },
    resetLayout() {
      this.layout = klona(defaultLayout);
    },
    resizePanel(path: string[], delta: number) {
      const newLayout = klona(this.layout);
      if (LayoutService.findParentAndResize(newLayout, path, delta)) {
        this.layout = newLayout;
      }
    },
    setDraggedPanel(panelId: string | null) {
      this.draggedPanelId = panelId;
    },
    setDropTarget(target: DropTarget | null) {
      this.dropTarget = target;
    },
    clearDragState() {
      this.draggedPanelId = null;
      this.dropTarget = null;
    },
    executeMovePanel() {
      if (!this.draggedPanelId || !this.dropTarget) return;

      if (this.draggedPanelId === this.dropTarget.panelId) return;

      const newLayout = klona(this.layout);
      const draggedPanel = LayoutService.findAndRemovePanel(newLayout, this.draggedPanelId);

      if (draggedPanel) {
        if (LayoutService.findAndInsertPanel(newLayout, this.dropTarget.panelId, draggedPanel, this.dropTarget.side)) {
          this.layout = newLayout;
        }
      }
    },
  },
  persist: {
    filter: (state: LayoutState) => {
      const { isEditMode, layout } = state;
      return { isEditMode, layout };
    },
  },
});