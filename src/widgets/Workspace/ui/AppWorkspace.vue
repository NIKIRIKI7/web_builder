<script setup lang="ts">
import Canvas from './Canvas.vue';
</script>

<template>
  <div class="app-workspace">
    <Canvas />
  </div>
</template>

<style scoped lang="scss">
.app-workspace {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  overflow: auto;
  height: 100%;
  background-color: $color-bg-primary;
}
</style>