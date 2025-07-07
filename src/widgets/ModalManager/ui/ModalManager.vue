<script setup lang="ts">
import BaseModal from '@/shared/ui/Modal/BaseModal.vue';

import { useModalStore } from '../model/modalStore';

const modalStore = useModalStore();

const handleClose = (): void => {
  modalStore.close();
};
</script>

<template>
  <Transition name="modal-fade">
    <BaseModal v-if="modalStore.isOpen" @close="handleClose">
      <component :is="modalStore.component" v-bind="modalStore.props" />
    </BaseModal>
  </Transition>
</template>

<style scoped lang="scss">
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active :deep(.base-modal__container),
.modal-fade-leave-active :deep(.base-modal__container) {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from :deep(.base-modal__container),
.modal-fade-leave-to :deep(.base-modal__container) {
  transform: translateY(-20px) scale(0.98);
}
</style>