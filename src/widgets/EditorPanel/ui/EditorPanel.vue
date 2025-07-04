<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useCanvasStore } from '@/features/Canvas/model/canvasStore';
import EditorControl from './EditorControl.vue';

const canvasStore = useCanvasStore();

const activeTabName = ref('');
const selectedComponent = computed(() => canvasStore.selectedComponent);

watch(selectedComponent, (newComponent) => {
  if (newComponent?.componentInfo.editorTabs?.length) {
    activeTabName.value = newComponent.componentInfo.editorTabs[0].name;
  } else {
    activeTabName.value = '';
  }
}, { immediate: true });

function updateValue(target: 'props' | 'styles', fieldName: string, value: any) {
  if (!selectedComponent.value) return;

  const { instanceId } = selectedComponent.value;
  const payload = { instanceId, newValues: { [fieldName]: value } };

  if (target === 'props') {
    canvasStore.updateComponentProps(payload);
  } else {
    canvasStore.updateComponentStyles(payload);
  }
}

function handleDelete() {
  if (selectedComponent.value) {
    canvasStore.deleteComponent(selectedComponent.value.instanceId);
  }
}
</script>

<template>
  <div class="editor-panel">
    <div v-if="selectedComponent" class="editor-panel__content">
      <div class="editor-panel__header">
        <h2 class="editor-panel__title">{{ selectedComponent.componentInfo.name }}</h2>
        <div v-if="selectedComponent.componentInfo.editorTabs?.length > 1" class="editor-panel__tabs">
          <button
              v-for="tab in selectedComponent.componentInfo.editorTabs"
              :key="tab.name"
              class="editor-panel__tab"
              :class="{ 'editor-panel__tab--active': activeTabName === tab.name }"
              @click="activeTabName = tab.name"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>

      <div class="editor-panel__body">
        <template v-for="tab in selectedComponent.componentInfo.editorTabs" :key="tab.name">
          <div v-show="activeTabName === tab.name">
            <EditorControl
                v-for="field in tab.fields"
                :key="field.name"
                :field="field"
                :model-value="selectedComponent[tab.target][field.name]"
                @update:model-value="updateValue(tab.target, field.name, $event)"
            />
          </div>
        </template>
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
  margin: 0 -16px;
  padding: 0 16px;
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
  &:hover {
    color: #34495e;
  }
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
.editor-panel__footer {
  padding: 16px;
  border-top: 1px solid $color-border;
  background-color: $color-bg-primary;
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
.editor-panel__placeholder-icon {
  margin-bottom: 12px;
  color: #c0c4cc;
}
.editor-panel__placeholder-text {
  font-size: 15px;
}
</style>