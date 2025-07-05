<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';
import { useCanvasManager } from '@/features/Canvas/model/useCanvasManager';
import { DND_COMPONENT_ID_KEY } from '@/shared/lib/dnd/keys';
import { AddIcon, CloneIcon, DeleteIcon } from '@/shared/ui/icons';

const canvasManager = useCanvasManager();
const isDragOver = ref(false);

function handleComponentClick(instanceId: number) {
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
}

function onDrop(event: DragEvent) {
  event.preventDefault();
  isDragOver.value = false;
  const componentId = event.dataTransfer?.getData(DND_COMPONENT_ID_KEY);
  if (componentId) {
    canvasManager.addComponent(componentId);
  }
}

function onDraggableUpdate(newOrder: any[]) {
  canvasManager.draggableComponents.value = newOrder;
}

</script>

<template>
  <div
    class="canvas"
    :class="{ 'canvas--drag-over': isDragOver }"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
    @click="handleCanvasClick"
  >
    <div v-if="!canvasManager.renderedComponents.value.length" class="canvas__placeholder">
      <div class="canvas__placeholder-icon">
        <AddIcon />
      </div>
      <p class="canvas__placeholder-text">Drag and drop components here</p>
    </div>
    <template v-else>
      <Suspense>
        <template #default>
          <draggable
            :model-value="canvasManager.draggableComponents.value"
            @update:model-value="onDraggableUpdate"
            item-key="instanceId"
            class="draggable-container"
            ghost-class="ghost-component"
          >
            <template #item="{ element: item }">
              <div
                class="component-wrapper"
                :class="{ 'component-wrapper--selected': item.instanceId === canvasManager.selectedComponentInstanceId.value }"
                @click.stop="handleComponentClick(item.instanceId)"
              >
                <div class="component-wrapper__controls">
                  <button
                    class="component-wrapper__control-btn component-wrapper__control-btn--clone"
                    title="Clone Component"
                    @click.stop="handleClone(item.instanceId)"
                  >
                    <CloneIcon />
                  </button>
                  <button
                    class="component-wrapper__control-btn component-wrapper__control-btn--delete"
                    title="Delete Component"
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

                <div class="component-wrapper__overlay"></div>
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
  width: 100%;
  max-width: 1200px;
  min-height: 100%;
  background-color: $color-bg-secondary;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;
  transition: all $transition-duration ease;
  border: 2px dashed transparent;
  padding: 20px;
}
.canvas--drag-over {
  border-color: #3498db;
  box-shadow: 0 8px 16px rgba(52, 152, 219, 0.2);
}
.canvas__placeholder,
.canvas__loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  color: #bdc3c7;
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
}
.ghost-component {
  opacity: 0.5;
  background: #c8ebfb;
  border: 2px dashed #3498db;
  border-radius: 4px;
}
.ghost-component > * {
  visibility: hidden;
}
.component-wrapper {
  position: relative;
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition: outline-color 0.2s ease-in-out;
  border-radius: 4px;
  cursor: move;
}
.component-wrapper:not(:last-child) {
  margin-bottom: 20px;
}
.component-wrapper:hover {
  outline-color: #d5eafb;
}
.component-wrapper--selected {
  outline-color: #3498db;
}
.component-wrapper--selected .component-wrapper__controls {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
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
  background-color: $color-bg-secondary;
  border: 1px solid $color-border;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-5px);
  transition: all 0.2s ease-in-out;
  cursor: default;
}
.component-wrapper:hover .component-wrapper__controls {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
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
  color: #606266;
}
.component-wrapper__control-btn:hover {
  background-color: $color-bg-primary;
}
.component-wrapper__control-btn--clone:hover {
  color: #3498db;
}
.component-wrapper__control-btn--delete:hover {
  color: #f56c6c;
}
.component-wrapper__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.canvas__component {
  pointer-events: none;
  width: 100%;
}
</style>