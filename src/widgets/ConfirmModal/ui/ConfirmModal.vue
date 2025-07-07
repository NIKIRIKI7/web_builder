<script setup lang="ts">
import { computed } from 'vue';

import { useI18nManager } from '@/shared/i18n/useI18nManager';
import { useModalStore } from '@/widgets/ModalManager/model/modalStore';

const props = defineProps<{
  title: string;
  message: string;
}>();

const modalStore = useModalStore();
const { t } = useI18nManager();

const messageParts = computed(() => {
  const parts = props.message.split(/<strong>(.*?)<\/strong>/);
  return parts.map((part, index) => ({
    text: part,
    isStrong: index % 2 === 1,
  }));
});

const handleConfirm = (): void => {
  modalStore.resolve(true);
};

const handleCancel = (): void => {
  modalStore.reject('cancelled');
};
</script>

<template>
  <div class="confirm-modal">
    <h3 class="confirm-modal__title">{{ title }}</h3>
    <p class="confirm-modal__message">
      <template v-for="(part, index) in messageParts" :key="index">
        <strong v-if="part.isStrong">{{ part.text }}</strong>
        <span v-else>{{ part.text }}</span>
      </template>
    </p>
    <div class="confirm-modal__actions">
      <button class="confirm-modal__button confirm-modal__button--cancel" @click="handleCancel">
        {{ t('buttons.cancel') }}
      </button>
      <button class="confirm-modal__button confirm-modal__button--confirm" @click="handleConfirm">
        {{ t('buttons.confirm') }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.confirm-modal {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.confirm-modal__title {
  font-size: 20px;
  font-weight: 600;
}
.confirm-modal__message {
  font-size: 16px;
  line-height: 1.5;
  opacity: 0.8;
}
.confirm-modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}
.confirm-modal__button {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;

  &--cancel {
    background-color: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text-primary);
    &:hover {
      background-color: var(--color-bg-primary);
    }
  }
  &--confirm {
    background-color: var(--color-danger);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-danger);
    &:hover {
      background-color: var(--color-danger-hover);
      border-color: var(--color-danger-hover);
    }
  }
}
</style>