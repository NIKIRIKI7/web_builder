import { useCanvasStore } from '../canvasStore';
import type { CommandHandler } from './types';

export const CloseEditorHandler: CommandHandler<object> = {
  execute() {
    const canvasStore = useCanvasStore();
    canvasStore.closeEditor();
  },
};