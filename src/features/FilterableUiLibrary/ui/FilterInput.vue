<script setup lang="ts">
import { computed } from 'vue';

import { useFilterableLibraryStore } from '@/features/FilterableUiLibrary/model/store';
import { useI18nManager } from '@/shared/i18n/useI18nManager';

const libraryStore = useFilterableLibraryStore();
const { t } = useI18nManager();

const localSearchTerm = computed({
  get: () => libraryStore.searchTerm,
  set: (value) => libraryStore.setSearchTerm(value),
});
</script>

<template>
  <div class="filter-input">
    <input
      v-model.trim="localSearchTerm"
      type="text"
      class="filter-input__field"
      :placeholder="t('sidebar.library.searchPlaceholder')"
    />
  </div>
</template>

<style scoped lang="scss">
.filter-input {
  padding: 0 16px 16px;
  border-bottom: 1px solid var(--color-border);

  &__field {
    width: 100%;
    padding: 10px 14px;
    font-size: 14px;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    transition: border-color $transition-duration, box-shadow $transition-duration;

    &:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 2px rgba(var(--color-accent), 0.2);
    }
  }
}
</style>