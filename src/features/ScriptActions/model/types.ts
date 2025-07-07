import type { EditorField } from '@/entities/UiComponent/model/types';

export interface ActionExecutionContext {
  action: {
    type: string;
    params: Record<string, unknown>;
  },
  rootElement: HTMLElement;
  eventBus: {
    // eslint-disable-next-line no-unused-vars
    emit: (_event: string, _payload: unknown) => void;
  }
}

export interface ActionDefinition {
  type: string;
  label: string;
  fields: EditorField[];
  handler: string;
}