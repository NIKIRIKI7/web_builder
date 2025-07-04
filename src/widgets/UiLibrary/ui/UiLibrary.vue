<script setup lang="ts">
import { useUiLibraryStore } from '@/features/UiLibraryState/model/uiLibraryStore';
import SearchComponents from '@/features/UiLibrarySearch/ui/SearchComponents.vue';
import UiLibraryItem from './UiLibraryItem.vue';

const uiLibraryStore = useUiLibraryStore();
</script>

<template>
  <div class="ui-library">
    <div class="ui-library__header">
      <h2 class="ui-library__title">Components</h2>
    </div>
    <SearchComponents />
    <div class="ui-library__content">
      <div
          v-if="Object.keys(uiLibraryStore.filteredGroupedComponents).length > 0"
      >
        <div
            v-for="(components, category) in uiLibraryStore.filteredGroupedComponents"
            :key="category"
            class="ui-library__category"
        >
          <h3 class="ui-library__category-title">{{ category }}</h3>
          <div class="ui-library__list">
            <UiLibraryItem
                v-for="component in components"
                :key="component.id"
                :component-info="component"
            />
          </div>
        </div>
      </div>
      <div v-else class="ui-library__no-results">
        <p>No components found.</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-library {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: $color-text-primary;
  background-color: $color-bg-secondary;

  &__header {
    padding: 16px;
    flex-shrink: 0;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
  }

  &__content {
    padding: 16px;
    overflow-y: auto;
    flex-grow: 1;
  }

  &__category {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  &__category-title {
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: 600;
    color: #606266;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  &__no-results {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #909399;
    font-size: 15px;
  }
}
</style>