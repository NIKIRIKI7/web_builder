import type { UiComponentDefinition } from '@/entities/UiComponent/model/types';

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

export interface CanvasInstanceState {
  instanceId: number;
  componentId: string;
  props: Record<string, any>;
  styles: Record<string, any>;
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
  props: Record<string, any>;
  styles: Record<string, any>;
  scripts: ComponentScript[];
  children?: FullRenderedComponent[];
}