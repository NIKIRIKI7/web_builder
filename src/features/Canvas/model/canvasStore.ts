import { defineStore } from 'pinia';
import type { UiComponentDefinition } from '@/entities/UiComponent/model/types';

export interface ComponentScript {
  id: string;
  eventName: string;
  targetSelector: string;
  code: string;
}

export interface CanvasInstanceState {
  instanceId: number;
  componentId: string;
  props: Record<string, any>;
  styles: Record<string, any>;
  scripts: ComponentScript[];
}

export interface FullRenderedComponent {
  instanceId: number;
  componentDefinition: UiComponentDefinition;
  props: Record<string, any>;
  styles: Record<string, any>;
  scripts: ComponentScript[];
}

interface CanvasState {
  componentInstances: CanvasInstanceState[];
  selectedComponentInstanceId: number | null;
}

export const useCanvasStore = defineStore('canvas', {
  state: (): CanvasState => ({
    componentInstances: [],
    selectedComponentInstanceId: null,
  }),
  actions: {
    _addInstance(instance: CanvasInstanceState) {
      this.componentInstances.push(instance);
    },
    _addInstanceAt(payload: { instance: CanvasInstanceState; targetId: number; position: 'before' | 'after' }) {
      const targetIndex = this.componentInstances.findIndex(c => c.instanceId === payload.targetId);
      if (targetIndex === -1) {
        this.componentInstances.push(payload.instance);
        return;
      }
      const insertIndex = payload.position === 'before' ? targetIndex : targetIndex + 1;
      this.componentInstances.splice(insertIndex, 0, payload.instance);
    },
    selectComponent(instanceId: number | null) {
      this.selectedComponentInstanceId = instanceId;
    },
    updateComponentProps(payload: { instanceId: number; newValues: Record<string, any> }) {
      const component = this.componentInstances.find(c => c.instanceId === payload.instanceId);
      if (component) {
        component.props = { ...component.props, ...payload.newValues };
      }
    },
    updateComponentStyles(payload: { instanceId: number; newValues: Record<string, any> }) {
      const component = this.componentInstances.find(c => c.instanceId === payload.instanceId);
      if (component) {
        component.styles = { ...component.styles, ...payload.newValues };
      }
    },
    addScript(instanceId: number) {
      const component = this.componentInstances.find(c => c.instanceId === instanceId);
      if (component) {
        const newScript: ComponentScript = {
          id: `script_${Date.now()}`,
          eventName: 'click',
          targetSelector: '',
          code: `alert('Element clicked!');`
        };
        if (!component.scripts) {
          component.scripts = [];
        }
        component.scripts.push(newScript);
      }
    },
    updateScript(payload: { instanceId: number; script: ComponentScript }) {
      const component = this.componentInstances.find(c => c.instanceId === payload.instanceId);
      if (!component || !component.scripts) return;
      const scriptIndex = component.scripts.findIndex(s => s.id === payload.script.id);
      if (scriptIndex !== -1) {
        component.scripts[scriptIndex] = payload.script;
      }
    },
    deleteScript(payload: { instanceId: number; scriptId: string }) {
      const component = this.componentInstances.find(c => c.instanceId === payload.instanceId);
      if (component && component.scripts) {
        component.scripts = component.scripts.filter(s => s.id !== payload.scriptId);
      }
    },
    deleteComponent(instanceId: number) {
      if (this.selectedComponentInstanceId === instanceId) {
        this.selectedComponentInstanceId = null;
      }
      this.componentInstances = this.componentInstances.filter(
        (instance) => instance.instanceId !== instanceId
      );
    },
    setComponentInstances(newInstances: CanvasInstanceState[]) {
      this.componentInstances = newInstances;
    },
  },
  persist: true,
});