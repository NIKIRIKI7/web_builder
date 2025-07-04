<script setup lang="ts">
import type { UiComponentInfo } from '@/entities/UiComponent/model/types';
import { DND_COMPONENT_ID_KEY } from '@/shared/lib/dnd/keys';
import DefaultPreviewIcon from './DefaultPreviewIcon.vue';

const props = defineProps<{
  componentInfo: UiComponentInfo;
}>();

function onDragStart(event: DragEvent) {
  if (event.dataTransfer) {
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
      <!-- Используем динамический компонент для отображения иконки -->
      <component :is="componentInfo.previewIcon || DefaultPreviewIcon" />
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