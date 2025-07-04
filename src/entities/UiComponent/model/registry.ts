// C:\Users\mcniki\Documents\stormprojects\Vue\web_builder\src\entities\UiComponent\model\registry.ts
import type { UiComponentInfo, UiComponentPreview } from './types';
import { allPreviews, configLoaders } from '..';

// --- Синхронные данные для UI ---
export const libraryPreviews: UiComponentPreview[] = allPreviews;

// --- Асинхронная логика с кэшированием ---
const configCache = new Map<string, UiComponentInfo>();

/**
 * Асинхронно загружает полную конфигурацию компонента по его ID.
 * Использует кэш для предотвращения повторных загрузок.
 * @param id - ID компонента (e.g., 'simple-header-v1')
 * @returns {Promise<UiComponentInfo>}
 */
export async function getComponentConfig(id: string): Promise<UiComponentInfo> {
    // 1. Проверяем кэш
    if (configCache.has(id)) {
        return configCache.get(id)!;
    }

    // 2. Если в кэше нет, ищем загрузчик
    const loader = configLoaders[id as keyof typeof configLoaders];
    if (!loader) {
        throw new Error(`Component config loader for id "${id}" not found.`);
    }

    // 3. Выполняем динамический импорт
    const module = await loader();

    // Имя экспортируемой переменной должно быть предсказуемым, e.g., 'simpleHeaderConfig'
    const configKey = Object.keys(module).find(key => key.endsWith('Config'));
    if (!configKey) {
        throw new Error(`Could not find a '*Config' export in module for component id "${id}".`);
    }

    const config = module[configKey as keyof typeof module] as UiComponentInfo;

    // 4. Сохраняем в кэш и возвращаем
    configCache.set(id, config);
    return config;
}

/**
 * Синхронно получает конфигурацию из кэша.
 * Предполагается, что конфигурация была предварительно загружена.
 * @param id - ID компонента
 * @returns {UiComponentInfo | undefined}
 */
export function getCachedComponentConfig(id: string): UiComponentInfo | undefined {
    return configCache.get(id);
}