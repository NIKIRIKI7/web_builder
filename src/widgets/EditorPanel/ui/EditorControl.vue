<script setup lang="ts">
import { computed, shallowRef, type Component } from 'vue';
import type { EditorField } from '@/entities/UiComponent/model/types';
import TextInput from './controls/TextInput.vue';
import TextareaInput from './controls/TextareaInput.vue';
import NumberInput from './controls/NumberInput.vue';
import ColorInput from './controls/ColorInput.vue';
import LinkArrayEditor from './controls/LinkArrayEditor.vue'; // ИЗМЕНЕНО: Импорт нового контрола

import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { debounce } from '@/shared/lib/utils';

interface Props {
  field: EditorField;
  modelValue: any;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

// ИЗМЕНЕНО: Добавлен 'link-array' в карту контролов
const controlMap: Record<string, Component> = {
  text: TextInput,
  textarea: TextareaInput,
  number: NumberInput,
  color: ColorInput,
  'link-array': LinkArrayEditor,
};

const activeControl = shallowRef(controlMap[props.field.type]);

const isCodeEditor = computed(() => props.field.type === 'code-editor');
const codeExtensions = [javascript(), oneDark];

const localValue = computed({
  get() {
    if (props.field.type === 'number' && props.field.unit) {
      return parseFloat(props.modelValue) || 0;
    }
    return props.modelValue;
  },
  set(newValue) {
    let finalValue = newValue;
    if (props.field.type === 'number' && props.field.unit) {
      const numericValue = typeof newValue === 'number' ? newValue : 0;
      finalValue = `${numericValue}${props.field.unit}`;
    }
    emit('update:modelValue', finalValue);
  }
});

const debouncedCodeUpdate = debounce((code: string) => {
  emit('update:modelValue', code);
}, 400);

</script>

<template>
  <div class="editor-control">
    <label class="editor-control__label">{{ field.label }}</label>

    <Codemirror
        v-if="isCodeEditor"
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

    <component
        v-else-if="activeControl"
        :is="activeControl"
        v-model="localValue"
        :unit="field.unit"
    />
  </div>
</template>

<style lang="scss">
.code-editor-instance {
  border: 1px solid $color-border;
  border-radius: 4px;
  overflow: hidden;

  .cm-editor {
    border: none;
  }
}

.editor-control {
  &:not(:last-child) {
    margin-bottom: 16px;
  }

  &__label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #606266;
  }
}
</style>