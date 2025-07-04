import type { UiComponentInfo } from './types';
// 1. Импортируем готовый массив конфигураций. Больше нет циклических зависимостей.
import { libraryComponents as componentConfigs } from '../config';

// 2. Экспортируем импортированный массив для совместимости.
export const libraryComponents: UiComponentInfo[] = componentConfigs;

// 3. Создаем Map, как и раньше.
export const componentsMap = new Map<string, UiComponentInfo>(
    libraryComponents.map(c => [c.id, c])
);