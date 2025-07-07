<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import draggable from 'vuedraggable';
import type { FullRenderedComponent } from '@/features/Canvas/model/canvasStore';
import { useCanvasState } from '@/features/Canvas/model/useCanvasState';
import { useCanvasManager } from '@/features/Canvas/model/useCanvasManager';
import { useI18nManager } from '@/shared/i18n/useI18nManager';
import { CloneIcon, DeleteIcon, DragHandleIcon, EditIcon } from '@/shared/ui/icons';

const props = defineProps<{
  nodes: FullRenderedComponent[];
}>();

const emit = defineEmits<{
  'update:nodes': [nodes: FullRenderedComponent[]];
}>();

const canvasState = useCanvasState();
const canvasManager = useCanvasManager();
const { t } = useI18nManager();

const CanvasNode = defineAsyncComponent(() => import('./CanvasNode.vue'));

const draggableNodes = computed({
  get: () => props.nodes,
  set: (newOrder) => {
    emit('update:nodes', newOrder);
  },
});

function handleComponentClick(instanceId: number) {
  canvasManager.selectComponent(instanceId);
}
function handleEdit(instanceId: number) {
  canvasManager.selectComponent(instanceId);
}
function handleClone(instanceId: number) {
  canvasManager.cloneComponent(instanceId);
}
function handleDelete(instanceId: number) {
  canvasManager.deleteComponent(instanceId);
}
</script>

<template>
  <draggable
      v-model="draggableNodes"
      item-key="instanceId"
      handle=".component-wrapper__drag-handle"
      group="components"
      class="draggable-container"
      ghost-class="ghost-component"
  >
    <template #item="{ element: item }">
      <div
          class="component-wrapper"
          :class="{ 'component-wrapper--selected': item.instanceId === canvasState.selectedComponentInstanceId.value }"
      >
        <div class="component-wrapper__controls">
          <div class="component-wrapper__control-btn component-wrapper__drag-handle" :title="t('canvas.actions.drag')">
            <DragHandleIcon />
          </div>
          <button class="component-wrapper__control-btn component-wrapper__control-btn--edit" :title="t('editor.tabs.content')" @click.stop="handleEdit(item.instanceId)">
            <EditIcon />
          </button>
          <button class="component-wrapper__control-btn component-wrapper__control-btn--clone" :title="t('canvas.actions.clone')" @click.stop="handleClone(item.instanceId)">
            <CloneIcon />
          </button>
          <button class="component-wrapper__control-btn component-wrapper__control-btn--delete" :title="t('canvas.actions.delete')" @click.stop="handleDelete(item.instanceId)">
            <DeleteIcon />
          </button>
        </div>

        <component
            :is="item.componentDefinition.component"
            class="canvas__component"
            v-bind="item.props"
            :style="item.styles">
          <template v-if="item.children && item.children.length">
            <CanvasNode v-model:nodes="item.children" />
          </template>
        </component>

        <div class="component-wrapper__overlay" @click.stop="handleComponentClick(item.instanceId)"></div>
      </div>
    </template>
  </draggable>
</template>

<style scoped lang="scss">
.draggable-container {
  min-height: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.ghost-component {
  opacity: 0.5;
  background: var(--color-bg-primary);
  border: 2px dashed var(--color-accent);
  border-radius: 4px;
}

.ghost-component > * {
  visibility: hidden;
}

.component-wrapper {
  position: relative;
  z-index: 1;
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition: outline 0.2s ease-in-out;
  border-radius: 4px;
}

.component-wrapper:hover {
  outline: 1px dashed var(--color-accent);
}

.component-wrapper--selected {
  z-index: 20;
  outline: 2px solid var(--color-accent);
}

.component-wrapper--selected .component-wrapper__controls {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.component-wrapper--selected .component-wrapper__overlay {
  pointer-events: none;
}

.component-wrapper__controls {
  position: absolute;
  top: -34px;
  right: 0;
  z-index: 25;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-5px);
  transition: all 0.2s ease-in-out;
}

.component-wrapper:hover .component-wrapper__controls {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.component-wrapper__drag-handle {
  cursor: grab;
}

.component-wrapper__control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
  transition: all 0.2s;
  color: var(--color-text-primary);
  opacity: 0.7;
}

.component-wrapper__control-btn:hover {
  background-color: var(--color-bg-primary);
  opacity: 1;
}

.component-wrapper__control-btn--edit:hover {
  color: var(--color-success);
}

.component-wrapper__control-btn--clone:hover {
  color: var(--color-accent);
}

.component-wrapper__control-btn--delete:hover {
  color: var(--color-danger);
}

.component-wrapper__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  cursor: pointer;
}

.canvas__component {
  width: 100%;
  pointer-events: none;
}
</style>