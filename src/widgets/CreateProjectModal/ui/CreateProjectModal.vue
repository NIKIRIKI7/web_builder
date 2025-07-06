<script setup lang="ts">
import { ref, computed } from 'vue';
import { useModalStore } from '@/widgets/ModalManager/model/modalStore';
import { useI18nManager } from '@/shared/i18n/useI18nManager';
import { projectTemplates } from '@/shared/lib/project-templates';
import TemplateCard from '@/entities/ProjectTemplate/ui/TemplateCard.vue';
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/ui/icons';

const modalStore = useModalStore();
const { t } = useI18nManager();
const projectName = ref(t('dashboard.prompts.newProjectDefaultName'));

const allSelections = computed(() => [
  { id: null, name: t('dashboard.templates.blank'), canvasState: { componentInstances: [], selectedComponentInstanceId: null, isEditorOpen: false } },
  ...projectTemplates,
]);

const currentIndex = ref(0);
const totalSelections = computed(() => allSelections.value.length);

const currentSelection = computed(() => allSelections.value[currentIndex.value]);

const isDisabled = computed(() => !projectName.value.trim());

function nextTemplate() {
  currentIndex.value = (currentIndex.value + 1) % totalSelections.value;
}

function prevTemplate() {
  currentIndex.value = (currentIndex.value - 1 + totalSelections.value) % totalSelections.value;
}

function handleConfirm() {
  if (isDisabled.value) return;
  const { canvasState } = currentSelection.value;

  modalStore.resolve({
    name: projectName.value.trim(),
    canvasState: canvasState
  });
};

const handleCancel = () => {
  modalStore.reject('cancelled');
};
</script>

<template>
  <form class="create-project-modal" @submit.prevent="handleConfirm">
    <h3 class="create-project-modal__title">{{ t('dashboard.createProject') }}</h3>

    <div class="create-project-modal__body">
      <div class="create-project-modal__section">
        <label class="create-project-modal__label" for="project-name-input">{{ t('dashboard.prompts.newProjectTitle') }}</label>
        <input
          id="project-name-input"
          v-model="projectName"
          class="create-project-modal__input"
          type="text"
          autofocus
        />
      </div>

      <div class="create-project-modal__section">
        <div class="template-selector">
          <button type="button" class="template-selector__arrow-btn" @click="prevTemplate" aria-label="Previous template">
            <ArrowLeftIcon />
          </button>
          <div class="template-selector__card-container">
            <Transition name="fade" mode="out-in">
              <TemplateCard
                :key="currentSelection.id ?? 'blank'"
                :template="currentSelection.id === null ? null : currentSelection"
                :is-active="true"
                preview-height="120px"
                class="template-selector__card"
              />
            </Transition>
          </div>
          <button type="button" class="template-selector__arrow-btn" @click="nextTemplate" aria-label="Next template">
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>

    <div class="create-project-modal__actions">
      <button type="button" class="create-project-modal__button create-project-modal__button--cancel" @click="handleCancel">
        {{ t('buttons.cancel') }}
      </button>
      <button type="submit" class="create-project-modal__button create-project-modal__button--confirm" :disabled="isDisabled">
        {{ t('dashboard.createProject') }}
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.create-project-modal {
  width: 520px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
}

.create-project-modal__title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
}

.create-project-modal__body {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.create-project-modal__label {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 8px;
  display: block;
}

.create-project-modal__input {
  box-sizing: border-box;
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

.template-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.template-selector__arrow-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  transition: all 0.2s;

  @include on-event {
    background-color: var(--color-bg-primary);
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  svg {
    width: 24px;
    height: 24px;
  }
}

.template-selector__card-container {
  flex-grow: 1;
  min-height: 190px;
}

.template-selector__card {
  box-shadow: none !important;
  border-width: 2px;
  transform: none !important;

  &:hover {
    transform: none !important;
  }
}

.create-project-modal__actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 32px;
}

.create-project-modal__button {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;

  &--cancel {
    background-color: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text-primary);
    @include on-event {
      background-color: var(--color-bg-primary);
    }
  }

  &--confirm {
    background-color: var(--color-accent);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-accent);
    &:hover:not(:disabled) {
      background-color: var(--color-accent-hover);
      border-color: var(--color-accent-hover);
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.create-project-modal__section {
  display: flex;
  flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>