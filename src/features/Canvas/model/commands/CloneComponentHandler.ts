import { klona } from 'klona/lite';

import { useCanvasStore } from '../canvasStore';

import type { CommandHandler } from './types';

interface CloneComponentPayload {
  instanceId: number;
}

export const CloneComponentHandler: CommandHandler<CloneComponentPayload> = {
  execute(payload) {
    const canvasStore = useCanvasStore();
    const originalInstance = canvasStore.componentInstances.find(
      (instance) => instance.instanceId === payload.instanceId
    );
    if (!originalInstance) return;

    const newInstance = klona(originalInstance);
    newInstance.instanceId = Date.now();

    const originalIndex = canvasStore.componentInstances.findIndex(
      (instance) => instance.instanceId === payload.instanceId
    );

    if (originalIndex !== -1) {
      canvasStore.componentInstances.splice(originalIndex + 1, 0, newInstance);
      canvasStore.selectComponent(newInstance.instanceId);
    }
  },
};