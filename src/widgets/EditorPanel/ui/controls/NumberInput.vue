<script setup lang="ts">
import { ref, watch } from 'vue';

import { debounce } from '@/shared/lib/utils';

const props = withDefaults(defineProps<{
  modelValue?: number;
  unit?: string;
}>(), {
  modelValue: 0,
  unit: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>();

const localValue = ref(props.modelValue);

const debouncedUpdate = debounce((value: number) => {
  emit('update:modelValue', value || 0);
}, 300);

watch(localValue, (newValue) => {
  debouncedUpdate(newValue);
});

watch(() => props.modelValue, (newValue) => {
  if (newValue !== localValue.value) {
    localValue.value = newValue;
  }
});
</script>
<template>
  <div class="number-input-wrapper">
    <input
        v-model.number="localValue"
        type="number"
        class="editor-control__input number-input-wrapper__field"
    />
    <span v-if="unit" class="number-input-wrapper__unit">{{ unit }}</span>
  </div>
</template>
<style scoped lang="scss">
.number-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.number-input-wrapper__field {
  padding-right: 35px;
}
.number-input-wrapper__unit {
  position: absolute;
  right: 12px;
  color: var(--color-text-primary);
  opacity: 0.5;
  font-size: 14px;
  pointer-events: none;
}
.editor-control__input {
  width: 100%; padding: 8px 12px; font-size: 14px; border: 1px solid var(--color-border); border-radius: 4px; background-color: var(--color-bg-secondary); color: var(--color-text-primary); transition: border-color 0.2s;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus { outline: none; border-color: var(--color-accent); }
}
</style>