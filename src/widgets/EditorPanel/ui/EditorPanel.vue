<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCanvasStore } from '@/features/Canvas/model/canvasStore';

const canvasStore = useCanvasStore();
const activeTab = ref('content');

// --- Computed properties для КОНТЕНТА ---
const headerLogoText = computed({
  get: () => canvasStore.selectedComponent?.props.logoText ?? '',
  set: (value) => { if (canvasStore.selectedComponent) canvasStore.updateComponentProps({ instanceId: canvasStore.selectedComponent.instanceId, newProps: { logoText: value } }) },
});
const headerCtaText = computed({
  get: () => canvasStore.selectedComponent?.props.ctaText ?? '',
  set: (value) => { if (canvasStore.selectedComponent) canvasStore.updateComponentProps({ instanceId: canvasStore.selectedComponent.instanceId, newProps: { ctaText: value } }) },
});
const footerCopyrightText = computed({
  get: () => canvasStore.selectedComponent?.props.copyrightText ?? '',
  set: (value) => { if (canvasStore.selectedComponent) canvasStore.updateComponentProps({ instanceId: canvasStore.selectedComponent.instanceId, newProps: { copyrightText: value } }) },
});

// --- Computed properties для СТИЛЕЙ ---
const backgroundColor = computed({
  get: () => canvasStore.selectedComponent?.styles.backgroundColor ?? '#ffffff',
  set: (value) => { if (canvasStore.selectedComponent) canvasStore.updateComponentStyles({ instanceId: canvasStore.selectedComponent.instanceId, newStyles: { backgroundColor: value } }) },
});
const createStylePxProperty = (styleName: string) => computed({
  get: () => parseInt(canvasStore.selectedComponent?.styles[styleName] ?? '0px', 10),
  set: (value) => { if (canvasStore.selectedComponent && typeof value === 'number') canvasStore.updateComponentStyles({ instanceId: canvasStore.selectedComponent.instanceId, newStyles: { [styleName]: `${value}px` } }) },
});
const paddingTop = createStylePxProperty('paddingTop');
const paddingBottom = createStylePxProperty('paddingBottom');
const paddingLeft = createStylePxProperty('paddingLeft');
const paddingRight = createStylePxProperty('paddingRight');

function handleDelete() {
  if (canvasStore.selectedComponent) {
    canvasStore.deleteComponent(canvasStore.selectedComponent.instanceId);
  }
}
</script>

<template>
  <div class="editor-panel">
    <div v-if="canvasStore.selectedComponent" class="editor-panel__content">
      <div class="editor-panel__header">
        <h2 class="editor-panel__title">{{ canvasStore.selectedComponent.componentInfo.name }}</h2>
        <div class="editor-panel__tabs">
          <button class="editor-panel__tab" :class="{ 'editor-panel__tab--active': activeTab === 'content' }" @click="activeTab = 'content'">Content</button>
          <button class="editor-panel__tab" :class="{ 'editor-panel__tab--active': activeTab === 'styles' }" @click="activeTab = 'styles'">Styles</button>
        </div>
      </div>

      <div class="editor-panel__body">
        <div v-show="activeTab === 'content'">
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
          <div v-if="canvasStore.selectedComponent.componentInfo.id === 'simple-footer-v1'">
            <div class="editor-panel__property">
              <label class="editor-panel__label">Copyright Text</label>
              <textarea v-model="footerCopyrightText" class="editor-panel__input editor-panel__textarea"></textarea>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'styles'">
          <div class="editor-panel__property">
            <label class="editor-panel__label">Background Color</label>
            <div class="editor-panel__color-input-wrapper">
              <input v-model="backgroundColor" type="color" class="editor-panel__color-input" />
              <span class="editor-panel__color-value">{{ backgroundColor }}</span>
            </div>
          </div>
          <div class="editor-panel__property">
            <label class="editor-panel__label">Padding (px)</label>
            <div class="editor-panel__grid-4">
              <input v-model.number="paddingTop" type="number" placeholder="Top" class="editor-panel__input" />
              <input v-model.number="paddingBottom" type="number" placeholder="Bottom" class="editor-panel__input" />
              <input v-model.number="paddingLeft" type="number" placeholder="Left" class="editor-panel__input" />
              <input v-model.number="paddingRight" type="number" placeholder="Right" class="editor-panel__input" />
            </div>
          </div>
        </div>
      </div>

      <div class="editor-panel__footer">
        <button class="editor-panel__delete-btn" @click="handleDelete">
          Delete Component
        </button>
      </div>
    </div>

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
  padding: 16px 16px 0;
  border-bottom: 1px solid $color-border;
  flex-shrink: 0;
}

.editor-panel__title {
  font-size: 18px;
  font-weight: 600;
  padding: 0 0 16px 0;
}

.editor-panel__tabs {
  display: flex;
}

.editor-panel__tab {
  flex: 1;
  padding: 10px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  transition: all 0.2s;
  margin-bottom: -1px;

  &--active {
    color: #3498db;
    border-bottom-color: #3498db;
  }
}

.editor-panel__body {
  padding: 16px;
  overflow-y: auto;
  flex-grow: 1;
}

.editor-panel__property:not(:last-child) { margin-bottom: 16px; }
.editor-panel__label { display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #606266; }
.editor-panel__input { width: 100%; padding: 8px 12px; font-size: 14px; border: 1px solid $color-border; border-radius: 4px; background-color: $color-bg-secondary; color: $color-text-primary; transition: border-color 0.2s; }
.editor-panel__input:focus { outline: none; border-color: #3498db; }
.editor-panel__textarea { min-height: 80px; resize: vertical; font-family: inherit; }
.editor-panel__color-input-wrapper { display: flex; align-items: center; gap: 10px; }
.editor-panel__color-value { font-family: monospace; background-color: $color-bg-primary; padding: 4px 8px; border-radius: 4px; }
.editor-panel__color-input { -webkit-appearance: none; -moz-appearance: none; appearance: none; width: 32px; height: 32px; padding: 0; border: 1px solid $color-border; border-radius: 6px; background-color: transparent; cursor: pointer; }
.editor-panel__color-input::-webkit-color- swatch { border-radius: 5px; border: none; }
.editor-panel__color-input::-moz-color-swatch { border-radius: 5px; border: none; }
.editor-panel__grid-4 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

.editor-panel__footer {
  padding: 16px;
  border-top: 1px solid $color-border;
  background-color: #fafafa;
  flex-shrink: 0;
}

.editor-panel__delete-btn {
  width: 100%;
  padding: 10px;
  background-color: #fef0f0;
  color: #f56c6c;
  border: 1px solid #fde2e2;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f56c6c;
    color: white;
    border-color: #f56c6c;
  }
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
.editor-panel__placeholder-icon { margin-bottom: 12px; color: #c0c4cc; }
.editor-panel__placeholder-text { font-size: 15px; }
</style>