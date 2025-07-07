import type { Component } from 'vue';

export interface ExportableComponentDefinition {
  id: string;
  name: string;
  component: Component;
  staticCss?: string;
  runtimeScript?: string;
}

export interface ScriptTrigger {
  type: 'onMount' | 'onClick';
  selector?: string;
}

export interface ScriptAction {
  id: string;
  type: string;
  params: Record<string, unknown>;
}

export interface ComponentScript {
  id: string;
  trigger: ScriptTrigger;
  actions: ScriptAction[];
}

export interface ExportableComponent {
  instanceId: number;
  componentDefinition: ExportableComponentDefinition;
  props: Record<string, unknown>;
  styles: Record<string, unknown>;
  scripts: ComponentScript[];
}

export interface ExportStrategy {
   
  export(_components: ExportableComponent[]): Promise<void>;
}