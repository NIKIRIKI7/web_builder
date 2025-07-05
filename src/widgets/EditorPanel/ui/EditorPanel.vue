<script setup lang="ts">
import { ref, watch, shallowRef } from 'vue';
import { useCanvasManager } from '@/features/Canvas/model/useCanvasManager';
import { getEditorConfig } from '@/entities/UiComponent/model/registry';
import type { EditorConfiguration } from '@/entities/UiComponent/model/types';
import type { ComponentScript, FullRenderedComponent } from '@/features/Canvas/model/canvasStore';
import EditorControl from './EditorControl.vue';
import ScriptManager from './ScriptManager.vue';
import { SelectIcon } from '@/shared/ui/icons';

const canvasManager = useCanvasManager();
const { selectedComponent } = canvasManager;

const activeTabName = ref('');
const editorConfig = shallowRef<EditorConfiguration | null>(null);

watch(selectedComponent, async (newComponent, oldComponent) => {
  const newComponentId = newComponent?.componentDefinition.id;
  const oldComponentId = oldComponent?.componentDefinition.id;

  if (newComponentId === oldComponentId) {
    return;
  }

  if (newComponent) {
    editorConfig.value = await getEditorConfig(newComponent.componentDefinition.id);
    if (editorConfig.value?.tabs?.length) {
      activeTabName.value = editorConfig.value.tabs[0].name;
    }
  } else {
    editorConfig.value = null;
    activeTabName.value = '';
  }
}, { immediate: true });

function updateValue(target: 'props' | 'styles', fieldName: string, value: any) {
  if (!selectedComponent.value) return;
  const { instanceId } = selectedComponent.value;
  const payload = { instanceId, newValues: { [fieldName]: value } };
  if (target === 'props') {
    canvasManager.updateComponentProps(payload);
  } else {
    canvasManager.updateComponentStyles(payload);
  }
}

function handleAddScript() {
  if (!selectedComponent.value) return;
  canvasManager.addScript(selectedComponent.value.instanceId);
}
function handleUpdateScript(script: ComponentScript) {
  if (!selectedComponent.value) return;
  canvasManager.updateScript({ instanceId: selectedComponent.value.instanceId, script });
}
function handleDeleteScript(scriptId: string) {
  if (!selectedComponent.value) return;
  canvasManager.deleteScript({ instanceId: selectedComponent.value.instanceId, scriptId });
}

function handleDelete() {
  if (selectedComponent.value) {
    canvasManager.deleteComponent(selectedComponent.value.instanceId);
  }
}
</script>

<template>
  <div class="editor-panel">
    <div v-if="selectedComponent && editorConfig" class="editor-panel__content">
      <div class="editor-panel__header">
        <h2 class="editor-panel__title">{{ selectedComponent.componentDefinition.name }}</h2>
        <div v-if="editorConfig.tabs.length > 1" class="editor-panel__tabs">
          <button
            v-for="tab in editorConfig.tabs"
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
        <template v-for="tab in editorConfig.tabs" :key="tab.name">
          <div v-show="activeTabName === tab.name">
            <template v-if="tab.target === 'props' || tab.target === 'styles'">
              <EditorControl
                v-for="field in tab.fields"
                :key="field.name"
                :field="field"
                :model-value="selectedComponent[tab.target][field.name]"
                @update:model-value="updateValue(tab.target, field.name, $event)"
              />
            </template>
            <template v-else-if="tab.target === 'script'">
              <ScriptManager
                :scripts="selectedComponent.scripts"
                @add-script="handleAddScript"
                @update-script="handleUpdateScript"
                @delete-script="handleDeleteScript"
              />
            </template>
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
        <SelectIcon />
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
  color: var(--color-text-primary);
  background-color: var(--color-bg-secondary);
}
.editor-panel__content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.editor-panel__header {
  padding: 16px 16px 0;
  border-bottom: 1px solid var(--color-border);
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
  color: var(--color-text-primary);
  transition: all 0.2s;
  margin-bottom: -1px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
    color: var(--color-accent);
  }
  &--active {
    opacity: 1;
    color: var(--color-accent);
    border-bottom-color: var(--color-accent);
  }
}
.editor-panel__body {
  padding: 16px;
  overflow-y: auto;
  flex-grow: 1;
}
.editor-panel__footer {
  padding: 16px;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-bg-primary);
  flex-shrink: 0;
}
.editor-panel__delete-btn {
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: var(--color-danger);
  border: 1px solid var(--color-danger);
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-danger);
    color: var(--color-text-secondary);
    border-color: var(--color-danger);
  }
}
.editor-panel__placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  color: var(--color-text-primary);
  opacity: 0.5;
  padding: 20px;
}
.editor-panel__placeholder-icon {
  margin-bottom: 16px;
}
.editor-panel__placeholder-text {
  font-size: 15px;
}
</style>