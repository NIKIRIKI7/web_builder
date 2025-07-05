import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import Fuse from 'fuse.js';
import { libraryPreviews } from '@/entities/UiComponent/model/registry';
import type { UiComponentPreview } from '@/entities/UiComponent/model/types';
import { useI18nManager } from '@/shared/i18n/useI18nManager';

type GroupedComponents = Record<string, UiComponentPreview[]>;

export type LibraryListItem = {
  type: 'category';
  key: string;
  name: string;
} | {
  type: 'component_row';
  key: string;
  items: UiComponentPreview[];
};

export const useFilterableLibraryStore = defineStore('filterableUiLibrary', () => {
  const searchTerm = ref('');
  const { t, currentLocale } = useI18nManager();

  const searchableData = computed(() =>
    libraryPreviews.map(preview => ({
      id: preview.id,
      name: t(`components.names.${preview.name}`),
      category: t(`components.categories.${preview.category.toLowerCase()}`),
    }))
  );

  const fuse = computed(() => new Fuse(searchableData.value, {
    keys: ['name', 'category'],
    threshold: 0.4,
  }));

  const setSearchTerm = (term: string) => {
    searchTerm.value = term;
  };

  const filteredPreviews = computed((): UiComponentPreview[] => {
    if (searchTerm.value.trim() === '') {
      return libraryPreviews;
    }

    const searchResults = fuse.value.search(searchTerm.value);
    const resultIds = new Set(searchResults.map(result => result.item.id));

    return libraryPreviews.filter(preview => resultIds.has(preview.id));
  });

  const filteredGroupedComponents = computed((): GroupedComponents => {
    return filteredPreviews.value.reduce((acc: GroupedComponents, component: UiComponentPreview) => {
      const translatedCategory = t(`components.categories.${component.category.toLowerCase()}`);
      if (!acc[translatedCategory]) {
        acc[translatedCategory] = [];
      }
      acc[translatedCategory].push(component);
      return acc;
    }, {});
  });

  const flatListItems = computed((): LibraryListItem[] => {
    const list: LibraryListItem[] = [];
    const grouped = filteredGroupedComponents.value;

    for (const categoryName in grouped) {
      list.push({
        type: 'category',
        key: `cat-${categoryName}`,
        name: categoryName,
      });

      const categoryComponents = grouped[categoryName];

      for (let i = 0; i < categoryComponents.length; i += 2) {
        const rowItems = categoryComponents.slice(i, i + 2);
        list.push({
          type: 'component_row',
          key: `row-${rowItems.map(c => c.id).join('-')}`,
          items: rowItems
        });
      }
    }
    return list;
  });

  return {
    searchTerm,
    setSearchTerm,
    flatListItems,
    _locale: currentLocale,
  };
});