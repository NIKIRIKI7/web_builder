<script setup lang="ts">
import { defineAsyncComponent, markRaw, computed, type Component } from 'vue';
import type { LayoutNode, LayoutPanel, WidgetId } from '../types';
import { useLayoutStore } from '../layoutStore';
import { DND_LAYOUT_PANEL_ID_KEY } from '../dnd';
import { WIDGET_ID } from '../constants';
import { DragHandleIcon } from '@/shared/ui/icons';

const props = defineProps<{
  panel: LayoutPanel;
  parentType: LayoutNode['type'];
}>();

const layoutStore = useLayoutStore();

const isBeingDragged = computed(() => layoutStore.draggedPanelId === props.panel.id);

const widgetMap: Record<WidgetId, Component> = {
  [WIDGET_ID.UI_LIBRARY]: markRaw(defineAsyncComponent(() => import('@/widgets/UiLibrary/ui/UiLibrary.vue'))),
  [WIDGET_ID.APP_WORKSPACE]: markRaw(defineAsyncComponent(() => import('@/widgets/Workspace/ui/AppWorkspace.vue'))),
  [WIDGET_ID.EDITOR_PANEL]: markRaw(defineAsyncComponent(() => import('@/widgets/EditorPanel/ui/EditorPanel.vue'))),
};

const widgetComponent = computed(() => widgetMap[props.panel.widgetId]);

function onDragStart(event: DragEvent) {
  layoutStore.setDraggedPanel(props.panel.id);
  if (event.dataTransfer) {
    event.dataTransfer.setData(DND_LAYOUT_PANEL_ID_KEY, props.panel.id);
    event.dataTransfer.effectAllowed = 'move';
  }
}

function onDragEnd() {
  layoutStore.clearDragState();
}

function onDragOver(event: DragEvent) {
  event.preventDefault();
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const position = props.parentType === 'row' ? event.clientX - rect.left : event.clientY - rect.top;
  const size = props.parentType === 'row' ? rect.width : rect.height;
  layoutStore.setDropTarget({
    panelId: props.panel.id,
    side: position < size / 2 ? 'before' : 'after',
  });
}

function onDragLeave() {
  layoutStore.setDropTarget(null);
}

function onDrop(event: DragEvent) {
  event.preventDefault();
  layoutStore.executeMovePanel();
  layoutStore.clearDragState();
}
</script>

<template>
  <div
    class="layout-panel"
    :class="{ 'layout-panel--dragging': isBeingDragged }"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onDrop"
  >
    <div
      v-if="layoutStore.isEditMode"
      class="layout-panel__header"
    >
      <div
        class="layout-panel__drag-handle"
        draggable="true"
        @dragstart.stop="onDragStart"
        @dragend.stop="onDragEnd"
        @mousedown.stop
      >
        <DragHandleIcon />
      </div>
    </div>
    <div
      class="layout-panel__content"
      :class="{ 'layout-panel__content--edit-mode': layoutStore.isEditMode }"
    >
      <component :is="widgetComponent" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: var(--color-bg-secondary);
  position: relative;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &--dragging {
    opacity: 0.5;
    transform: scale(0.98);
    border: 1px solid var(--color-border);
  }
}

.layout-panel__header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background-color: var(--color-bg-primary);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.layout-panel__drag-handle {
  cursor: grab;
  color: var(--color-text-primary);
  opacity: 0.6;
  padding: 2px 8px;

  &:active {
    cursor: grabbing;
  }
}

.layout-panel__content {
  flex-grow: 1;
  overflow: auto;
  position: relative;

  &--edit-mode {
    pointer-events: none;
  }
}
</style>