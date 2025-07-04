import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { libraryComponents } from '@/entities/UiComponent/model/libraryComponents';
import type { UiComponentInfo } from '@/entities/UiComponent/model/types';

type GroupedComponents = Record<string, UiComponentInfo[]>;

export const useUiLibraryStore = defineStore('uiLibrary', () => {
    const components = ref<UiComponentInfo[]>(libraryComponents);
    const searchTerm = ref('');

    const setComponents = (newComponents: UiComponentInfo[]) => {
        components.value = newComponents;
    };

    const setSearchTerm = (term: string) => {
        searchTerm.value = term.toLowerCase();
    };

    const filteredGroupedComponents = computed((): GroupedComponents => {
        const filtered = components.value.filter(component =>
            component.name.toLowerCase().includes(searchTerm.value)
        );

        return filtered.reduce((acc, component) => {
            const { category } = component;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(component);
            return acc;
        }, {} as GroupedComponents);
    });

    return {
        searchTerm,
        setSearchTerm,
        setComponents,
        filteredGroupedComponents,
    };
});