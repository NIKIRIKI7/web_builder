import { useCanvasStore } from '../canvasStore';
import type { CommandHandler } from './types';

interface UpdatePropsPayload {
  instanceId: number;
  newValues: Record<string, unknown>;
}

export const UpdatePropsHandler: CommandHandler<UpdatePropsPayload> = {
  execute(payload) {
    const canvasStore = useCanvasStore();
    const component = canvasStore.componentInstances.find(c => c.instanceId === payload.instanceId);
    if (component) {
      component.props = { ...component.props, ...payload.newValues };
    }
  },
};