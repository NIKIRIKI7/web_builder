<script setup lang="ts">
import { computed, shallowRef, type Component } from 'vue';
import type { EditorField } from '@/entities/UiComponent/model/types';
import TextInput from './controls/TextInput.vue';
import TextareaInput from './controls/TextareaInput.vue';
import NumberInput from './controls/NumberInput.vue';
import ColorInput from './controls/ColorInput.vue';
import LinkArrayEditor from './controls/LinkArrayEditor.vue';
import CodeEditorInput from './controls/CodeEditorInput.vue';
import ImageInput from './controls/ImageInput.vue';
import ObjectArrayEditor from './controls/ObjectArrayEditor.vue';
import { useI18nManager } from '@/shared/i18n/useI18nManager';

interface Props {
  field: EditorField;
  modelValue: any;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const { t } = useI18nManager();

const controlMap: Record<string, Component> = {
  text: TextInput,
  textarea: TextareaInput,
  number: NumberInput,
  color: ColorInput,
  'link-array': LinkArrayEditor,
  'code-editor': CodeEditorInput,
  image: ImageInput,
  'object-array': ObjectArrayEditor,
};

const activeControl = shallowRef(controlMap[props.field.type]);

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
</script>

<template>
  <div class="editor-control">
    <label class="editor-control__label">{{ t(`editor.fields.${field.label}`) }}</label>
    <component
      v-if="activeControl"
      :is="activeControl"
      v-model="localValue"
      :unit="field.unit"
      :item-schema="field.itemSchema"
    />
  </div>
</template>

<style lang="scss">
.editor-control {
  &:not(:last-child) {
    margin-bottom: 16px;
  }

  &__label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-primary);
    opacity: 0.9;
  }
}
</style>