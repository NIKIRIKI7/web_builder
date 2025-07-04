import { computed } from 'vue';
import { useCanvasStore, type FullRenderedComponent } from './canvasStore';
import { componentsMap } from '@/entities/UiComponent/model/libraryComponents';
import { klona } from 'klona/lite';

export function useCanvasManager() {
    const store = useCanvasStore();

    // --- COMPUTED (бывшие геттеры) ---

    const renderedComponents = computed((): FullRenderedComponent[] => {
        return store.componentInstances.map((instance) => {
            const componentInfo = componentsMap.get(instance.componentId);
            if (!componentInfo) {
                console.error(`Component with id ${instance.componentId} not found in map.`);
                return null;
            }
            return {
                instanceId: instance.instanceId,
                componentInfo: componentInfo,
                props: instance.props,
                styles: instance.styles,
            };
        }).filter((c): c is FullRenderedComponent => c !== null);
    });

    const selectedComponent = computed((): FullRenderedComponent | null => {
        if (store.selectedComponentInstanceId === null) {
            return null;
        }
        return renderedComponents.value.find(
            (c) => c.instanceId === store.selectedComponentInstanceId
        ) || null;
    });

    // --- ACTIONS (сложная логика) ---

    function addComponent(componentId: string) {
        const componentInfo = componentsMap.get(componentId);
        if (!componentInfo) return;

        const newInstance = {
            instanceId: Date.now(),
            componentId: componentId,
            props: klona(componentInfo.defaultProps || {}),
            styles: klona(componentInfo.defaultStyles || {}),
        };

        store._addInstance(newInstance);
        store.selectComponent(newInstance.instanceId);
    }

    function cloneComponent(instanceId: number) {
        const originalInstance = store.componentInstances.find(
            (instance) => instance.instanceId === instanceId
        );
        if (!originalInstance) return;

        const newInstance = klona(originalInstance);
        newInstance.instanceId = Date.now();

        const originalIndex = store.componentInstances.findIndex(
            (instance) => instance.instanceId === instanceId
        );

        const newInstances = [...store.componentInstances];
        newInstances.splice(originalIndex + 1, 0, newInstance);

        store.setComponentInstances(newInstances);
        store.selectComponent(newInstance.instanceId);
    }

    return {
        // --- State / Computed ---
        renderedComponents,
        selectedComponent,
        // Прокидываем ID для прямого доступа, если нужно
        selectedComponentInstanceId: computed(() => store.selectedComponentInstanceId),

        // --- Actions ---
        addComponent,
        cloneComponent,

        // --- Пере-экспорт простых экшенов из стора ---
        selectComponent: store.selectComponent,
        updateComponentProps: store.updateComponentProps,
        updateComponentStyles: store.updateComponentStyles,
        deleteComponent: store.deleteComponent,
        setComponentInstances: store.setComponentInstances,
    };
}