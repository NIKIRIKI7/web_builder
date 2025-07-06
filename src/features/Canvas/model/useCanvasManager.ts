import { dispatchCommand } from './commands/commandBus';
import type { ComponentScript, CanvasInstanceState } from './canvasStore';

export function useCanvasManager() {
  return {
    addComponent: (componentId: string) => {
      dispatchCommand({ type: 'ADD_COMPONENT', payload: { componentId } });
    },
    addComponentAt: (payload: { componentId: string; targetId: number; position: 'before' | 'after' }) => {
      dispatchCommand({ type: 'ADD_COMPONENT_AT', payload });
    },
    updateComponentProps: (payload: { instanceId: number; newValues: Record<string, any> }) => {
      dispatchCommand({ type: 'UPDATE_PROPS', payload });
    },
    updateComponentStyles: (payload: { instanceId: number; newValues: Record<string, any> }) => {
      dispatchCommand({ type: 'UPDATE_STYLES', payload });
    },
    cloneComponent: (instanceId: number) => {
      dispatchCommand({ type: 'CLONE_COMPONENT', payload: { instanceId } });
    },
    deleteComponent: (instanceId: number) => {
      dispatchCommand({ type: 'DELETE_COMPONENT', payload: { instanceId } });
    },
    selectComponent: (instanceId: number | null) => {
      dispatchCommand({ type: 'SELECT_COMPONENT', payload: { instanceId } });
    },
    closeEditor: () => {
      dispatchCommand({ type: 'CLOSE_EDITOR', payload: {} });
    },
    setDraggableOrder: (newOrder: CanvasInstanceState[]) => {
      dispatchCommand({ type: 'SET_COMPONENT_ORDER', payload: newOrder });
    },
    addScript: (instanceId: number) => {
      dispatchCommand({ type: 'ADD_SCRIPT', payload: { instanceId } });
    },
    updateScript: (payload: { instanceId: number; script: ComponentScript }) => {
      dispatchCommand({ type: 'UPDATE_SCRIPT', payload });
    },
    deleteScript: (payload: { instanceId: number; scriptId: string }) => {
      dispatchCommand({ type: 'DELETE_SCRIPT', payload });
    },
  };
}