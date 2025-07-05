<script setup lang="ts">
import { klona } from 'klona/lite';
import { DeleteIcon, AddIcon } from '@/shared/ui/icons';
import type { EditorField } from '@/entities/UiComponent/model/types';
import EditorControl from '../EditorControl.vue';
import { useI18nManager } from '@/shared/i18n/useI18nManager';

type Item = { id: number; [key: string]: any };

const props = withDefaults(defineProps<{
  modelValue?: Item[];
  itemSchema?: EditorField[];
}>(), {
  modelValue: () => [],
  itemSchema: () => [],
});

const emit = defineEmits(['update:modelValue']);
const { t } = useI18nManager();

function updateItem(index: number, fieldName: string, value: any) {
  const newItems = klona(props.modelValue);
  newItems[index][fieldName] = value;
  emit('update:modelValue', newItems);
}
function addItem() {
  const newItems = klona(props.modelValue);
  const newItem: Item = { id: Date.now() };
  props.itemSchema?.forEach(field => {
    const fieldType = field.type;
    if (fieldType === 'text' || fieldType === 'textarea' || fieldType === 'image') {
      newItem[field.name] = '';
    } else if (fieldType === 'number') {
      newItem[field.name] = 0;
    } else if (fieldType === 'link-array' || fieldType === 'object-array') {
      newItem[field.name] = [];
    } else {
      newItem[field.name] = null;
    }
  });
  newItems.push(newItem);
  emit('update:modelValue', newItems);
}
function deleteItem(index: number) {
  const newItems = klona(props.modelValue);
  newItems.splice(index, 1);
  emit('update:modelValue', newItems);
}
</script>

<template>
  <div class="object-array-editor">
    <div v-for="(item, index) in props.modelValue" :key="item.id" class="object-item">
      <div class="object-item__fields">
        <EditorControl
          v-for="field in props.itemSchema"
          :key="field.name"
          :field="field"
          :model-value="item[field.name]"
          @update:model-value="updateItem(index, field.name, $event)"
        />
      </div>
      <button class="object-item__delete-btn" @click="deleteItem(index)">
        <DeleteIcon />
      </button>
    </div>
    <button class="object-array-editor__add-btn" @click="addItem">
      <AddIcon />
      {{ t('editor.buttons.addItem') }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.object-array-editor {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.object-item {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-radius: 6px;
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
}
.object-item__fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
}
.object-item__delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  align-self: flex-start;
  background: none;
  border: 1px solid transparent;
  color: var(--color-text-primary);
  opacity: 0.6;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  &:hover {
    color: var(--color-danger);
    background-color: var(--color-bg-secondary);
    border-color: transparent;
    opacity: 1;
  }
}
.object-array-editor__add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 8px;
  margin-top: 8px;
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
  svg {
    width: 20px;
    height: 20px;
  }
}
</style>