<script setup lang="ts">
// В будущем здесь будет логика для рендеринга компонентов,
// обработки drag-and-drop и взаимодействия с элементами.
</script>

<template>
  <div class="canvas">
    <!-- Компоненты из UI Библиотеки будут добавляться сюда -->
  </div>
</template>

<style scoped lang="scss">

.canvas {
  width: 100%;
  max-width: 1200px;
  min-height: 100%;
  background-color: $color-bg-secondary;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  position: relative;
  transition: all $transition-duration ease;
}
</style>