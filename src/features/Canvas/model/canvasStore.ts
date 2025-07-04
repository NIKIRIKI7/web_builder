import { defineStore } from 'pinia';
import { componentsMap } from '@/entities/UiComponent/model/libraryComponents';
import type { UiComponentInfo } from '@/entities/UiComponent/model/types';

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
        /**
         * Геттер, возвращающий полный список компонентов для рендеринга на холсте.
         */
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
        /**
         * Геттер, возвращающий полную информацию о выбранном в данный момент компоненте.
         */
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
        /**
         * Добавляет новый компонент на холст.
         */
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
        /**
         * Устанавливает ID выбранного компонента.
         */
        selectComponent(instanceId: number | null) {
            this.selectedComponentInstanceId = instanceId;
        },
        /**
         * Обновляет пропсы (контент) для указанного компонента.
         */
        updateComponentProps(payload: { instanceId: number, newProps: Record<string, any> }) {
            const component = this.componentInstances.find(c => c.instanceId === payload.instanceId);
            if (component) {
                component.props = { ...component.props, ...payload.newProps };
            }
        },
        /**
         * Обновляет стили для указанного компонента.
         */
        updateComponentStyles(payload: { instanceId: number, newStyles: Record<string, any> }) {
            const component = this.componentInstances.find(c => c.instanceId === payload.instanceId);
            if (component) {
                component.styles = { ...component.styles, ...payload.newStyles };
            }
        },
        /**
         * Удаляет компонент с холста по его ID.
         */
        deleteComponent(instanceId: number) {
            if (this.selectedComponentInstanceId === instanceId) {
                this.selectedComponentInstanceId = null;
            }
            this.componentInstances = this.componentInstances.filter(
                (instance) => instance.instanceId !== instanceId
            );
        },
        /**
         * Заменяет текущий массив компонентов новым.
         * Используется для синхронизации с vuedraggable после сортировки.
         */
        setComponentInstances(newInstances: CanvasInstanceState[]) {
            this.componentInstances = newInstances;
        }
    },

    /**
     * Включает сохранение состояния для этого стора в Local Storage.
     * Требует установки и подключения `pinia-plugin-persistedstate`.
     */
    persist: true,
});