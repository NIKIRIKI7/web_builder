<script setup lang="ts">
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { ref, watch } from 'vue';
import { Codemirror } from 'vue-codemirror';

import { debounce } from '@/shared/lib/utils';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

const localCode = ref(props.modelValue);
const codeExtensions = [javascript(), oneDark];

const debouncedCodeUpdate = debounce((code: string) => {
  emit('update:modelValue', code);
}, 400);

watch(localCode, (newCode) => {
  debouncedCodeUpdate(newCode);
});

watch(() => props.modelValue, (newCode) => {
  if (newCode !== localCode.value) {
    localCode.value = newCode;
  }
});
</script>

<template>
  <Codemirror
      v-model="localCode"
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