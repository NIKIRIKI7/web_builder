import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import Fuse from 'fuse.js';
import { libraryComponents } from '@/entities/UiComponent/model/libraryComponents';
import type { UiComponentInfo } from '@/entities/UiComponent/model/types';

type GroupedComponents = Record<string, UiComponentInfo[]>;

export type LibraryListItem =
    | { type: 'category'; key: string; name: string }
    | { type: 'component_row'; key: string; items: UiComponentInfo[] };

export const useFilterableLibraryStore = defineStore('filterableUiLibrary', () => {
    const components = ref<UiComponentInfo[]>(libraryComponents);
    const searchTerm = ref('');

    const fuse = new Fuse(components.value, {
        keys: ['name', 'category'],
        threshold: 0.4,
    });

    const setComponents = (newComponents: UiComponentInfo[]) => {
        components.value = newComponents;
    };

    const setSearchTerm = (term: string) => {
        searchTerm.value = term.toLowerCase();
    };

    const filteredGroupedComponents = computed((): GroupedComponents => {
        const filtered: UiComponentInfo[] = searchTerm.value === ''
            ? components.value
            // ИЗМЕНЕНИЕ 1: Явно типизируем параметр 'result'
            : fuse.search(searchTerm.value).map((result: Fuse.FuseResult<UiComponentInfo>) => result.item);

        // ИЗМЕНЕНИЕ 2: Явно типизируем параметры 'acc' и 'component'
        return filtered.reduce((acc: GroupedComponents, component: UiComponentInfo) => {
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
        setComponents,
        filteredGroupedComponents,
        flatListItems,
    };
});