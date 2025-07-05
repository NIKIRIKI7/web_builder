import type { Component } from 'vue';

export interface ExportableComponentDefinition {
  id: string;
  name: string;
  component: Component;
  staticCss?: string;
  clientScript?: string;
}

export interface ComponentScript {
  id: string;
  eventName: string;
  targetSelector: string;
  code: string;
}

export interface ExportableComponent {
  instanceId: number;
  componentDefinition: ExportableComponentDefinition;
  props: Record<string, any>;
  styles: Record<string, any>;
  scripts: ComponentScript[];
}