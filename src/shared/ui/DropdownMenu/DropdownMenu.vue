<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { ChevronDownIcon } from '@/shared/ui/icons';

type DropdownOption = {
  label: string;
  value: any;
};

const props = withDefaults(defineProps<{
  options: DropdownOption[];
  modelValue: any;
  placeholder?: string;
}>(), {
  placeholder: 'Select an option'
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const selectedLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue);
  return selected ? selected.label : props.placeholder;
});

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option: DropdownOption) {
  emit('update:modelValue', option.value);
  isOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div ref="dropdownRef" class="dropdown-menu">
    <button class="dropdown-menu__trigger" @click="toggleDropdown">
      <span class="dropdown-menu__trigger-label">{{ selectedLabel }}</span>
      <ChevronDownIcon
        class="dropdown-menu__trigger-icon"
        :class="{'dropdown-menu__trigger-icon--is-open': isOpen }"
      />
    </button>
    <transition name="dropdown-fade">
      <div v-if="isOpen" class="dropdown-menu__panel">
        <button
          v-for="option in options"
          :key="option.value.name"
          class="dropdown-menu__item"
          :class="{'dropdown-menu__item--is-active': modelValue === option.value}"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.dropdown-menu {
  position: relative;
  display: inline-block;
}

.dropdown-menu__trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;
  min-width: 130px;
  justify-content: space-between;

  &:hover {
    background-color: var(--color-bg-primary);
  }
}

.dropdown-menu__trigger-icon {
  transition: transform 0.2s ease-in-out;
  &--is-open {
    transform: rotate(180deg);
  }
}

.dropdown-menu__panel {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: $z-index-dropdown;
  min-width: 100%;
  padding: 6px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dropdown-menu__item {
  display: block;
  width: 100%;
  padding: 8px 12px;
  text-align: left;
  font-size: 14px;
  background-color: transparent;
  color: var(--color-text-primary);
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-bg-primary);
  }

  &--is-active {
    font-weight: 600;
    color: var(--color-accent);
  }
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>