<script setup lang="ts">
import { watch } from 'vue';
import TheHeader from '@/widgets/TheHeader/ui/TheHeader.vue';
import LayoutManager from '@/shared/layout/ui/LayoutManager.vue';
import EditorPanel from '@/widgets/EditorPanel/ui/EditorPanel.vue';
import { useLayoutStore } from '@/shared/layout/layoutStore';
import { useEditorStore } from '@/widgets/EditorPanel/model/editorStore';
import { useCanvasManager } from '@/features/Canvas/model/useCanvasManager';
import { useCanvasStore } from '@/features/Canvas/model/canvasStore';

const props = defineProps<{
  projectId: string;
}>();

const layoutStore = useLayoutStore();
const editorStore = useEditorStore();
const canvasManager = useCanvasManager();
const canvasStore = useCanvasStore();

watch(
  () => props.projectId,
  (newId) => {
    if (newId) {
      canvasStore.loadProject(newId);
    } else {
      canvasStore.resetState();
    }
  },
  { immediate: true }
);

watch(canvasManager.selectedComponentInstanceId, (newId) => {
  if (newId === null) {
    editorStore.closeEditor();
  }
});
</script>

<template>
  <div class="builder-page">
    <TheHeader />
    <main class="builder-page__main">
      <LayoutManager :node="layoutStore.layout" />
    </main>
    <transition name="slide-fade">
      <EditorPanel v-if="editorStore.isOpen" class="builder-page__editor-panel"/>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.builder-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: var(--color-bg-primary);
  overflow: hidden;
  position: relative;
}
.builder-page__main {
  flex-grow: 1;
  height: calc(100vh - var(--layout-header-height));
}
.builder-page__editor-panel {
  position: absolute;
  top: var(--layout-header-height);
  right: 0;
  width: var(--layout-editor-panel-width);
  height: calc(100% - var(--layout-header-height));
  z-index: 1100;
  box-shadow: -5px 0 15px rgba(0,0,0,0.1);
}
</style>