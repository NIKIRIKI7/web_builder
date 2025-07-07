import { useCanvasStore } from '../canvasStore';

import type { CommandHandler } from './types';

interface SelectComponentPayload {
  instanceId: number | null;
}

export const SelectComponentHandler: CommandHandler<SelectComponentPayload> = {
  execute(payload) {
    const canvasStore = useCanvasStore();
    canvasStore.selectComponent(payload.instanceId);
  },
};