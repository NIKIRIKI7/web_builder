<script setup lang="ts">
import { klona } from 'klona/lite';
import { computed } from 'vue';

import type { ComponentScript } from '@/entities/Canvas/model/types';
import { actionRegistry, actionRegistryMap } from '@/features/ScriptActions/model/registry';
import { useI18nManager } from '@/shared/i18n/useI18nManager';
import { DeleteIcon, AddIcon } from '@/shared/ui/icons';

import EditorControl from './EditorControl.vue';

defineProps<{
  scripts: ComponentScript[] | undefined;
}>();

const emit = defineEmits<{
  'add-script': [];
  'update-script': [payload: ComponentScript];
  'delete-script': [scriptId: string];
}>();

const { t } = useI18nManager();

const triggerTypeOptions = [
  { label: 'On Click', value: 'onClick' },
  { label: 'On Mount', value: 'onMount' }
];

const actionTypeOptions = computed(() =>
    actionRegistry.map(action => ({
      label: action.label,
      value: action.type,
    }))
);

function handleTriggerUpdate(script: ComponentScript, newValues: Partial<ComponentScript['trigger']>) {
  const newScript = klona(script);
  newScript.trigger = { ...newScript.trigger, ...newValues };
  emit('update-script', newScript);
}

function handleActionTypeUpdate(script: ComponentScript, actionIndex: number, newType: string) {
  const newScript = klona(script);
  newScript.actions[actionIndex].type = newType;
  newScript.actions[actionIndex].params = {};
  emit('update-script', newScript);
}

function handleActionParamUpdate(script: ComponentScript, actionIndex: number, paramName: string, value: unknown) {
  const newScript = klona(script);
  if (!newScript.actions[actionIndex].params) {
    newScript.actions[actionIndex].params = {};
  }
  newScript.actions[actionIndex].params[paramName] = value;
  emit('update-script', newScript);
}

function addAction(script: ComponentScript) {
  const newScript = klona(script);
  if(!newScript.actions) {
    newScript.actions = [];
  }
  newScript.actions.push({ id: `action_${Date.now()}`, type: actionRegistry[0].type, params: {} });
  emit('update-script', newScript);
}

function deleteAction(script: ComponentScript, actionIndex: number) {
  const newScript = klona(script);
  newScript.actions.splice(actionIndex, 1);
  emit('update-script', newScript);
}

function getActionFields(actionType: string) {
  return actionRegistryMap.get(actionType)?.fields || [];
}
</script>

<template>
  <div class="script-manager">
    <div v-if="!scripts || !scripts.length" class="script-manager__placeholder">
      <p>{{ t('editor.scripts.placeholder') }}</p>
    </div>

    <div v-for="script in scripts" :key="script.id" class="script-item">
      <div class="script-item__header">
        <span class="script-item__title">{{ t('editor.scripts.title') }}</span>
        <button class="script-item__delete-btn" @click="emit('delete-script', script.id)">
          {{ t('editor.buttons.deleteScript') }}
        </button>
      </div>

      <div class="script-item__trigger">
        <h4 class="script-item__section-title">{{ t('editor.scripts.triggerSectionTitle') }}</h4>
        <EditorControl
            :field="{ name: 'triggerType', label: 'triggerType', type: 'select', options: triggerTypeOptions }"
            :model-value="script.trigger.type"
            @update:model-value="handleTriggerUpdate(script, { type: $event as 'onMount' | 'onClick' })"
        />
        <EditorControl
            v-if="script.trigger.type === 'onClick'"
            :field="{ name: 'selector', label: 'targetSelector', type: 'text' }"
            :model-value="script.trigger.selector"
            @update:model-value="handleTriggerUpdate(script, { selector: $event as string })"
        />
      </div>

      <div class="script-item__actions">
        <h4 class="script-item__section-title">{{ t('editor.scripts.actionsSectionTitle') }}</h4>
        <div v-if="!script.actions || !script.actions.length" class="action-item__placeholder">
        </div>
        <div v-for="(action, index) in script.actions" :key="action.id" class="action-item">
          <div class="action-item__header">
            <EditorControl
                :field="{ name: 'actionType', label: 'actionType', type: 'select', options: actionTypeOptions }"
                :model-value="action.type"
                @update:model-value="handleActionTypeUpdate(script, index, $event as string)"
            />
            <button class="action-item__delete-btn" @click="deleteAction(script, index)">
              <DeleteIcon />
            </button>
          </div>
          <div class="action-item__fields">
            <EditorControl
                v-for="field in getActionFields(action.type)"
                :key="field.name"
                :field="field"
                :model-value="action.params?.[field.name]"
                @update:model-value="handleActionParamUpdate(script, index, field.name, $event)"
            />
          </div>
        </div>
        <button class="script-item__add-action-btn" @click="addAction(script)">
          <AddIcon /> {{ t('editor.buttons.addAction') }}
        </button>
      </div>
    </div>

    <button class="script-manager__add-btn" @click="emit('add-script')">
      {{ t('editor.buttons.addScript') }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.script-manager {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.script-manager__placeholder {
  text-align: center;
  color: var(--color-text-primary);
  opacity: 0.6;
  padding: 20px;
  border: 1px dashed var(--color-border);
  border-radius: 4px;
}
.script-item {
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background-color: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.script-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid var(--color-border);
}
.script-item__title {
  font-weight: 600;
  font-size: 15px;
}
.script-item__delete-btn {
  background: none;
  border: 1px solid var(--color-danger);
  color: var(--color-danger);
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: var(--color-danger);
    color: var(--color-text-secondary);
  }
}
.script-item__trigger, .script-item__actions {
  padding: 0 12px 12px;
}
.script-item__section-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
  opacity: 0.8;
}
.action-item {
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 10px;
  background: var(--color-bg-secondary);
  &:not(:last-of-type) {
    margin-bottom: 12px;
  }
}
.action-item__placeholder {
  padding: 1rem;
  text-align: center;
  opacity: 0.7;
  font-style: italic;
}
.action-item__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}
.action-item__delete-btn {
  flex-shrink: 0;
  margin-top: 24px;
  opacity: 0.6;
  transition: all 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  &:hover {
    color: var(--color-danger);
    opacity: 1;
  }
}
.action-item__fields {
  margin-top: 12px;
}
.script-item__add-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  padding: 6px;
  margin-top: 12px;
  font-size: 13px;
  border: 1px dashed var(--color-border);
  color: var(--color-text-primary);
  opacity: 0.7;
  transition: all 0.2s;
  background: none;
  cursor: pointer;
  &:hover {
    opacity: 1;
    color: var(--color-accent);
    border-color: var(--color-accent);
  }
  svg { width: 16px; height: 16px; }
}
.script-manager__add-btn {
  width: 100%;
  padding: 10px;
  background-color: transparent;
  border: 1px solid var(--color-success);
  color: var(--color-success);
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: var(--color-success);
    color: var(--color-text-secondary);
  }
}
</style>