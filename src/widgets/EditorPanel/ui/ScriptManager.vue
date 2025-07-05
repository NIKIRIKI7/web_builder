<script setup lang="ts">
import type { ComponentScript } from '@/features/Canvas/model/canvasStore';
import type { EditorField } from '@/entities/UiComponent/model/types';
import EditorControl from './EditorControl.vue';

defineProps<{
  scripts: ComponentScript[] | undefined;
}>();

const emit = defineEmits<{
  (e: 'add-script'): void;
  (e: 'update-script', payload: ComponentScript): void;
  (e: 'delete-script', scriptId: string): void;
}>();

function handleUpdate(script: ComponentScript, newValues: Partial<ComponentScript>) {
  emit('update-script', { ...script, ...newValues });
}

const createEditorField = (name: string, label: string, type: EditorField['type']): EditorField => ({
  name,
  label,
  type
});
</script>

<template>
  <div class="script-manager">
    <div v-if="!scripts || !scripts.length" class="script-manager__placeholder">
      <p>No scripts defined for this component.</p>
    </div>

    <div v-for="script in scripts" :key="script.id" class="script-item">
      <div class="script-item__header">
        <span class="script-item__title">Event Handler</span>
        <button class="script-item__delete-btn" @click="emit('delete-script', script.id)">
          Delete
        </button>
      </div>

      <div class="script-item__fields">
        <EditorControl
          :field="createEditorField('eventName', 'Event Name', 'text')"
          :model-value="script.eventName"
          @update:model-value="handleUpdate(script, { eventName: $event })"
        />
        <EditorControl
          :field="createEditorField('targetSelector', 'Target Selector (optional)', 'text')"
          :model-value="script.targetSelector"
          @update:model-value="handleUpdate(script, { targetSelector: $event })"
        />
        <EditorControl
          :field="createEditorField('code', 'JavaScript Code', 'code-editor')"
          :model-value="script.code"
          @update:model-value="handleUpdate(script, { code: $event })"
        />
      </div>
    </div>

    <button class="script-manager__add-btn" @click="emit('add-script')">
      Add Script Handler
    </button>
  </div>
</template>

<style lang="scss">
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
  padding: 16px;
  background-color: var(--color-bg-primary);
}
.script-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
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
.script-item__fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
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