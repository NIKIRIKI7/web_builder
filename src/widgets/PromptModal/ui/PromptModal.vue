<script setup lang="ts">
import { ref } from 'vue';
import { useModalStore } from '@/widgets/ModalManager/model/modalStore';
import { useI18nManager } from '@/shared/i18n/useI18nManager';

const props = defineProps<{
  title: string;
  initialValue?: string;
  label: string;
}>();

const modalStore = useModalStore();
const { t } = useI18nManager();
const inputValue = ref(props.initialValue || '');

const handleConfirm = () => {
  if (inputValue.value.trim()) {
    modalStore.resolve(inputValue.value.trim());
  }
};

const handleCancel = () => {
  modalStore.reject('cancelled');
};
</script>

<template>
  <form class="prompt-modal" @submit.prevent="handleConfirm">
    <h3 class="prompt-modal__title">{{ title }}</h3>
    <label class="prompt-modal__label" for="prompt-input">{{ label }}</label>
    <input
      id="prompt-input"
      v-model="inputValue"
      class="prompt-modal__input"
      type="text"
      autofocus
    />
    <div class="prompt-modal__actions">
      <button type="button" class="prompt-modal__button prompt-modal__button--cancel" @click="handleCancel">
        {{ t('buttons.cancel') }}
      </button>
      <button type="submit" class="prompt-modal__button prompt-modal__button--confirm">
        {{ t('buttons.ok') }}
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.prompt-modal {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.prompt-modal__title {
  font-size: 20px;
  font-weight: 600;
}
.prompt-modal__label {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: -8px;
}
.prompt-modal__input {
  width: 100%;
  padding: 10px 14px;
  font-size: 16px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  transition: border-color 0.2s, box-shadow 0.2s;
  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(var(--color-accent-rgb), 0.2);
  }
}
.prompt-modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}
.prompt-modal__button {
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
    background-color: var(--color-accent);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-accent);
    &:hover {
      background-color: var(--color-accent-hover);
      border-color: var(--color-accent-hover);
    }
  }
}
</style>