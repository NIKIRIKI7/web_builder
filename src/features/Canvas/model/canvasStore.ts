import { defineStore } from 'pinia';
import type { UiComponentInfo } from '@/entities/UiComponent/model/types';

interface CanvasInstanceState {
    instanceId: number;
    componentId: string;
    props: Record<string, any>;
    styles: Record<string, any>;
}

export interface FullRenderedComponent {
    instanceId: number;
    componentInfo: UiComponentInfo;
    props: Record<string, any>;
    styles: Record<string, any>;
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

        deleteComponent(instanceId: number) {
            if (this.selectedComponentInstanceId === instanceId) {
                this.selectedComponentInstanceId = null;
            }
            this.componentInstances = this.componentInstances.filter(
                (instance) => instance.instanceId !== instanceId
            );
        },

        // Этот экшен важен для drag-and-drop
        setComponentInstances(newInstances: CanvasInstanceState[]) {
            this.componentInstances = newInstances;
        },
    },

    persist: true,
});