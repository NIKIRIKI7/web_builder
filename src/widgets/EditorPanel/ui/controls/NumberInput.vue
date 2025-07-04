<script setup lang="ts">
import { debounce } from '@/shared/lib/utils';

defineProps<{
  modelValue: number;
  unit?: string;
}>();
const emit = defineEmits(['update:modelValue']);

// ИЗМЕНЕНИЕ: Debounce для числового ввода.
const onInput = debounce((event: Event) => {
  emit('update:modelValue', parseFloat((event.target as HTMLInputElement).value) || 0);
}, 300);
</script>
<template>
  <div class="number-input-wrapper">
    <input
        :value="modelValue"
        type="number"
        class="editor-control__input number-input-wrapper__field"
        @input="onInput"
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
  color: #909399;
  font-size: 14px;
  pointer-events: none;
}
.editor-control__input {
  width: 100%; padding: 8px 12px; font-size: 14px; border: 1px solid $color-border; border-radius: 4px; background-color: $color-bg-secondary; color: $color-text-primary; transition: border-color 0.2s;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus { outline: none; border-color: #3498db; }
}
</style>