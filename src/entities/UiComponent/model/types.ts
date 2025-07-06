import type { Component } from 'vue';
import type { EditorTarget } from './constants';
export type { EditorTarget } from './constants';
export type UiComponentCategory =
  | 'Headers'
  | 'Footers'
  | 'Heros'
  | 'Content'
  | 'Showcase'
  | 'Products'
  | 'CTA'
  | 'Forms'
  | 'logoGrids'
  | 'Carousels'
  | 'Banners'
  | 'Testimonials'
  | 'Features'
  | 'Pricing'
  | 'Team'
  | 'FAQs';
export type EditorFieldType = 'text' | 'textarea' | 'number' | 'color' | 'code-editor' | 'link-array' | 'image' | 'object-array' | 'select';
export interface EditorField {
  name: string;
  label: string;
  type: EditorFieldType;
  unit?: 'px' | '%' | 'em' | 'rem';
  itemSchema?: EditorField[];
  options?: { label: string; value: any }[];
}
export interface EditorTab {
  name:string;
  target: EditorTarget;
  fields: EditorField[];
}
export interface EditorConfiguration {
  componentId: string;
  tabs: EditorTab[];
}
export interface UiComponentPreview {
  id: string;
  name: string;
  category: UiComponentCategory;
  previewIcon?: Component;
}
export interface UiComponentDefinition extends UiComponentPreview {
  component: Component;
  staticCss?: string;
  defaultProps?: Record<string, any>;
  defaultStyles?: Record<string, any>;
}