<script setup lang="ts">
defineProps<{ modelValue: number }>();
const emit = defineEmits(['update:modelValue']);
const onInput = (event: Event) => {
  emit('update:modelValue', parseFloat((event.target as HTMLInputElement).value) || 0);
};
</script>

<template>
  <input
      :value="modelValue"
      type="number"
      class="editor-control__input"
      @input="onInput"
  />
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
</style>