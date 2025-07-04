<script setup lang="ts">
import type { UiComponentInfo } from '@/entities/UiComponent/model/types';
import { DND_COMPONENT_ID_KEY } from '@/shared/lib/dnd/keys';

const props = defineProps<{
  componentInfo: UiComponentInfo;
}>();

function onDragStart(event: DragEvent) {
  if (event.dataTransfer) {
// Устанавливаем данные, которые будут переданы
    event.dataTransfer.setData(DND_COMPONENT_ID_KEY, props.componentInfo.id);
    event.dataTransfer.effectAllowed = 'copy';
  }
}
</script>
<template>
  <div
      class="ui-library-item"
      draggable="true"
      @dragstart="onDragStart"
  >
    <div class="ui-library-item__preview">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
    </div>
    <span class="ui-library-item__name">{{ componentInfo.name }}</span>
  </div>
</template>
<style scoped lang="scss">
.ui-library-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background-color: $color-bg-primary;
  border: 1px solid $color-border;
  border-radius: 8px;
  cursor: grab;
  transition: all $transition-duration ease;
  text-align: center;

  &:active {
    cursor: grabbing;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    border-color: #a7b5c9;
  }

  &__preview {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    margin-bottom: 8px;
    color: #8c9bb0;
  }

  &__name {
    font-size: 13px;
    color: $color-text-primary;
    font-weight: 500;
  }
}
</style>