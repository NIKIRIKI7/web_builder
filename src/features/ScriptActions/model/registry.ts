import { alertAction } from '../actions/alert';
import { emitEventAction } from '../actions/emitEvent';
import { toggleVisibilityAction } from '../actions/toggleVisibility';

import type { ActionDefinition } from './types';

export const actionRegistry: ActionDefinition[] = [
  alertAction,
  toggleVisibilityAction,
  emitEventAction,
];

export const actionRegistryMap = new Map<string, ActionDefinition>(
  actionRegistry.map(action => [action.type, action])
);