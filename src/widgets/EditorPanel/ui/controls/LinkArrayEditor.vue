<script setup lang="ts">
import { klona } from 'klona/lite';

import { useI18nManager } from '@/shared/i18n/useI18nManager';
import { DeleteIcon, AddIcon } from '@/shared/ui/icons';

type Link = { id: number; text: string; url: string };

const props = withDefaults(defineProps<{
  modelValue?: Link[];
}>(), {
  modelValue: () => [],
});

const emit = defineEmits<{
  'update:modelValue': [value: Link[]]
}>();

const { t } = useI18nManager();

function updateLink(index: number, field: 'text' | 'url', value: string) {
  const newLinks = klona(props.modelValue);
  newLinks[index][field] = value;
  emit('update:modelValue', newLinks);
}

function addLink() {
  const newLinks = klona(props.modelValue);
  newLinks.push({ id: Date.now(), text: 'New Link', url: '#' });
  emit('update:modelValue', newLinks);
}

function deleteLink(index: number) {
  const newLinks = klona(props.modelValue);
  newLinks.splice(index, 1);
  emit('update:modelValue', newLinks);
}
</script>

<template>
  <div class="link-array-editor">
    <div v-for="(link, index) in props.modelValue" :key="link.id" class="link-item">
      <div class="link-item__inputs">
        <input
            type="text"
            class="link-item__input"
            :placeholder="t('editor.fields.linkTextPlaceholder')"
            :value="link.text"
            @input="updateLink(index, 'text', ($event.target as HTMLInputElement).value)"
        />
        <input
            type="text"
            class="link-item__input"
            :placeholder="t('editor.fields.linkUrlPlaceholder')"
            :value="link.url"
            @input="updateLink(index, 'url', ($event.target as HTMLInputElement).value)"
        />
      </div>
      <button class="link-item__delete-btn" @click="deleteLink(index)">
        <DeleteIcon />
      </button>
    </div>
    <button class="link-array-editor__add-btn" @click="addLink">
      <AddIcon />
      {{ t('editor.buttons.addLink') }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.link-array-editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.link-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.link-item__inputs {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-grow: 1;
}
.link-item__input {
  width: 100%;
  padding: 6px 10px;
  font-size: 13px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: var(--color-accent);
  }
}
.link-item__delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: none;
  border: 1px solid transparent;
  color: var(--color-text-primary);
  opacity: 0.6;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  &:hover {
    color: var(--color-danger);
    background-color: var(--color-bg-primary);
    border-color: transparent;
    opacity: 1;
  }
}
.link-array-editor__add-btn {
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