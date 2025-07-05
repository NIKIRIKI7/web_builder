import type { UiComponentInfo, UiComponentPreview } from './types';
import { allPreviews, configLoaders } from '..';

export const libraryPreviews: UiComponentPreview[] = allPreviews;

const configCache = new Map<string, UiComponentInfo>();

/**
 * Асинхронно загружает полную конфигурацию компонента по его ID.
 * Использует кэш для предотвращения повторных загрузок.
 * @param id - ID компонента (e.g., 'simple-header-v1')
 * @returns {Promise<UiComponentInfo>}
 */
export async function getComponentConfig(id: string): Promise<UiComponentInfo> {
    if (configCache.has(id)) {
        return configCache.get(id)!;
    }

    const loader = configLoaders[id as keyof typeof configLoaders];
    if (!loader) {
        throw new Error(`Component config loader for id "${id}" not found.`);
    }

    const module = await loader();

    const configKey = Object.keys(module).find(key => key.endsWith('Config'));
    if (!configKey) {
        throw new Error(`Could not find a '*Config' export in module for component id "${id}".`);
    }

    const config = module[configKey as keyof typeof module] as UiComponentInfo;

    configCache.set(id, config);
    return config;
}

export function getCachedComponentConfig(id: string): UiComponentInfo | undefined {
    return configCache.get(id);
}