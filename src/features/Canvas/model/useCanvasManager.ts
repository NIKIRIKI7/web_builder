import { computed } from 'vue';
import { useCanvasStore, type FullRenderedComponent, type CanvasInstanceState } from './canvasStore';
import { getComponentDefinition, getCachedComponentDefinition } from '@/entities/UiComponent/model/registry';
import { klona } from 'klona/lite';

export function useCanvasManager() {
  const store = useCanvasStore();

  const renderedComponents = computed((): FullRenderedComponent[] => {
    return store.componentInstances.map((instance) => {
      const componentDefinition = getCachedComponentDefinition(instance.componentId);
      if (!componentDefinition) {
        console.error(`Definition for component id ${instance.componentId} not preloaded. Canvas may not render correctly.`);
        return null;
      }
      const renderedComponent: FullRenderedComponent = {
        instanceId: instance.instanceId,
        componentDefinition: componentDefinition,
        props: instance.props,
        styles: instance.styles,
        scripts: instance.scripts || [],
      };
      return renderedComponent;
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

  const draggableComponents = computed<FullRenderedComponent[]>({
    get() {
      return renderedComponents.value;
    },
    set(newOrder: FullRenderedComponent[]) {
      const newInstances: CanvasInstanceState[] = newOrder.map(c => ({
        instanceId: c.instanceId,
        componentId: c.componentDefinition.id,
        props: c.props,
        styles: c.styles,
        scripts: c.scripts,
      }));
      store.setComponentInstances(newInstances);
    }
  });

  async function addComponent(componentId: string) {
    const componentDefinition = await getComponentDefinition(componentId);
    if (!componentDefinition) return;

    const newInstance: CanvasInstanceState = {
      instanceId: Date.now(),
      componentId: componentId,
      props: klona(componentDefinition.defaultProps || {}),
      styles: klona(componentDefinition.defaultStyles || {}),
      scripts: [],
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

  async function preloadCanvasDefinitions() {
    if (store.componentInstances.length === 0) return;
    const uniqueIds = [...new Set(store.componentInstances.map(i => i.componentId))];
    await Promise.all(uniqueIds.map(id => getComponentDefinition(id)));
  }

  return {
    renderedComponents,
    selectedComponent,
    draggableComponents,
    selectedComponentInstanceId: computed(() => store.selectedComponentInstanceId),
    addComponent,
    cloneComponent,
    preloadCanvasDefinitions,
    selectComponent: store.selectComponent,
    updateComponentProps: store.updateComponentProps,
    updateComponentStyles: store.updateComponentStyles,
    deleteComponent: store.deleteComponent,
    setComponentInstances: store.setComponentInstances,
    addScript: store.addScript,
    updateScript: store.updateScript,
    deleteScript: store.deleteScript,
  };
}