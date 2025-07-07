<script setup lang="ts">
import { computed } from 'vue';

import { usePreviewStore } from '@/shared/preview/previewStore';

import AppCanvas from './AppCanvas.vue';

const previewStore = usePreviewStore();
const canvasStyle = computed(() => ({
  maxWidth: previewStore.currentWidth || 'none',
}));
</script>

<template>
  <div class="app-workspace">
    <div class="app-workspace__viewport">
      <AppCanvas :style="canvasStyle" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-workspace {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  height: 100%;
  background-color: var(--color-bg-primary);

  &__viewport {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 24px;
  }
}

:deep(.app-canvas) {
  transition: max-width 0.4s ease;
  width: 100%;
}
</style>