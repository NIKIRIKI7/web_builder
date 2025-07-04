import { defineStore } from 'pinia';
import { componentsMap } from '@/entities/UiComponent/model/libraryComponents';
import type { UiComponentInfo } from '@/entities/UiComponent/model/types';

/**
 * Описывает состояние одного экземпляра компонента на холсте.
 */
interface CanvasInstanceState {
    instanceId: number;
    componentId: string;
    props: Record<string, any>;
    styles: Record<string, any>;
}

/**
 * Описывает полный объект компонента, который используется для рендеринга и в редакторе.
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
         * @param componentId - ID компонента из библиотеки.
         */
        addComponent(componentId: string) {
            const componentInfo = componentsMap.get(componentId);
            if (!componentInfo) return;

            const newInstance: CanvasInstanceState = {
                instanceId: Date.now(),
                componentId: componentId,
                // Копируем пропсы по умолчанию
                props: { ...(componentInfo.defaultProps || {}) },
                // Инициализируем стили со значениями по умолчанию
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
         * @param instanceId - ID экземпляра или null для снятия выделения.
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
        }
    },
});