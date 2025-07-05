<script setup lang="ts">
import { useThemeManager } from '@/shared/theme/useThemeManager';

useThemeManager();
</script>

<template>
  <Suspense>
    <template #default>
      <RouterView />
    </template>

    <template #fallback>
      <div class="app-loader">
        Loading Builder...
      </div>
    </template>
  </Suspense>
</template>

<style scoped lang="scss">
.app-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-size: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
}
</style>