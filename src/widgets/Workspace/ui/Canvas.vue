<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';
import { useCanvasManager } from '@/features/Canvas/model/useCanvasManager';
import { DND_COMPONENT_ID_KEY } from '@/shared/lib/dnd/keys';
import { AddIcon, CloneIcon, DeleteIcon, DragHandleIcon, EditIcon } from '@/shared/ui/icons';
import { useI18nManager } from '@/shared/i18n/useI18nManager';

const canvasManager = useCanvasManager();
const { t } = useI18nManager();

const isDragOver = ref(false);
const dropTargetInstanceId = ref<number | null>(null);
const dropPosition = ref<'before' | 'after' | null>(null);

function handleComponentClick(instanceId: number) {
  canvasManager.selectComponent(instanceId);
}

function handleEdit(instanceId: number) {
  canvasManager.selectComponent(instanceId);
}

function handleCanvasClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    canvasManager.selectComponent(null);
  }
}

function handleClone(instanceId: number) {
  canvasManager.cloneComponent(instanceId);
}

function handleDelete(instanceId: number) {
  canvasManager.deleteComponent(instanceId);
}

function onDragOver(event: DragEvent) {
  event.preventDefault();
  isDragOver.value = true;
}

function onDragLeave() {
  isDragOver.value = false;
  handleDragLeaveItem();
}

function onDrop(event: DragEvent) {
  event.preventDefault();
  const componentId = event.dataTransfer?.getData(DND_COMPONENT_ID_KEY);
  if (componentId) {
    if (dropTargetInstanceId.value && dropPosition.value) {
      canvasManager.addComponentAt({
        componentId,
        targetId: dropTargetInstanceId.value,
        position: dropPosition.value,
      });
    } else {
      canvasManager.addComponent(componentId);
    }
  }
  isDragOver.value = false;
  dropTargetInstanceId.value = null;
  dropPosition.value = null;
}

function onDraggableUpdate(newOrder: any[]) {
  const newInstances = newOrder.map(item => ({
    instanceId: item.instanceId,
    componentId: item.componentDefinition.id,
    props: item.props,
    styles: item.styles,
    scripts: item.scripts,
  }));
  canvasManager.setComponentInstances(newInstances);
}

function handleDragOverItem(event: DragEvent, instanceId: number) {
  event.preventDefault();
  event.stopPropagation();
  dropTargetInstanceId.value = instanceId;
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const position = event.clientY - rect.top;
  dropPosition.value = position < rect.height / 2 ? 'before' : 'after';
}

function handleDragLeaveItem() {
  dropTargetInstanceId.value = null;
  dropPosition.value = null;
}
</script>

<template>
  <div
    class="canvas"
    :class="{ 'canvas--drag-over': isDragOver && !dropTargetInstanceId }"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
    @click="handleCanvasClick"
  >
    <div v-if="!canvasManager.renderedComponents.value.length" class="canvas__placeholder">
      <div class="canvas__placeholder-icon">
        <AddIcon />
      </div>
      <p class="canvas__placeholder-text">{{ t('canvas.placeholder.text') }}</p>
    </div>
    <template v-else>
      <Suspense>
        <template #default>
          <draggable
            :model-value="canvasManager.draggableComponents.value"
            @update:model-value="onDraggableUpdate"
            item-key="instanceId"
            handle=".component-wrapper__drag-handle"
            class="draggable-container"
            ghost-class="ghost-component"
          >
            <template #item="{ element: item }">
              <div
                class="component-wrapper"
                :class="{
                  'component-wrapper--selected': item.instanceId === canvasManager.selectedComponentInstanceId.value,
                  'component-wrapper--drop-before': dropTargetInstanceId === item.instanceId && dropPosition === 'before',
                  'component-wrapper--drop-after': dropTargetInstanceId === item.instanceId && dropPosition === 'after',
                }"
                @dragover="handleDragOverItem($event, item.instanceId)"
                @dragleave.stop="handleDragLeaveItem"
              >
                <div class="component-wrapper__controls">
                  <div
                    class="component-wrapper__control-btn component-wrapper__drag-handle"
                    :title="t('canvas.actions.drag')"
                  >
                    <DragHandleIcon />
                  </div>
                  <button
                    class="component-wrapper__control-btn component-wrapper__control-btn--edit"
                    :title="t('editor.tabs.content')"
                    @click.stop="handleEdit(item.instanceId)"
                  >
                    <EditIcon />
                  </button>
                  <button
                    class="component-wrapper__control-btn component-wrapper__control-btn--clone"
                    :title="t('canvas.actions.clone')"
                    @click.stop="handleClone(item.instanceId)"
                  >
                    <CloneIcon />
                  </button>
                  <button
                    class="component-wrapper__control-btn component-wrapper__control-btn--delete"
                    :title="t('canvas.actions.delete')"
                    @click.stop="handleDelete(item.instanceId)"
                  >
                    <DeleteIcon />
                  </button>
                </div>

                <component
                  :is="item.componentDefinition.component"
                  class="canvas__component"
                  v-bind="item.props"
                  :style="item.styles"
                />

                <div
                  class="component-wrapper__overlay"
                  @click.stop="handleComponentClick(item.instanceId)"
                ></div>
              </div>
            </template>
          </draggable>
        </template>
        <template #fallback>
          <div class="canvas__loading">
            Loading Component...
          </div>
        </template>
      </Suspense>
    </template>
  </div>
</template>

<style scoped lang="scss">
.canvas {
  min-height: 100%;
  background-color: var(--color-bg-secondary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;
  transition: all $transition-duration ease;
  border: 2px dashed transparent;
  padding: 20px;
  margin: 0 auto;
}
.canvas--drag-over {
  border-color: var(--color-accent);
  box-shadow: 0 8px 16px rgba(var(--color-accent-rgb, 52, 152, 219), 0.2);
}
.canvas__placeholder,
.canvas__loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  color: var(--color-text-primary);
  opacity: 0.4;
  text-align: center;
  pointer-events: none;
}
.canvas__placeholder-icon {
  margin-bottom: 16px;
}
.canvas__placeholder-text {
  font-size: 16px;
  font-weight: 500;
}
.draggable-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  transition: outline-color 0.2s ease-in-out;
  border-radius: 4px;
}
.component-wrapper:hover {
  outline-color: var(--color-accent);
  outline-style: dashed;
  outline-width: 1px;
}
.component-wrapper--selected {
  z-index: 20;
  outline: 2px solid var(--color-accent);
  outline-style: solid;
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
.component-wrapper::before,
.component-wrapper::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: rgba(var(--color-accent-rgb, 52, 152, 219), 0.2);
  border: 2px dashed var(--color-accent);
  border-radius: 4px;
  opacity: 0;
  transform: scaleY(0);
  transition: all 0.2s ease-out;
  z-index: 5;
  pointer-events: none;
}
.component-wrapper::before {
  top: -14px;
}
.component-wrapper::after {
  bottom: -14px;
}
.component-wrapper--drop-before::before {
  opacity: 1;
  transform: scaleY(1);
}
.component-wrapper--drop-after::after {
  opacity: 1;
  transform: scaleY(1);
}
</style>