// src/features/Canvas/model/canvasStore.ts

import { defineStore } from 'pinia';
import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { componentsMap } from '@/entities/UiComponent/model/libraryComponents';
import type { UiComponentInfo } from '@/entities/UiComponent/model/types';
import { getDocumentCss } from '@/shared/lib/export/getCss';

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

    getters: {
        renderedComponents(state): FullRenderedComponent[] {
            return state.componentInstances.map((instance) => {
                const componentInfo = componentsMap.get(instance.componentId);
                if (!componentInfo) {
                    throw new Error(`Component with id ${instance.componentId} not found in map.`);
                }
                return {
                    instanceId: instance.instanceId,
                    componentInfo: componentInfo,
                    props: instance.props,
                    styles: instance.styles,
                };
            }).filter(Boolean) as FullRenderedComponent[];
        },
        selectedComponent(state): FullRenderedComponent | null {
            if (state.selectedComponentInstanceId === null) {
                return null;
            }
            const selectedInstance = state.componentInstances.find(
                (instance) => instance.instanceId === state.selectedComponentInstanceId
            );
            if (!selectedInstance) return null;

            const componentInfo = componentsMap.get(selectedInstance.componentId);
            if (!componentInfo) return null;

            return {
                instanceId: selectedInstance.instanceId,
                componentInfo: componentInfo,
                props: selectedInstance.props,
                styles: selectedInstance.styles,
            };
        },
    },

    actions: {
        addComponent(componentId: string) {
            const componentInfo = componentsMap.get(componentId);
            if (!componentInfo) return;

            const newInstance: CanvasInstanceState = {
                instanceId: Date.now(),
                componentId: componentId,
                props: { ...(componentInfo.defaultProps || {}) },
                styles: { ...(componentInfo.defaultStyles || {}) },
            };

            this.componentInstances.push(newInstance);
            this.selectComponent(newInstance.instanceId);
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

        setComponentInstances(newInstances: CanvasInstanceState[]) {
            this.componentInstances = newInstances;
        },

        async generateHtmlString(): Promise<string> {
            const stylesObjectToString = (styles: Record<string, any>): string => {
                return Object.entries(styles)
                    .map(([key, value]) => {
                        const kebabKey = key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
                        return `${kebabKey}: ${value};`;
                    })
                    .join(' ');
            };

            const renderedComponentsHtml = await Promise.all(
                this.renderedComponents.map(async (component) => {
                    const app = createSSRApp(component.componentInfo.component, component.props);
                    const renderedHtml = await renderToString(app);
                    return `
                      <div style="${stylesObjectToString(component.styles)}">
                        ${renderedHtml}
                      </div>`;
                })
            );

            const allCss = getDocumentCss();

            return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Exported Page</title>
    <style>
        ${allCss}
        body { margin: 0; background-color: #f0f2f5; }
    </style>
</head>
<body>
    ${renderedComponentsHtml.join('\n')}
</body>
</html>`;
        }
    },

    persist: true,
});