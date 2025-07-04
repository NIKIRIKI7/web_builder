import type { UiComponentInfo } from '../model/types';
import { simpleHeaderConfig } from './simple-header';
import { simpleFooterConfig } from './simple-footer';

// Собираем все конфигурации в один массив
export const libraryComponents: UiComponentInfo[] = [
    simpleHeaderConfig,
    simpleFooterConfig,
    // При добавлении нового компонента просто добавляем его конфиг сюда
];