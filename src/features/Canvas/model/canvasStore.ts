import { defineStore } from 'pinia';
import { componentsMap } from '@/entities/UiComponent/model/libraryComponents';
import type { RenderedComponent } from './types';

interface CanvasInstanceState {
    instanceId: number;
    componentId: string;
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
        renderedComponents(state): RenderedComponent[] {
            return state.componentInstances.map((instance) => {
                const componentInfo = componentsMap.get(instance.componentId);
                // Мы уверены, что componentInfo существует
                return {
                    instanceId: instance.instanceId,
                    componentInfo: componentInfo!,
                };
            });
        },

        /**
         * Геттер для получения информации о выбранном компоненте.
         * В будущем будет использоваться редактором.
         */
        // ИСПРАВЛЕНИЕ:
        // 1. Четко указываем тип возвращаемого значения: RenderedComponent | null.
        // 2. Логика теперь зависит только от 'state', а не от 'this'.
        selectedComponent(state): RenderedComponent | null {
            if (state.selectedComponentInstanceId === null) {
                return null;
            }

            // Находим нужный экземпляр в состоянии
            const selectedInstance = state.componentInstances.find(
                (instance) => instance.instanceId === state.selectedComponentInstanceId
            );

            if (!selectedInstance) {
                return null;
            }

            // Получаем полную информацию о компоненте из 'componentsMap'
            const componentInfo = componentsMap.get(selectedInstance.componentId);

            if (!componentInfo) {
                // Такого быть не должно, если логика добавления верна, но это безопасная проверка
                return null;
            }

            return {
                instanceId: selectedInstance.instanceId,
                componentInfo: componentInfo,
            };
        },
    },

    actions: {
        addComponent(componentId: string) {
            if (!componentsMap.has(componentId)) {
                console.error(`Component with id "${componentId}" not found in library.`);
                return;
            }

            const newInstance: CanvasInstanceState = {
                instanceId: Date.now(),
                componentId: componentId,
            };

            this.componentInstances.push(newInstance);
            this.selectComponent(newInstance.instanceId);
        },

        selectComponent(instanceId: number | null) {
            this.selectedComponentInstanceId = instanceId;
        },
    },
});