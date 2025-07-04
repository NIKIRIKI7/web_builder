// src/entities/UiComponent/model/types.ts

// 1. Импортируем 'Component' вместо 'DefineComponent'
import type { Component } from 'vue';

export type UiComponentCategory = 'Headers' | 'Footers' | 'Content';

export type EditorFieldType = 'text' | 'textarea' | 'number' | 'color';

export interface EditorField {
    name: string;
    label: string;
    type: EditorFieldType;
}

export interface EditorTab {
    name: string;
    target: 'props' | 'styles';
    fields: EditorField[];
}

export interface UiComponentInfo {
    id: string;
    name: string;
    category: UiComponentCategory;
    // 2. Заменяем тип на более общий и корректный 'Component'
    component: Component;
    defaultProps?: Record<string, any>;
    defaultStyles?: Record<string, any>;
    editorTabs: EditorTab[];
}