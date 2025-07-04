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
      class="editor-control__input editor-control__textarea"
      @input="onInput"
  ></textarea>
</template>

<style scoped lang="scss">
.editor-control__input {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid $color-border;
  border-radius: 4px;
  background-color: $color-bg-secondary;
  color: $color-text-primary;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
}

.editor-control__textarea {
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
}
</style>