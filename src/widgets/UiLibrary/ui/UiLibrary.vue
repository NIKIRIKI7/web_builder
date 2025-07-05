<script setup lang="ts">
import { ref, computed } from 'vue';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { useFilterableLibraryStore, type LibraryListItem } from '@/features/FilterableUiLibrary/model/store';
import { useI18nManager } from '@/shared/i18n/useI18nManager';
import FilterInput from '@/features/FilterableUiLibrary/ui/FilterInput.vue';
import UiLibraryItem from './UiLibraryItem.vue';

const libraryStore = useFilterableLibraryStore();
const { t } = useI18nManager();

const parentRef = ref<HTMLElement | null>(null);

const items = computed<LibraryListItem[]>(() => libraryStore.flatListItems);

const rowVirtualizer = useVirtualizer({
  count: items.value.length,
  getScrollElement: () => parentRef.value,
  estimateSize: (index) => (items.value[index]?.type === 'category' ? 36 : 108),
  overscan: 5,
});

const renderableItems = computed(() => {
  const virtualItems = rowVirtualizer.value.getVirtualItems();
  return virtualItems.map(virtualItem => ({
    ...virtualItem,
    data: items.value[virtualItem.index],
  }));
});
</script>

<template>
  <div class="ui-library">
    <div class="ui-library__header">
      <h2 class="ui-library__title">{{ t('sidebar.library.title') }}</h2>
    </div>
    <FilterInput />

    <div ref="parentRef" class="ui-library__content">
      <div
        class="ui-library__content-sizer"
        :style="{ height: `${rowVirtualizer.getTotalSize()}px` }"
      >
        <div
          v-for="item in renderableItems"
          :key="String(item.key)"
          class="ui-library__list-item"
          :style="{ transform: `translateY(${item.start}px)` }"
        >
          <template v-if="item.data">
            <h3
              v-if="item.data.type === 'category'"
              class="ui-library__category-title"
            >
              {{ item.data.name }}
            </h3>

            <div
              v-else-if="item.data.type === 'component_row'"
              class="ui-library__list"
            >
              <UiLibraryItem
                v-for="component in item.data.items"
                :key="component.id"
                :component-info="component"
              />
            </div>
          </template>
        </div>
      </div>
    </div>

    <div v-if="!items.length" class="ui-library__no-results">
      <p>{{ t('sidebar.library.noResults') }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-library {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--color-text-primary);
  background-color: var(--color-bg-secondary);
}
.ui-library__header {
  padding: 16px;
  flex-shrink: 0;
}
.ui-library__title {
  font-size: 18px;
  font-weight: 600;
}
.ui-library__content {
  flex-grow: 1;
  overflow-y: auto;
  contain: strict;
}
.ui-library__content-sizer {
  width: 100%;
  position: relative;
}
.ui-library__list-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 16px;
}
.ui-library__category-title {
  margin-bottom: 12px;
  padding-top: 12px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.ui-library__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.ui-library__no-results {
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-text-primary);
  opacity: 0.5;
  font-size: 15px;
}
</style>