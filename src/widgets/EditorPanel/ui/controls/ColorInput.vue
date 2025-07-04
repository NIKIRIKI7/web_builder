<script setup lang="ts">
// ИСПРАВЛЕНИЕ: Используем withDefaults для защиты от undefined.
// Если modelValue не будет передан или будет undefined,
// компонент использует '#000000' в качестве запасного варианта.
// Это полностью устраняет предупреждение о несоответствии типа.
withDefaults(defineProps<{ modelValue: string }>(), {
  modelValue: '#000000',
});

const emit = defineEmits(['update:modelValue']);
const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="editor-control__color-wrapper">
    <input
        :value="modelValue"
        type="color"
        class="editor-control__color-input"
        @input="onInput"
    />
    <span class="editor-control__color-value">{{ modelValue }}</span>
  </div>
</template>

<style scoped lang="scss">
.editor-control__color-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.editor-control__color-value {
  font-family: monospace;
  background-color: $color-bg-primary;
  padding: 4px 8px;
  border-radius: 4px;
}

.editor-control__color-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid $color-border;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;

  &::-webkit-color-swatch {
    border-radius: 5px;
    border: none;
  }

  &::-moz-color-swatch {
    border-radius: 5px;
    border: none;
  }
}
</style>