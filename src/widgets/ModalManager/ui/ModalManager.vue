<script setup lang="ts">
import { useModalStore } from '../model/modalStore';
import Modal from '@/shared/ui/Modal/Modal.vue';

const modalStore = useModalStore();

const handleClose = () => {
  modalStore.close();
};
</script>

<template>
  <Modal v-if="modalStore.isOpen" @close="handleClose">
    <component :is="modalStore.component" v-bind="modalStore.props" />
  </Modal>
</template>