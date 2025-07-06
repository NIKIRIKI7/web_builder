import { useCanvasStore } from '../canvasStore';
import type { CommandHandler } from './types';

interface DeleteComponentPayload {
  instanceId: number;
}

export const DeleteComponentHandler: CommandHandler<DeleteComponentPayload> = {
  execute(payload) {
    const canvasStore = useCanvasStore();
    if (canvasStore.selectedComponentInstanceId === payload.instanceId) {
      canvasStore.closeEditor();
    }
    canvasStore.componentInstances = canvasStore.componentInstances.filter(
      (instance) => instance.instanceId !== payload.instanceId
    );
  },
};