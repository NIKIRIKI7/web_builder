<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Project } from '../model/types';
import { useClickOutside } from '@/shared/lib/hooks/useClickOutside';
import { EditIcon, MoreHorizontalIcon, DeleteIcon } from '@/shared/ui/icons';
import { useI18nManager } from '@/shared/i18n/useI18nManager';

const props = defineProps<{
  project: Project;
}>();

const emit = defineEmits<{
  (e: 'delete-request', project: Project): void;
}>();

const { t } = useI18nManager();

const cardRef = ref<HTMLElement | null>(null);
const isOptionsOpen = ref(false);

useClickOutside(cardRef, () => {
  isOptionsOpen.value = false;
});

const formattedDate = computed(() => {
  return new Date(props.project.createdAt).toLocaleDateString();
});

const previewStyle = computed(() => {
  const thumbnail = props.project.thumbnail;
  if (!thumbnail) return {};

  if (thumbnail.startsWith('#') || thumbnail.startsWith('rgb')) {
    return { backgroundColor: thumbnail };
  }
  if (thumbnail.startsWith('data:image')) {
    return { backgroundImage: `url(${thumbnail})` };
  }
  return {};
});

function toggleOptions() {
  isOptionsOpen.value = !isOptionsOpen.value;
}

function handleDeleteRequest() {
  isOptionsOpen.value = false;
  emit('delete-request', props.project);
}
</script>

<template>
  <div class="project-card" ref="cardRef">
    <div class="project-card__header">
      <button class="project-card__options-btn" @click.stop="toggleOptions">
        <MoreHorizontalIcon />
      </button>
      <transition name="dropdown-fade">
        <div v-if="isOptionsOpen" class="project-card__options-menu">
          <button class="project-card__option-item project-card__option-item--delete" @click="handleDeleteRequest">
            <DeleteIcon />
            <span>{{ t('dashboard.card.delete') }}</span>
          </button>
        </div>
      </transition>
    </div>
    <div class="project-card__preview" :style="previewStyle">
      <h3 v-if="!project.thumbnail" class="project-card__name">{{ project.name }}</h3>
    </div>
    <div class="project-card__footer">
      <RouterLink :to="{ name: 'Builder', params: { projectId: project.id } }" class="project-card__edit-link">
        <EditIcon />
        <span>{{ t('dashboard.card.edit') }}</span>
      </RouterLink>
      <span class="project-card__date">{{ t('dashboard.card.createdOn') }} {{ formattedDate }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-bg-secondary);
  overflow: visible;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
}
.project-card__header {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
}
.project-card__options-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: var(--color-text-primary);
  opacity: 0.6;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-bg-primary);
    opacity: 1;
  }
}
.project-card__options-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  width: 150px;
  background-color: var(--color-bg-secondary);
  border-radius: 6px;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 6px;
  z-index: 20;
}
.project-card__option-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.2s;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background-color: var(--color-bg-primary);
  }

  &--delete {
    color: var(--color-danger);
    &:hover {
      background-color: var(--color-danger);
      color: var(--color-text-secondary);
    }
  }
}
.project-card__preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  padding: 20px;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg-primary);
  background-size: cover;
  background-position: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.project-card__name {
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 1px;
  color: var(--color-text-primary);
  text-align: center;
}
.project-card__footer {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}
.project-card__edit-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-accent);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: var(--color-accent-hover);
  }
}
.project-card__date {
  color: var(--color-text-primary);
  opacity: 0.6;
}
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>