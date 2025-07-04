import type { Component } from 'vue';

export type UiComponentCategory = 'Headers' | 'Footers' | 'Content';
export type EditorFieldType = 'text' | 'textarea' | 'number' | 'color';

export interface EditorField {
    name: string;
    label: string;
    type: EditorFieldType;
}

export interface EditorTab {
    name:string;
    target: 'props' | 'styles';
    fields: EditorField[];
}

export interface UiComponentInfo {
    id: string;
    name: string;
    category: UiComponentCategory;
    component: Component;
    // НОВОЕ ПОЛЕ: Добавляем опциональную иконку для превью в библиотеке
    previewIcon?: Component;
    defaultProps?: Record<string, any>;
    defaultStyles?: Record<string, any>;
    editorTabs: EditorTab[];
}