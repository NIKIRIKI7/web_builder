<script setup lang="ts">
defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue']);
const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
};
</script>

<template>
  <textarea
      :value="modelValue"
      class="editor-control__input script-editor"
      @input="onInput"
      placeholder="e.g., alert('Header clicked!');"
  ></textarea>
</template>

<style scoped lang="scss">
.editor-control__input {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid $color-border;
  border-radius: 4px;
  background-color: #2d2d2d;
  color: #f8f8f2;
  font-family: 'Courier New', Courier, monospace;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
}

.script-editor {
  min-height: 150px;
  resize: vertical;
}
</style>