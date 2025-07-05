<script setup lang="ts">
import { debounce } from '@/shared/lib/utils';

const props = withDefaults(defineProps<{
  modelValue?: string;
}>(), {
  modelValue: ''
});

const emit = defineEmits(['update:modelValue']);

const onInput = debounce((event: Event) => {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
}, 300);
</script>

<template>
  <textarea
    :value="props.modelValue"
    class="editor-control__input editor-control__textarea"
    @input="onInput"
  ></textarea>
</template>

<style scoped lang="scss">
.editor-control__input {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
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

.editor-control__textarea {
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
}
</style>