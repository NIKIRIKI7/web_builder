// C:\Users\mcniki\Documents\stormprojects\Vue\web_builder\src\entities\UiComponent\index.ts

// Экспортируем только превью синхронно
import { simpleHeaderPreview } from './Headers/SimpleHeader';
import { simpleFooterPreview } from './Footers/SimpleFooter';

// Массив превью для UI
export const allPreviews = [simpleHeaderPreview, simpleFooterPreview];

// Объект с функциями-загрузчиками для динамических импортов
export const configLoaders = {
    [simpleHeaderPreview.id]: () => import('./Headers/SimpleHeader'),
    [simpleFooterPreview.id]: () => import('./Footers/SimpleFooter'),
};