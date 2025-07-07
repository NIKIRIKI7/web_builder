<script setup lang="ts">
import { debounce } from '@/shared/lib/utils';

const props = withDefaults(defineProps<{
  modelValue?: string;
}>(), {
  modelValue: ''
});

const emit = defineEmits(['update:modelValue']);

const onInput = debounce((event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}, 300);
</script>

<template>
  <div class="image-input">
    <img
      v-if="props.modelValue"
      :src="props.modelValue"
      alt="Preview"
      class="image-input__preview"/>
    <input
      :value="props.modelValue"
      type="text"
      class="editor-control__input"
      placeholder="https://example.com/image.png"
      @input="onInput"
    />
  </div>
</template>

<style scoped lang="scss">
.image-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.image-input__preview {
  width: 100%;
  height: auto;
  max-height: 150px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid var(--color-border);
}
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
</style>