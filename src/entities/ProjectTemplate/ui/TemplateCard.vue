<script setup lang="ts">
import { computed } from 'vue';

import { useI18nManager } from '@/shared/i18n/useI18nManager';
import type { ProjectTemplate } from '@/shared/lib/project-templates';

interface Props {
  template?: ProjectTemplate | null;
  isActive: boolean;
  previewHeight?: string;
}

const props = withDefaults(defineProps<Props>(), {
  template: null,
  previewHeight: '80px',
});

const { t } = useI18nManager();

const isBlank = computed(() => !props.template);
const name = computed(() => (isBlank.value ? t('dashboard.templates.blank') : props.template?.name));
const thumbnailStyle = computed(() => ({
  backgroundColor: isBlank.value ? undefined : props.template?.thumbnail,
  height: props.previewHeight,
}));
</script>

<template>
  <button
    type="button"
    class="template-card"
    :class="{ 'template-card--active': isActive }"
  >
    <div
      class="template-card__preview"
      :class="{ 'template-card__preview--blank': isBlank }"
      :style="thumbnailStyle"
    ></div>
    <div class="template-card__content">
      <div class="template-card__name">{{ name }}</div>
    </div>
  </button>
</template>

<style scoped lang="scss">
.template-card {
  border: 2px solid var(--color-border);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--color-bg-secondary);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &:hover {
    border-color: var(--color-accent);
  }

  &--active {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px rgba(var(--color-accent-rgb), 0.2);
  }
}

.template-card__preview {
  border-radius: 4px;
  margin-bottom: 12px;
  flex-shrink: 0;

  &--blank {
    border: 2px dashed var(--color-border);
    background-color: var(--color-bg-primary);
  }
}

.template-card__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}

.template-card__name {
  font-weight: 500;
  color: var(--color-text-primary);
}
</style>