import { useCanvasStore } from '../canvasStore';

import type { CommandHandler } from './types';

interface DeleteScriptPayload {
  instanceId: number;
  scriptId: string;
}

export const DeleteScriptHandler: CommandHandler<DeleteScriptPayload> = {
  execute(payload) {
    const canvasStore = useCanvasStore();
    const component = canvasStore.componentInstances.find(c => c.instanceId === payload.instanceId);
    if (component && component.scripts) {
      component.scripts = component.scripts.filter(s => s.id !== payload.scriptId);
    }
  },
};