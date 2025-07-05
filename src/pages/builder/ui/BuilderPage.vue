<script setup lang="ts">
import TheHeader from '@/widgets/TheHeader/ui/TheHeader.vue';
import AppWorkspace from '@/widgets/Workspace/ui/AppWorkspace.vue';
import UiLibrary from '@/widgets/UiLibrary/ui/UiLibrary.vue';
import EditorPanel from '@/widgets/EditorPanel/ui/EditorPanel.vue';
</script>

<template>
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
  background-color: var(--color-bg-primary);
}
.builder-page__main {
  display: flex;
  flex-grow: 1;
  height: calc(100vh - var(--layout-header-height));
}
.builder-page__sidebar {
  flex-shrink: 0;
  width: var(--layout-sidebar-width);
  background-color: var(--color-bg-secondary);
  border-right: 1px solid var(--color-border);
  height: 100%;
  overflow-y: auto;
}
.builder-page__sidebar--right {
  width: var(--layout-editor-panel-width);
  border-right: none;
  border-left: 1px solid var(--color-border);
}
.builder-page__workspace {
  flex-grow: 1;
}
</style>