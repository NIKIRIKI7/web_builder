<script setup lang="ts">
import { ref } from 'vue';
import { useCanvasStore } from '@/features/Canvas/model/canvasStore';
import { DND_COMPONENT_ID_KEY } from '@/shared/lib/dnd/keys';

const canvasStore = useCanvasStore();
const isDragOver = ref(false);

// ... (функции onDragOver, onDragLeave, onDrop остаются без изменений)
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
  >
    <!-- ИЗМЕНЕНИЕ: Используем геттер `renderedComponents` -->
    <div v-if="!canvasStore.renderedComponents.length" class="canvas__placeholder">
      <div class="canvas__placeholder-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="8" x2="12" y2="16"></line></svg>
      </div>
      <p class="canvas__placeholder-text">Drag and drop components here</p>
    </div>
    <template v-else>
      <!-- ИЗМЕНЕНИЕ: Итерируемся по геттеру `renderedComponents` -->
      <component
          :is="item.componentInfo.component"
          v-for="item in canvasStore.renderedComponents"
          :key="item.instanceId"
          class="canvas__component"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
/* Стили остаются без изменений */
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

  &--drag-over {
    border-color: #3498db;
    box-shadow: 0 8px 16px rgba(52, 152, 219, 0.2);
  }

  &__placeholder {
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

  &__component + &__component {
    margin-top: 20px;
  }
}
</style>