<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  type: 'row' | 'col';
}>();

const emit = defineEmits<{
  resize: [delta: number];
}>();

const isDragging = ref(false);

function onMouseDown(startEvent: MouseEvent): void {
  isDragging.value = true;
  startEvent.preventDefault();

  const onMouseMove = (moveEvent: MouseEvent): void => {
    if (!isDragging.value) return;
    const delta = props.type === 'row' ? moveEvent.movementX : moveEvent.movementY;
    emit('resize', delta);
  };

  const onMouseUp = (): void => {
    isDragging.value = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}
</script>

<template>
  <div
      class="layout-splitter"
      :class="`layout-splitter--${type}`"
      @mousedown.stop="onMouseDown"
  ></div>
</template>

<style scoped lang="scss">
.layout-splitter {
  flex-shrink: 0;
  background-color: var(--color-bg-primary);
  transition: background-color 0.2s;
  z-index: 100;

  &--row {
    width: 5px;
    height: 100%;
    cursor: col-resize;
  }

  &--col {
    width: 100%;
    height: 5px;
    cursor: row-resize;
  }

  &:hover {
    background-color: var(--color-accent);
  }
}
</style>