<script setup lang="ts">
import { ref, watch, shallowRef } from 'vue';
import { useCanvasManager } from '@/features/Canvas/model/useCanvasManager';
import { useCanvasState } from '@/features/Canvas/model/useCanvasState';
import { getEditorConfig } from '@/entities/UiComponent/model/registry';
import type { EditorConfiguration, EditorTarget } from '@/entities/UiComponent/model/types';
import type { ComponentScript } from '@/features/Canvas/model/canvasStore';
import { EDITOR_TARGET } from '@/entities/UiComponent/model/constants';
import EditorControl from './EditorControl.vue';
import ScriptManager from './ScriptManager.vue';
import { SelectIcon, CloseIcon } from '@/shared/ui/icons';
import { useI18nManager } from '@/shared/i18n/useI18nManager';

const { selectedComponent } = useCanvasState();
const canvasManager = useCanvasManager();
const { t } = useI18nManager();

const activeTabName = ref('');
const editorConfig = shallowRef<EditorConfiguration | null>(null);

watch(selectedComponent, async (newComponent, oldComponent) => {
  const newComponentId = newComponent?.componentDefinition.id;
  const oldComponentId = oldComponent?.componentDefinition.id;

  if (newComponentId === oldComponentId && newComponent) {
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

function updateValue(target: EditorTarget, fieldName: string, value: any) {
  if (!selectedComponent.value) return;
  const { instanceId } = selectedComponent.value;
  const payload = { instanceId, newValues: { [fieldName]: value } };
  if (target === EDITOR_TARGET.PROPS) {
    canvasManager.updateComponentProps(payload);
  } else if (target === EDITOR_TARGET.STYLES) {
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
        <h2 class="editor-panel__title">{{ t(`components.names.${selectedComponent.componentDefinition.name}`) }}</h2>
        <button class="editor-panel__close-btn" :title="t('buttons.close', 'Close')" @click="canvasManager.closeEditor()">
          <CloseIcon class="editor-panel__close-icon"/>
        </button>
      </div>

      <div class="editor-panel__tabs">
        <button
          v-for="tab in editorConfig.tabs"
          :key="tab.name"
          class="editor-panel__tab"
          :class="{ 'editor-panel__tab--active': activeTabName === tab.name }"
          @click="activeTabName = tab.name"
        >
          {{ t(`editor.tabs.${tab.name.toLowerCase()}`) }}
        </button>
      </div>

      <div class="editor-panel__body">
        <template v-for="tab in editorConfig.tabs" :key="tab.name">
          <div v-show="activeTabName === tab.name">
            <template v-if="tab.target === EDITOR_TARGET.PROPS || tab.target === EDITOR_TARGET.STYLES">
              <EditorControl
                v-for="field in tab.fields"
                :key="field.name"
                :field="field"
                :model-value="selectedComponent[tab.target][field.name]"
                @update:model-value="updateValue(tab.target, field.name, $event)"
              />
            </template>
            <template v-else-if="tab.target === EDITOR_TARGET.SCRIPT">
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
          {{ t('editor.buttons.delete') }}
        </button>
      </div>

    </div>

    <div v-else class="editor-panel__placeholder">
      <div class="editor-panel__placeholder-icon">
        <SelectIcon />
      </div>
      <p class="editor-panel__placeholder-text">{{ t('editor.placeholder.text') }}</p>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}
.editor-panel__title {
  font-size: 16px;
  font-weight: 600;
}
.editor-panel__close-btn {
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-primary);
  opacity: 0.6;
  transition: all 0.2s;

  .editor-panel__close-icon {
    width: 20px;
    height: 20px;
  }

  &:hover {
    opacity: 1;
    background-color: var(--color-bg-primary);
    transform: rotate(90deg);
  }
}
.editor-panel__tabs {
  display: flex;
  padding: 0 16px;
  border-bottom: 1px solid var(--color-border);
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