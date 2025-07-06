import { useCanvasStore, type ComponentScript } from '../canvasStore';
import type { CommandHandler } from './types';

interface UpdateScriptPayload {
  instanceId: number;
  script: ComponentScript;
}

export const UpdateScriptHandler: CommandHandler<UpdateScriptPayload> = {
  execute(payload) {
    const canvasStore = useCanvasStore();
    const component = canvasStore.componentInstances.find(c => c.instanceId === payload.instanceId);
    if (!component || !component.scripts) return;
    const scriptIndex = component.scripts.findIndex(s => s.id === payload.script.id);
    if (scriptIndex !== -1) {
      component.scripts[scriptIndex] = payload.script;
    }
  },
};