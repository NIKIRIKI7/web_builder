import { defineStore } from 'pinia';
import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { componentsMap } from '@/entities/UiComponent/model/libraryComponents';
import type { UiComponentInfo } from '@/entities/UiComponent/model/types';
import { getDocumentCss } from '@/shared/lib/export/getCss';

/**
 * Описывает состояние одного экземпляра компонента на холсте.
 * Это "сырые" данные, которые мы храним.
 */
interface CanvasInstanceState {
    instanceId: number;
    componentId: string;
    props: Record<string, any>;
    styles: Record<string, any>;
}

/**
 * Описывает полный, обогащенный объект компонента, который используется
 * геттерами для передачи в UI (в Canvas и EditorPanel).
 */
export interface FullRenderedComponent {
    instanceId: number;
    componentInfo: UiComponentInfo;
    props: Record<string, any>;
    styles: Record<string, any>;
}

/**
 * Описывает структуру всего состояния хранилища.
 */
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
                return {
                    instanceId: instance.instanceId,
                    componentInfo: componentInfo!,
                    props: instance.props,
                    styles: instance.styles,
                };
            });
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
                styles: {
                    backgroundColor: '#ffffff',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                },
            };

            this.componentInstances.push(newInstance);
            this.selectComponent(newInstance.instanceId);
        },
        selectComponent(instanceId: number | null) {
            this.selectedComponentInstanceId = instanceId;
        },
        updateComponentProps(payload: { instanceId: number, newProps: Record<string, any> }) {
            const component = this.componentInstances.find(c => c.instanceId === payload.instanceId);
            if (component) {
                component.props = { ...component.props, ...payload.newProps };
            }
        },
        updateComponentStyles(payload: { instanceId: number, newStyles: Record<string, any> }) {
            const component = this.componentInstances.find(c => c.instanceId === payload.instanceId);
            if (component) {
                component.styles = { ...component.styles, ...payload.newStyles };
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
        /**
         * Асинхронно генерирует HTML-строку, рендеря каждый компонент в памяти.
         * @returns {Promise<string>} Промис, который разрешается в готовую HTML-строку.
         */
        async generateHtmlString(): Promise<string> {
            const stylesObjectToString = (styles: Record<string, any>): string => {
                return Object.entries(styles)
                    .map(([key, value]) => {
                        const kebabKey = key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
                        return `${kebabKey}: ${value};`;
                    })
                    .join(' ');
            };

            const renderedComponentsHtml = [];
            for (const component of this.renderedComponents) {
                const app = createSSRApp(component.componentInfo.component, component.props);
                const renderedHtml = await renderToString(app);

                const componentWrapper = `
          <div style="${stylesObjectToString(component.styles)}">
            ${renderedHtml}
          </div>`;

                renderedComponentsHtml.push(componentWrapper);
            }

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