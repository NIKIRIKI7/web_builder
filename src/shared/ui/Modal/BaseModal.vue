<script setup lang="ts">
defineEmits<{
  close: [];
}>();
</script>

<template>
  <Teleport to="body">
    <div class="base-modal" @mousedown.self="$emit('close')">
      <div class="base-modal__container">
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.base-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.base-modal__container {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 24px 32px;
  overflow: visible;
}
</style>