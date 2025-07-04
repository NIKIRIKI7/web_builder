<script setup lang="ts">
import { computed } from 'vue';
// Обновляем импорт
import { useFilterableLibraryStore } from '@/features/FilterableUiLibrary/model/store';

const libraryStore = useFilterableLibraryStore();

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
        placeholder="Search components..."
    />
  </div>
</template>

<style scoped lang="scss">
/* Используем БЭМ с новым именем блока */
.filter-input {
  padding: 0 16px 16px;
  border-bottom: 1px solid $color-border;

  &__field {
    width: 100%;
    padding: 10px 14px;
    font-size: 14px;
    border: 1px solid $color-border;
    border-radius: 6px;
    background-color: $color-bg-primary;
    color: $color-text-primary;
    transition: border-color $transition-duration, box-shadow $transition-duration;

    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
  }
}
</style>