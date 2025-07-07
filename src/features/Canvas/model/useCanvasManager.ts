import type { CanvasInstanceState, ComponentScript } from '@/entities/Canvas/model/types';

import { dispatchCommand } from './commands/commandBus';

type CanvasManager = {
  addComponent: (componentId: string) => void;
  addComponentAt: (payload: { componentId: string; targetId: number; position: 'before' | 'after' }) => void;
  updateComponentProps: (payload: { instanceId: number; newValues: Record<string, unknown> }) => void;
  updateComponentStyles: (payload: { instanceId: number; newValues: Record<string, unknown> }) => void;
  cloneComponent: (instanceId: number) => void;
  deleteComponent: (instanceId: number) => void;
  selectComponent: (instanceId: number | null) => void;
  closeEditor: () => void;
  setDraggableOrder: (newOrder: CanvasInstanceState[]) => void;
  addScript: (instanceId: number) => void;
  updateScript: (payload: { instanceId: number; script: ComponentScript }) => void;
  deleteScript: (payload: { instanceId: number; scriptId: string }) => void;
};

export function useCanvasManager(): CanvasManager {
  return {
    addComponent: (componentId: string) => {
      dispatchCommand({ type: 'ADD_COMPONENT', payload: { componentId } });
    },
    addComponentAt: (payload: { componentId: string; targetId: number; position: 'before' | 'after' }) => {
      dispatchCommand({ type: 'ADD_COMPONENT_AT', payload });
    },
    updateComponentProps: (payload: { instanceId: number; newValues: Record<string, unknown> }) => {
      dispatchCommand({ type: 'UPDATE_PROPS', payload });
    },
    updateComponentStyles: (payload: { instanceId: number; newValues: Record<string, unknown> }) => {
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
    }
  };
}