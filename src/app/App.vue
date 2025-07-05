// C:\Users\mcniki\Documents\stormprojects\Vue\web_builder\src\app\App.vue

<script setup lang="ts">
// Скриптовая часть остается без изменений
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
  color: #606266;
  background-color: $color-bg-primary;
}
</style>