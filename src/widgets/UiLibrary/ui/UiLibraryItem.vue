<script setup lang="ts">
import type { UiComponentPreview } from '@/entities/UiComponent/model/types';
import { DND_COMPONENT_ID_KEY } from '@/shared/lib/dnd/keys';
import { DefaultPreviewIcon } from '@/shared/ui/icons';
import { useI18nManager } from '@/shared/i18n/useI18nManager';

const props = defineProps<{
  componentInfo: UiComponentPreview;
}>();

const { t } = useI18nManager();

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
      <component :is="componentInfo.previewIcon || DefaultPreviewIcon" />
    </div>
    <span class="ui-library-item__name">{{ t(`components.names.${componentInfo.name}`) }}</span>
  </div>
</template>

<style scoped lang="scss">
.ui-library-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 12px;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: grab;
  transition: all $transition-duration ease;
  text-align: center;
  height: 110px;

  &:active {
    cursor: grabbing;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    border-color: var(--color-accent);
  }

  &__preview {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    margin-bottom: 8px;
    color: var(--color-text-primary);
    opacity: 0.6;
    flex-shrink: 0;
  }

  &__name {
    width: 100%;
    font-size: 13px;
    color: var(--color-text-primary);
    font-weight: 500;
    line-height: 1.3;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>