import type { ActionDefinition } from './types';
import { alertAction } from '../actions/alert';
import { toggleVisibilityAction } from '../actions/toggleVisibility';
import { emitEventAction } from '../actions/emitEvent';

export const actionRegistry: ActionDefinition[] = [
  alertAction,
  toggleVisibilityAction,
  emitEventAction,
];

export const actionRegistryMap = new Map<string, ActionDefinition>(
  actionRegistry.map(action => [action.type, action])
);