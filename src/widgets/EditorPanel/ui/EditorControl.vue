<script setup lang="ts">
import { computed } from 'vue';
import type { EditorField } from '@/entities/UiComponent/model/types';
import { useI18nManager } from '@/shared/i18n/useI18nManager';
import { controlRegistry } from '../model/controlRegistry';

interface Props {
  field: EditorField;
  modelValue: any;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const { t } = useI18nManager();

const activeControl = computed(() => controlRegistry.getControl(props.field.type));

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
    <label class="editor-control__label">{{ t(`editor.fields.${field.label}`, field.label) }}</label>
    <component
      :is="activeControl"
      v-if="activeControl"
      v-model="localValue"
      :unit="field.unit"
      :item-schema="field.itemSchema"
      :options="field.options"
    />
    <div v-else class="editor-control__not-found">
      Control of type '{{ field.type }}' not found.
    </div>
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

  &__not-found {
    font-size: 12px;
    color: var(--color-danger);
    background-color: rgba(var(--color-danger-rgb), 0.1);
    padding: 8px;
    border-radius: 4px;
    border: 1px solid rgba(var(--color-danger-rgb), 0.3);
  }
}
</style>