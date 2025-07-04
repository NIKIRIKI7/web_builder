<script setup lang="ts">
import { computed } from 'vue';
import { libraryComponents } from '@/entities/UiComponent/model/libraryComponents';
import type { UiComponentInfo } from '@/entities/UiComponent/model/types';
import UiLibraryItem from './UiLibraryItem.vue';

// Группируем компоненты по категориям для отображения
const groupedComponents = computed(() => {
  return libraryComponents.reduce((acc, component) => {
    const category = component.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(component);
    return acc;
  }, {} as Record<string, UiComponentInfo[]>);
});
</script>

<template>
  <div class="ui-library">
    <div class="ui-library__header">
      <h2 class="ui-library__title">Components</h2>
    </div>
    <div class="ui-library__content">
      <div
          v-for="(components, category) in groupedComponents"
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
  </div>
</template>

<style scoped lang="scss">
.ui-library {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: $color-text-primary;

  &__header {
    padding: 16px;
    border-bottom: 1px solid $color-border;
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
}
</style>