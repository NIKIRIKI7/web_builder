<script setup lang="ts">
import { useI18nManager } from '@/shared/i18n/useI18nManager';
import { AddIcon } from '@/shared/ui/icons';

defineEmits<{
  create: [];
}>();

const { t } = useI18nManager();
</script>

<template>
  <button class="create-project-card" @click="$emit('create')">
    <div class="create-project-card__icon">
      <AddIcon />
    </div>
    <span class="create-project-card__text">{{ t('dashboard.createProject') }}</span>
  </button>
</template>

<style scoped lang="scss">
.create-project-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  min-height: 257px;
  border: 2px dashed var(--color-border);
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-text-primary);
  opacity: 0.7;

  &:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
    background-color: rgba(var(--color-accent-rgb), 0.05);
    opacity: 1;
  }
}

.create-project-card__icon {
  margin-bottom: 16px;

  svg {
    width: 48px;
    height: 48px;
  }
}

.create-project-card__text {
  font-size: 16px;
  font-weight: 500;
}
</style>