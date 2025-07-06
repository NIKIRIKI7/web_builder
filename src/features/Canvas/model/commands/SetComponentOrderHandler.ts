import { useCanvasStore, type CanvasInstanceState } from '../canvasStore';
import type { CommandHandler } from './types';

export const SetComponentOrderHandler: CommandHandler<CanvasInstanceState[]> = {
  execute(payload) {
    const canvasStore = useCanvasStore();
    canvasStore.setComponentInstances(payload);
  },
};