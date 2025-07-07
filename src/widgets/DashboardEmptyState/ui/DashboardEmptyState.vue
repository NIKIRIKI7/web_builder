<script setup lang="ts">
import { useI18nManager } from '@/shared/i18n/useI18nManager';
import { RocketIcon } from '@/shared/ui/icons';

defineEmits<{
  create: [];
}>();

const { t } = useI18nManager();
</script>

<template>
  <div class="dashboard-empty-state">
    <div class="dashboard-empty-state__icon">
      <RocketIcon />
    </div>
    <h2 class="dashboard-empty-state__title">
      {{ t('dashboard.emptyState.title') }}
    </h2>
    <p class="dashboard-empty-state__subtitle">
      {{ t('dashboard.emptyState.subtitle') }}
    </p>
    <button class="dashboard-empty-state__cta" @click="$emit('create')">
      {{ t('dashboard.createProject') }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.dashboard-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 64px 24px;
  border: 2px dashed var(--color-border);
  border-radius: 12px;
  background-color: var(--color-bg-secondary);
  height: 100%;
  min-height: 400px;
}

.dashboard-empty-state__icon {
  margin-bottom: 24px;
  color: var(--color-accent);
  svg {
    width: 64px;
    height: 64px;
  }
}

.dashboard-empty-state__title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text-primary);
}

.dashboard-empty-state__subtitle {
  font-size: 16px;
  max-width: 450px;
  margin-bottom: 32px;
  color: var(--color-text-primary);
  opacity: 0.7;
  line-height: 1.6;
}

.dashboard-empty-state__cta {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-secondary);
  background-color: var(--color-accent);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  @include on-event {
    background-color: var(--color-accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--color-accent-rgb), 0.2);
  }
}
</style>