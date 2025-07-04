<script setup lang="ts">
import { ref, watch, shallowRef, type Component } from 'vue';
import type { EditorField } from '@/entities/UiComponent/model/types';
import { debounce } from '@/shared/lib/utils';
import TextInput from './controls/TextInput.vue';
import TextareaInput from './controls/TextareaInput.vue';
import NumberInput from './controls/NumberInput.vue';
import ColorInput from './controls/ColorInput.vue';

interface Props {
  field: EditorField;
  modelValue: any;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const controlMap: Record<string, Component> = {
  text: TextInput,
  textarea: TextareaInput,
  number: NumberInput,
  color: ColorInput,
};

const activeControl = shallowRef(controlMap[props.field.type]);

const parseValue = (value: any) => {
  if (props.field.type === 'number' && typeof value === 'string') {
    return parseFloat(value) || 0;
  }
  return value;
};

const localValue = ref(parseValue(props.modelValue));

watch(() => props.modelValue, (newValue) => {
  localValue.value = parseValue(newValue);
}, { immediate: true });

const emitUpdate = (value: any) => {
  let finalValue = value;
  if (props.field.type === 'number') {
    finalValue = `${value}px`;
  }
  emit('update:modelValue', finalValue);
};

const debouncedEmit = debounce(emitUpdate, 300);

watch(localValue, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    debouncedEmit(newValue);
  }
});
</script>

<template>
  <div class="editor-control">
    <label class="editor-control__label">{{ field.label }}</label>
    <component
        v-if="activeControl"
        :is="activeControl"
        v-model="localValue"
    />
  </div>
</template>

<style scoped lang="scss">
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