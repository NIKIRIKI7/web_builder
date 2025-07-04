<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCanvasStore } from '@/features/Canvas/model/canvasStore';
import { DND_COMPONENT_ID_KEY } from '@/shared/lib/dnd/keys';
import draggable from 'vuedraggable';

const canvasStore = useCanvasStore();
const isDragOver = ref(false);

const draggableComponents = computed({
  get() {
    return canvasStore.renderedComponents;
  },
  set(newOrder) {
    const newInstances = newOrder.map(item => ({
      instanceId: item.instanceId,
      componentId: item.componentInfo.id,
      props: item.props,
      styles: item.styles,
    }));
    canvasStore.setComponentInstances(newInstances);
  }
});

function handleComponentClick(instanceId: number) {
  canvasStore.selectComponent(instanceId);
}

function handleCanvasClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    canvasStore.selectComponent(null);
  }
}

function handleDelete(instanceId: number) {
  canvasStore.deleteComponent(instanceId);
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
    canvasStore.addComponent(componentId);
  }
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
    <div v-if="!canvasStore.renderedComponents.length" class="canvas__placeholder">
      <div class="canvas__placeholder-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="8" x2="12" y2="16"></line></svg>
      </div>
      <p class="canvas__placeholder-text">Drag and drop components here</p>
    </div>
    <template v-else>
      <Suspense>
        <template #default>
          <draggable
              v-model="draggableComponents"
              item-key="instanceId"
              class="draggable-container"
              ghost-class="ghost-component"
              animation="200"
          >
            <template #item="{ element: item }">
              <div
                  class="component-wrapper"
                  :class="{ 'component-wrapper--selected': item.instanceId === canvasStore.selectedComponentInstanceId }"
                  @click.stop="handleComponentClick(item.instanceId)"
                  :style="item.styles"
              >
                <button
                    class="component-wrapper__delete-btn"
                    title="Delete Component"
                    @click.stop="handleDelete(item.instanceId)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
                <component
                    :is="item.componentInfo.component"
                    class="canvas__component"
                    v-bind="item.props"
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
  width: 100%;
}
.ghost-component {
  opacity: 0.5;
  background: #c8ebfb;
  border: 2px dashed #3498db;
  border-radius: 4px;
}
.component-wrapper {
  position: relative;
  cursor: move;
  outline: 2px dashed transparent;
  outline-offset: 4px;
  transition: outline-color 0.2s ease-in-out, background-color 0.2s, padding 0.2s;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  // ИСПРАВЛЕНИЕ:
  // 1. Задаем общий стиль для наведения.
  &:hover {
    outline-color: #d5eafb;
  }

  // 2. Задаем стиль для выбранного элемента.
  // Он будет иметь приоритет над :hover из-за того, что идет позже в коде,
  // что дает нам желаемый визуальный эффект.
  &--selected {
    outline-color: #3498db;
  }
}

.component-wrapper__delete-btn {
  position: absolute;
  top: -12px;
  right: -12px;
  z-index: 25;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: #f56c6c;
  color: white;
  border: 2px solid $color-bg-secondary;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  opacity: 0;
  transform: scale(0.8);
  visibility: hidden;
  transition: all 0.2s ease-in-out;
}
.component-wrapper:hover .component-wrapper__delete-btn,
.component-wrapper--selected .component-wrapper__delete-btn {
  opacity: 1;
  transform: scale(1);
  visibility: visible;
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