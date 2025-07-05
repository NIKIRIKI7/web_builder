import { defineStore } from 'pinia';
import { klona } from 'klona/lite';
import type { LayoutNode } from './types';
import { LayoutService } from './layout.service';

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
    { type: 'panel', id: 'panel-1', widgetId: 'UiLibrary', size: 25 },
    { type: 'panel', id: 'panel-2', widgetId: 'AppWorkspace', size: 75 },
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
      const { draggedPanelId, dropTarget, ...rest } = state;
      return rest;
    },
  },
});