import { defineStore } from 'pinia';
import type { CanvasState, CanvasInstanceState, ComponentScript, FullRenderedComponent } from '@/entities/Canvas/model/types';

export type { CanvasState, CanvasInstanceState, ComponentScript, FullRenderedComponent };

export const useCanvasStore = defineStore('canvas', {
  state: (): CanvasState => ({
    componentInstances: [],
    selectedComponentInstanceId: null,
    isEditorOpen: false,
  }),
  actions: {
    resetState() {
      this.$patch({
        componentInstances: [],
        selectedComponentInstanceId: null,
        isEditorOpen: false,
      });
    },

    setState(newState: CanvasState) {
      this.$patch({
        componentInstances: newState.componentInstances,
        selectedComponentInstanceId: newState.selectedComponentInstanceId,
        isEditorOpen: newState.isEditorOpen,
      });
    },

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
      if (instanceId !== null) {
        this.isEditorOpen = true;
      }
    },

    closeEditor() {
      this.selectedComponentInstanceId = null;
      this.isEditorOpen = false;
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
          trigger: { type: 'onClick', selector: '' },
          actions: []
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
        this.closeEditor();
      }
      this.componentInstances = this.componentInstances.filter(
        (instance) => instance.instanceId !== instanceId
      );
    },

    setComponentInstances(newInstances: CanvasInstanceState[]) {
      this.componentInstances = newInstances;
    },
  },
});