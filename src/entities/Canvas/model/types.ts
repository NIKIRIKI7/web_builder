import type { UiComponentDefinition } from '@/entities/UiComponent/model/types';

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

export interface CanvasInstanceState {
  instanceId: number;
  componentId: string;
  props: Record<string, unknown>;
  styles: Record<string, unknown>;
  scripts: ComponentScript[];
  children?: CanvasInstanceState[];
}

export interface CanvasState {
  componentInstances: CanvasInstanceState[];
  selectedComponentInstanceId: number | null;
  isEditorOpen: boolean;
}

export interface FullRenderedComponent {
  instanceId: number;
  componentDefinition: UiComponentDefinition;
  props: Record<string, unknown>;
  styles: Record<string, unknown>;
  scripts: ComponentScript[];
  children?: FullRenderedComponent[];
}