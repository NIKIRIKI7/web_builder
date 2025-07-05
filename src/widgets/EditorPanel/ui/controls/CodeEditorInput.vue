<script setup lang="ts">
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { debounce } from '@/shared/lib/utils';

defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue']);

const codeExtensions = [javascript(), oneDark];

const debouncedCodeUpdate = debounce((code: string) => {
  emit('update:modelValue', code);
}, 400);
</script>

<template>
  <Codemirror
    :model-value="modelValue"
    @update:model-value="debouncedCodeUpdate"
    placeholder="Code goes here..."
    :style="{ height: '200px' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="codeExtensions"
    class="code-editor-instance"
  />
</template>

<style lang="scss">
.code-editor-instance {
  border: 1px solid var(--color-border);
  border-radius: 4px;
  overflow: hidden;

  .cm-editor {
    border: none;
    outline: none;
  }
}
</style>