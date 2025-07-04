import { defineStore } from 'pinia';
import { componentsMap } from '@/entities/UiComponent/model/libraryComponents';
import type { UiComponentInfo } from '@/entities/UiComponent/model/types';

interface CanvasInstanceState {
    instanceId: number;
    componentId: string;
    // У каждого экземпляра теперь есть свои пропсы
    props: Record<string, any>;
}

// Тип RenderedComponent теперь тоже должен включать пропсы
export interface FullRenderedComponent {
    instanceId: number;
    componentInfo: UiComponentInfo;
    props: Record<string, any>;
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
        // Геттеры теперь возвращают новый, более полный тип
        renderedComponents(state): FullRenderedComponent[] {
            return state.componentInstances.map((instance) => {
                const componentInfo = componentsMap.get(instance.componentId);
                return {
                    instanceId: instance.instanceId,
                    componentInfo: componentInfo!,
                    props: instance.props,
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
                // Копируем пропсы по умолчанию в новый экземпляр
                props: { ...(componentInfo.defaultProps || {}) },
            };

            this.componentInstances.push(newInstance);
            this.selectComponent(newInstance.instanceId);
        },
        selectComponent(instanceId: number | null) {
            this.selectedComponentInstanceId = instanceId;
        },
        /**
         * Новый action для обновления пропсов конкретного компонента.
         * @param payload - содержит ID экземпляра и новые значения пропсов
         */
        updateComponentProps(payload: { instanceId: number, newProps: Record<string, any> }) {
            const component = this.componentInstances.find(c => c.instanceId === payload.instanceId);
            if (component) {
                // Обновляем пропсы, сохраняя старые, если они не были изменены
                component.props = { ...component.props, ...payload.newProps };
            }
        }
    },
});