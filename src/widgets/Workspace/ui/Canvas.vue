<script setup lang="ts">
import { ref } from 'vue';
import { useCanvasStore } from '@/features/Canvas/model/canvasStore';
import { DND_COMPONENT_ID_KEY } from '@/shared/lib/dnd/keys';

const canvasStore = useCanvasStore();
const isDragOver = ref(false);

/**
 * Обрабатывает клик по обертке компонента, устанавливая его как активный.
 * @param instanceId - ID экземпляра компонента.
 */
function handleComponentClick(instanceId: number) {
  canvasStore.selectComponent(instanceId);
}

/**
 * Обрабатывает клик по самому холсту (вне компонентов), чтобы снять выделение.
 * @param event - Событие мыши.
 */
function handleCanvasClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    canvasStore.selectComponent(null);
  }
}

/**
 * Обрабатывает событие, когда перетаскиваемый элемент находится над холстом.
 * @param event - Событие перетаскивания.
 */
function onDragOver(event: DragEvent) {
  event.preventDefault();
  isDragOver.value = true;
}

/**
 * Обрабатывает событие, когда перетаскиваемый элемент покидает область холста.
 */
function onDragLeave() {
  isDragOver.value = false;
}

/**
 * Обрабатывает событие, когда элемент "брошен" на холст.
 * @param event - Событие перетаскивания.
 */
function onDrop(event: DragEvent) {
  event.preventDefault();
  isDragOver.value = false;
  if (event.dataTransfer) {
    const componentId = event.dataTransfer.getData(DND_COMPONENT_ID_KEY);
    if (componentId) {
      canvasStore.addComponent(componentId);
    }
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
          <div>
            <div
                v-for="item in canvasStore.renderedComponents"
                :key="item.instanceId"
                class="component-wrapper"
                :class="{ 'component-wrapper--selected': item.instanceId === canvasStore.selectedComponentInstanceId }"
                @click.stop="handleComponentClick(item.instanceId)"
            >
              <component
                  :is="item.componentInfo.component"
                  class="canvas__component"
                  v-bind="item.props"
              />
              <div class="component-wrapper__overlay"></div>
            </div>
          </div>
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

  &--drag-over {
    border-color: #3498db;
    box-shadow: 0 8px 16px rgba(52, 152, 219, 0.2);
  }

  &__placeholder,
  &__loading {
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

  &__placeholder-icon {
    margin-bottom: 16px;
  }

  &__placeholder-text {
    font-size: 16px;
    font-weight: 500;
  }
}

.component-wrapper {
  position: relative;
  cursor: pointer;
  outline: 2px dashed transparent;
  outline-offset: 4px;
  transition: outline-color 0.2s ease-in-out;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &--selected {
    outline-color: #3498db;
  }

  &:hover:not(&--selected) {
    outline-color: #d5eafb;
  }
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