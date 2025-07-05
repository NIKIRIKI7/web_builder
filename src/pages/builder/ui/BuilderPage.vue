<script setup lang="ts">
import TheHeader from '@/widgets/TheHeader/ui/TheHeader.vue';
import LayoutManager from '@/shared/layout/ui/LayoutManager.vue';
import { useLayoutStore } from '@/shared/layout/layoutStore';

const layoutStore = useLayoutStore();
</script>

<template>
  <div class="builder-page">
    <TheHeader />
    <main class="builder-page__main">
      <LayoutManager :node="layoutStore.layout" />
    </main>
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
}
.builder-page__main {
  flex-grow: 1;
  height: calc(100vh - var(--layout-header-height));
}
</style>