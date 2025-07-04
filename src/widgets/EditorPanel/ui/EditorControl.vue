<!-- src/widgets/EditorPanel/ui/EditorControl.vue -->
<script setup lang="ts">
import type { EditorField } from '@/entities/UiComponent/model/types';
import { computed } from 'vue';

interface Props {
  field: EditorField;
  modelValue: any;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const localValue = computed({
  get: () => {
    if (props.field.type === 'number' && typeof props.modelValue === 'string') {
      return parseInt(props.modelValue, 10) || 0;
    }
    return props.modelValue;
  },
  set: (value) => {
    let finalValue = value;
    if (props.field.type === 'number') {
      finalValue = `${value}px`;
    }
    emit('update:modelValue', finalValue);
  }
});
</script>

<template>
  <div class="editor-control">
    <label class="editor-control__label">{{ field.label }}</label>

    <!-- Рендерим нужный input в зависимости от типа поля -->
    <template v-if="field.type === 'text'">
      <input
          :value="localValue"
          @input="localValue = ($event.target as HTMLInputElement).value"
          type="text"
          class="editor-control__input"
      />
    </template>

    <template v-else-if="field.type === 'textarea'">
      <textarea
          :value="localValue"
          @input="localValue = ($event.target as HTMLTextAreaElement).value"
          class="editor-control__input editor-control__textarea"
      ></textarea>
    </template>

    <template v-else-if="field.type === 'number'">
      <input
          :value="localValue"
          @input="localValue = ($event.target as HTMLInputElement).valueAsNumber"
          type="number"
          class="editor-control__input"
      />
    </template>

    <template v-else-if="field.type === 'color'">
      <div class="editor-control__color-wrapper">
        <input
            :value="localValue"
            @input="localValue = ($event.target as HTMLInputElement).value"
            type="color"
            class="editor-control__color-input"
        />
        <span class="editor-control__color-value">{{ localValue }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.editor-control {
  &:not(:last-child) {
    margin-bottom: 16px;
  }
}

.editor-control__label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

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