<script setup lang="ts">
import { computed } from 'vue';
import { useCanvasStore } from '@/features/Canvas/model/canvasStore';

const canvasStore = useCanvasStore();

// --- Computed property для SimpleHeader: Logo Text ---
const headerLogoText = computed({
  get: () => canvasStore.selectedComponent?.props.logoText ?? '',
  set: (value) => {
    if (canvasStore.selectedComponent) {
      canvasStore.updateComponentProps({
        instanceId: canvasStore.selectedComponent.instanceId,
        newProps: { logoText: value },
      });
    }
  },
});

// --- Computed property для SimpleHeader: Button Text ---
const headerCtaText = computed({
  get: () => canvasStore.selectedComponent?.props.ctaText ?? '',
  set: (value) => {
    if (canvasStore.selectedComponent) {
      canvasStore.updateComponentProps({
        instanceId: canvasStore.selectedComponent.instanceId,
        newProps: { ctaText: value },
      });
    }
  },
});

// --- Computed property для SimpleFooter: Copyright Text ---
const footerCopyrightText = computed({
  get: () => canvasStore.selectedComponent?.props.copyrightText ?? '',
  set: (value) => {
    if (canvasStore.selectedComponent) {
      canvasStore.updateComponentProps({
        instanceId: canvasStore.selectedComponent.instanceId,
        newProps: { copyrightText: value },
      });
    }
  },
});
</script>

<template>
  <div class="editor-panel">
    <!-- Блок, который показывается, когда компонент выбран -->
    <div v-if="canvasStore.selectedComponent" class="editor-panel__content">
      <div class="editor-panel__header">
        <h2 class="editor-panel__title">{{ canvasStore.selectedComponent.componentInfo.name }}</h2>
      </div>
      <div class="editor-panel__body">
        <!-- Редактор для Simple Header -->
        <div v-if="canvasStore.selectedComponent.componentInfo.id === 'simple-header-v1'">
          <div class="editor-panel__property">
            <label class="editor-panel__label">Logo Text</label>
            <input v-model="headerLogoText" type="text" class="editor-panel__input" />
          </div>
          <div class="editor-panel__property">
            <label class="editor-panel__label">Button Text</label>
            <input v-model="headerCtaText" type="text" class="editor-panel__input" />
          </div>
        </div>

        <!-- Редактор для Simple Footer -->
        <div v-if="canvasStore.selectedComponent.componentInfo.id === 'simple-footer-v1'">
          <div class="editor-panel__property">
            <label class="editor-panel__label">Copyright Text</label>
            <textarea v-model="footerCopyrightText" class="editor-panel__input editor-panel__textarea"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Блок-плейсхолдер, который показывается, когда ничего не выбрано -->
    <div v-else class="editor-panel__placeholder">
      <div class="editor-panel__placeholder-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path><path d="M12 18h.01"></path><path d="M12 14v-4"></path></svg>
      </div>
      <p class="editor-panel__placeholder-text">Select a component to edit</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.editor-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: $color-text-primary;
}

.editor-panel__content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.editor-panel__header {
  padding: 16px;
  border-bottom: 1px solid $color-border;
  flex-shrink: 0;
}

.editor-panel__title {
  font-size: 18px;
  font-weight: 600;
}

.editor-panel__body {
  padding: 16px;
  overflow-y: auto;
  flex-grow: 1;
}

.editor-panel__property {
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
}

.editor-panel__label {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

.editor-panel__input {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid $color-border;
  border-radius: 4px;
  background-color: $color-bg-secondary;
  color: $color-text-primary;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
}

.editor-panel__textarea {
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
}

.editor-panel__placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  color: #909399;
  padding: 20px;
}

.editor-panel__placeholder-icon {
  margin-bottom: 12px;
  color: #c0c4cc;
}

.editor-panel__placeholder-text {
  font-size: 15px;
}
</style>