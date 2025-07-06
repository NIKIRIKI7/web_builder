import { useCanvasStore, type ComponentScript } from '../canvasStore';
import type { CommandHandler } from './types';

interface AddScriptPayload {
  instanceId: number;
}

export const AddScriptHandler: CommandHandler<AddScriptPayload> = {
  execute(payload) {
    const canvasStore = useCanvasStore();
    const component = canvasStore.componentInstances.find(c => c.instanceId === payload.instanceId);
    if (component) {
      const newScript: ComponentScript = {
        id: `script_${Date.now()}`,
        trigger: { type: 'onClick', selector: '' },
        actions: []
      };
      if (!component.scripts) {
        component.scripts = [];
      }
      component.scripts.push(newScript);
    }
  },
};