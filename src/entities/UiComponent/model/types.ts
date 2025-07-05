import type { Component } from 'vue';

export type UiComponentCategory = 'Headers' | 'Footers' | 'Content';

export type EditorFieldType = 'text' | 'textarea' | 'number' | 'color' | 'code-editor' | 'link-array';

export interface EditorField {
    name: string;
    label: string;
    type: EditorFieldType;
    unit?: 'px' | '%' | 'em' | 'rem';
}

export interface EditorTab {
    name:string;
    target: 'props' | 'styles' | 'script';
    fields: EditorField[];
}

export interface UiComponentPreview {
    id: string;
    name: string;
    category: UiComponentCategory;
    previewIcon?: Component;
}

export interface UiComponentInfo extends UiComponentPreview {
    component: Component;
    staticCss?: string;
    defaultProps?: Record<string, any>;
    defaultStyles?: Record<string, any>;
    editorTabs: EditorTab[];
}