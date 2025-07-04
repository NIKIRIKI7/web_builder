import { defineStore } from 'pinia';
// 'computed' был удален из этой строки, так как он не используется
import { componentsMap } from '@/entities/UiComponent/model/libraryComponents';
import type { RenderedComponent } from './types';

// 1. Изменяем состояние: теперь здесь только простые данные
interface CanvasInstanceState {
    instanceId: number;
    componentId: string;
}

interface CanvasState {
    // Храним только массив экземпляров с их ID
    componentInstances: CanvasInstanceState[];
}

export const useCanvasStore = defineStore('canvas', {
    state: (): CanvasState => ({
        componentInstances: [],
    }),

    // 2. Создаем геттер для получения полного списка компонентов для рендеринга
    getters: {
        /**
         * Возвращает полный список компонентов для рендеринга.
         * Этот геттер является вычисляемым свойством (computed) и будет кэшироваться.
         */
        renderedComponents(state): RenderedComponent[] {
            return state.componentInstances.map((instance) => {
                const componentInfo = componentsMap.get(instance.componentId);
                // Мы уверены, что componentInfo существует, так как добавляем только из map
                return {
                    instanceId: instance.instanceId,
                    componentInfo: componentInfo!,
                };
            });
        },
    },

    actions: {
        /**
         * Добавляет новый компонент на холст.
         * @param componentId - ID компонента из библиотеки.
         */
        addComponent(componentId: string) {
            // Проверяем, что компонент с таким ID вообще существует
            if (!componentsMap.has(componentId)) {
                console.error(`Component with id "${componentId}" not found in library.`);
                return;
            }

            // 3. В action мы работаем только с простыми данными
            const newInstance: CanvasInstanceState = {
                instanceId: Date.now(),
                componentId: componentId,
            };

            this.componentInstances.push(newInstance);
        },
    },
});