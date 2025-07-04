<script setup lang="ts">
</script>

<template>
  <header class="the-header">
    <div class="the-header__logo">Web Builder</div>
  </header>
</template>

<style scoped lang="scss">
.the-header {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: $header-height;
  padding: 0 24px;
  background-color: $color-bg-secondary;
  border-bottom: 1px solid $color-border;
  z-index: $z-index-header;

  &__logo {
    font-size: 20px;
    font-weight: 600;
    color: $color-text-primary;
  }
}
</style>