import type { Component } from 'vue';

export interface ExportableComponentDefinition {
  id: string;
  name: string;
  component: Component;
  staticCss?: string;
}

export interface ScriptTrigger {
  type: 'onMount' | 'onClick';
  selector?: string;
}

export interface ScriptAction {
  id: string;
  type: string;
  params: Record<string, any>;
}

export interface ComponentScript {
  id: string;
  trigger: ScriptTrigger;
  actions: ScriptAction[];
}

export interface ExportableComponent {
  instanceId: number;
  componentDefinition: ExportableComponentDefinition;
  props: Record<string, any>;
  styles: Record<string, any>;
  scripts: ComponentScript[];
}

export interface ExportStrategy {
  export(components: ExportableComponent[]): Promise<void>;
}