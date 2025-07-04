<script setup lang="ts">
import { computed } from 'vue';
import { useUiLibraryStore } from '@/features/UiLibraryState/model/uiLibraryStore';

const uiLibraryStore = useUiLibraryStore();

const localSearchTerm = computed({
  get: () => uiLibraryStore.searchTerm,
  set: (value) => uiLibraryStore.setSearchTerm(value),
});
</script>

<template>
  <div class="search-components">
    <input
        type="text"
        class="search-components__input"
        placeholder="Search components..."
        v-model.trim="localSearchTerm"
    />
  </div>
</template>

<style scoped lang="scss">
.search-components {
  padding: 0 16px 16px;
  border-bottom: 1px solid $color-border;

  &__input {
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