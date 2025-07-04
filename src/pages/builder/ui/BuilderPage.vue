<script setup lang="ts">
import TheHeader from '@/widgets/TheHeader/ui/TheHeader.vue';
import Workspace from '@/widgets/Workspace/ui/Workspace.vue';
import UiLibrary from '@/widgets/UiLibrary/ui/UiLibrary.vue';
</script>

<template>
  <div class="builder-page">
    <TheHeader />
    <main class="builder-page__main">
      <aside class="builder-page__sidebar builder-page__sidebar--left">
        <UiLibrary />
      </aside>
      <Workspace class="builder-page__workspace" />
      <aside class="builder-page__sidebar builder-page__sidebar--right">
        <!-- Редактор будет здесь -->
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
</style>