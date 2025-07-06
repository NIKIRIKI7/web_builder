import type { EditorField } from '@/entities/UiComponent/model/types';

export interface ActionExecutionContext {
  action: {
    type: string;
    params: Record<string, any>;
  },
  rootElement: HTMLElement;
  eventBus: {
    emit: (event: string, payload: any) => void;
  }
}

export interface ActionDefinition {
  type: string;

  label: string;

  fields: EditorField[];

  handler: string;
}