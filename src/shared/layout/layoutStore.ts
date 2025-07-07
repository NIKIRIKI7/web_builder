import { klona } from 'klona/lite';
import { defineStore } from 'pinia';
import { reactive, ref, type Ref } from 'vue';

import { WIDGET_ID } from './constants';
import { LayoutService } from './layout.service';

import type { LayoutNode, DropTarget } from './types';

const defaultLayout: LayoutNode = {
    id: 'root',
    type: 'row',
    size: 100,
    children: [
        { type: 'panel', id: 'panel-1', widgetId: WIDGET_ID.UI_LIBRARY, size: 25 },
        { type: 'panel', id: 'panel-2', widgetId: WIDGET_ID.APP_WORKSPACE, size: 75 }
    ]
};

export const useLayoutStore = defineStore(
    'layout',
    () => {
        const isEditMode = ref(false);
        const layout: LayoutNode = reactive(klona(defaultLayout));
        const draggedPanelId: Ref<string | null> = ref(null);
        const dropTarget: Ref<DropTarget | null> = ref(null);

        function toggleEditMode(): void {
            isEditMode.value = !isEditMode.value;
        }

        function resetLayout(): void {
            const newLayout = klona(defaultLayout);
            Object.assign(layout, newLayout);
        }

        function resizePanel(path: string[], delta: number): void {
            const newLayout = klona(layout);
            if (LayoutService.findParentAndResize(newLayout, path, delta)) {
                Object.assign(layout, newLayout);
            }
        }

        function setDraggedPanel(panelId: string | null): void {
            draggedPanelId.value = panelId;
        }

        function setDropTarget(target: DropTarget | null): void {
            dropTarget.value = target;
        }

        function clearDragState(): void {
            draggedPanelId.value = null;
            dropTarget.value = null;
        }

        function executeMovePanel(): void {
            if (!draggedPanelId.value || !dropTarget.value) return;
            if (draggedPanelId.value === dropTarget.value.panelId) return;

            const newLayout = klona(layout);
            const panelToMove = LayoutService.findAndRemovePanel(newLayout, draggedPanelId.value);

            if (panelToMove) {
                if (
                    LayoutService.findAndInsertPanel(
                        newLayout,
                        dropTarget.value.panelId,
                        panelToMove,
                        dropTarget.value.side
                    )
                ) {
                    Object.assign(layout, newLayout);
                }
            }
        }

        return {
            isEditMode,
            layout,
            draggedPanelId,
            dropTarget,
            toggleEditMode,
            resetLayout,
            resizePanel,
            setDraggedPanel,
            setDropTarget,
            clearDragState,
            executeMovePanel
        };
    },
    {
        persist: {
            paths: ['isEditMode', 'layout']
        }
    }
);