<script setup lang="ts">
defineEmits(['close']);
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div class="modal" @mousedown.self="$emit('close')">
        <div class="modal__container">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal {
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

.modal__container {
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 24px 32px;
  overflow: visible;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal__container,
.modal-fade-leave-active .modal__container {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from .modal__container,
.modal-fade-leave-to .modal__container {
  transform: translateY(-20px) scale(0.98);
}
</style>