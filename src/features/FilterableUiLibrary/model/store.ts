// C:\Users\mcniki\Documents\stormprojects\Vue\web_builder\src\features\FilterableUiLibrary\model\store.ts
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import Fuse, { type FuseResult } from 'fuse.js';
import { libraryPreviews } from '@/entities/UiComponent/model/registry';
import type { UiComponentPreview } from '@/entities/UiComponent/model/types';

type GroupedComponents = Record<string, UiComponentPreview[]>;

export type LibraryListItem =
    | { type: 'category'; key: string; name: string }
    | { type: 'component_row'; key: string; items: UiComponentPreview[] };

export const useFilterableLibraryStore = defineStore('filterableUiLibrary', () => {
    const components = ref<UiComponentPreview[]>(libraryPreviews);
    const searchTerm = ref('');

    const fuse = new Fuse(components.value, {
        keys: ['name', 'category'],
        threshold: 0.4,
    });

    const setSearchTerm = (term: string) => {
        searchTerm.value = term.toLowerCase();
    };

    const filteredGroupedComponents = computed((): GroupedComponents => {
        const filtered: UiComponentPreview[] = searchTerm.value === ''
            ? components.value
            : fuse.search(searchTerm.value).map((result: FuseResult<UiComponentPreview>) => result.item);

        return filtered.reduce((acc: GroupedComponents, component: UiComponentPreview) => {
            const { category } = component;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(component);
            return acc;
        }, {} as GroupedComponents);
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
    };
});