// C:\Users\mcniki\Documents\stormprojects\Vue\web_builder\src\pages\builder\ui\BuilderPage.vue

<script setup lang="ts">
import TheHeader from '@/widgets/TheHeader/ui/TheHeader.vue';
import AppWorkspace from '@/widgets/Workspace/ui/AppWorkspace.vue';
import UiLibrary from '@/widgets/UiLibrary/ui/UiLibrary.vue';
import EditorPanel from '@/widgets/EditorPanel/ui/EditorPanel.vue';
import { useCanvasManager } from '@/features/Canvas/model/useCanvasManager';

const canvasManager = useCanvasManager();

// Эта строка остается, она по-прежнему выполняет свою задачу
await canvasManager.preloadCanvasConfigs();
</script>

<template>
  <!--
    ИЗМЕНЕНИЕ: Убираем обертку <Suspense>.
    Компонент просто возвращает свою основную разметку.
  -->
  <div class="builder-page">
    <TheHeader />
    <main class="builder-page__main">
      <aside class="builder-page__sidebar builder-page__sidebar--left">
        <UiLibrary />
      </aside>
      <AppWorkspace class="builder-page__workspace" />
      <aside class="builder-page__sidebar builder-page__sidebar--right">
        <EditorPanel />
      </aside>
    </main>
  </div>
</template>

<style scoped lang="scss">
.builder-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $color-bg-primary;

  &__main {
    display: flex;
    flex-grow: 1;
    height: calc(100vh - $header-height);
  }

  &__sidebar {
    flex-shrink: 0;
    width: $sidebar-width;
    background-color: $color-bg-secondary;
    border-right: 1px solid $color-border;
    height: 100%;
    overflow-y: auto;

    &--right {
      width: $editor-panel-width;
      border-right: none;
      border-left: 1px solid $color-border;
    }
  }

  &__workspace {
    flex-grow: 1;
  }
}

/*
  ИЗМЕНЕНИЕ: Стиль для .builder-page-loader удален,
  так как он теперь будет находиться в App.vue
*/
</style>