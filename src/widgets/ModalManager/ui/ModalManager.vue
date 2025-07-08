<script setup lang="ts">
import BaseModal from '@/shared/ui/Modal/BaseModal.vue';

import { useModalStore } from '../model/modalStore';

const modalStore = useModalStore();

const handleClose = (): void => {
  modalStore.close();
};
</script>

<template>
  <BaseModal
      :is-open="modalStore.isOpen"
      @close="handleClose"
  >
    <component
        :is="modalStore.component"
        v-if="modalStore.component"
        v-bind="modalStore.props"
    />
  </BaseModal>
</template>

<style scoped lang="scss">
</style>