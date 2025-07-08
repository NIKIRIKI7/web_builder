import { useCanvasStore } from '../canvasStore';

import type { CommandHandler } from './types';

interface UpdateStylesPayload {
  instanceId: number;
  newValues: Record<string, unknown>;
}

export const UpdateStylesHandler: CommandHandler<UpdateStylesPayload> = {
  execute(payload) {
    const canvasStore = useCanvasStore();
    const component = canvasStore.componentInstances.find(c => c.instanceId === payload.instanceId);
    if (component) {
      Object.assign(component.styles, payload.newValues);
    }
  },
};