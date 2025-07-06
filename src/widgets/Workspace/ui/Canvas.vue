<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCanvasState } from '@/features/Canvas/model/useCanvasState';
import { useCanvasManager } from '@/features/Canvas/model/useCanvasManager';
import { DND_COMPONENT_ID_KEY } from '@/shared/lib/dnd/keys';
import { useI18nManager } from '@/shared/i18n/useI18nManager';
import type { FullRenderedComponent, CanvasInstanceState } from '@/features/Canvas/model/canvasStore';
import CanvasNode from './CanvasNode.vue';

const canvasState = useCanvasState();
const canvasManager = useCanvasManager();
const { t } = useI18nManager();

const isDragOver = ref(false);

const draggableComponents = computed<FullRenderedComponent[]>({
  get() {
    return canvasState.renderedComponents.value;
  },
  set(newOrder: FullRenderedComponent[]) {
    function mapToInstanceState(components: FullRenderedComponent[]): CanvasInstanceState[] {
      return components.map(c => ({
        instanceId: c.instanceId,
        componentId: c.componentDefinition.id,
        props: c.props,
        styles: c.styles,
        scripts: c.scripts,
        children: c.children ? mapToInstanceState(c.children) : [],
      }));
    }
    const newInstances = mapToInstanceState(newOrder);
    canvasManager.setDraggableOrder(newInstances);
  }
});

function handleCanvasClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    canvasManager.selectComponent(null);
  }
}

function onDragOver(event: DragEvent) {
  event.preventDefault();
  if (draggableComponents.value.length === 0) {
    isDragOver.value = true;
  }
}

function onDragLeave() {
  isDragOver.value = false;
}

function onDrop(event: DragEvent) {
  event.preventDefault();
  isDragOver.value = false;

  const target = event.target as HTMLElement;
  const isRootDrop = target.classList.contains('canvas');

  if (isRootDrop && draggableComponents.value.length === 0) {
    const componentId = event.dataTransfer?.getData(DND_COMPONENT_ID_KEY);
    if (componentId) {
      canvasManager.addComponent(componentId);
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
    <div v-if="!draggableComponents.length" class="canvas__placeholder">
      <p class="canvas__placeholder-text">{{ t('canvas.placeholder.text') }}</p>
    </div>
    <template v-else>
      <Suspense>
        <template #default>
          <CanvasNode v-model:nodes="draggableComponents" />
        </template>
        <template #fallback>
          <div class="canvas__loading">
            Loading Components...
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
.canvas__placeholder-text {
  font-size: 16px;
  font-weight: 500;
}
</style>