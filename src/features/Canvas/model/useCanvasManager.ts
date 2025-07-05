import { computed, watchEffect, ref, type Ref } from 'vue';
import { useCanvasStore, type FullRenderedComponent, type CanvasInstanceState, type ComponentScript } from './canvasStore';
import { getComponentDefinition, getCachedComponentDefinition } from '@/entities/UiComponent/model/registry';
import { klona } from 'klona/lite';

export function useCanvasManager() {
  const store = useCanvasStore();
  const renderedComponents: Ref<FullRenderedComponent[]> = ref([]);

  watchEffect(async () => {
    const instances = store.componentInstances;
    const definitionsToLoad = instances
      .map(instance => instance.componentId)
      .filter(id => !getCachedComponentDefinition(id));

    if (definitionsToLoad.length > 0) {
      const uniqueIds = [...new Set(definitionsToLoad)];
      await Promise.all(
        uniqueIds.map(id => getComponentDefinition(id).catch(err => {
          console.error(`Failed to load definition for component ID "${id}":`, err);
          const instanceToDelete = instances.find(i => i.componentId === id);
          if (instanceToDelete) {
            store.deleteComponent(instanceToDelete.instanceId);
          }
        }))
      );
    }

    const newRenderedComponents: FullRenderedComponent[] = [];
    for (const instance of instances) {
      const componentDefinition = getCachedComponentDefinition(instance.componentId);
      if (componentDefinition) {
        newRenderedComponents.push({
          instanceId: instance.instanceId,
          componentDefinition: componentDefinition,
          props: instance.props,
          styles: instance.styles,
          scripts: instance.scripts || [],
        });
      }
    }
    renderedComponents.value = newRenderedComponents;
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

  async function addComponentAt(payload: { componentId: string; targetId: number; position: 'before' | 'after' }) {
    const componentDefinition = await getComponentDefinition(payload.componentId);
    if (!componentDefinition) return;

    const newInstance: CanvasInstanceState = {
      instanceId: Date.now(),
      componentId: payload.componentId,
      props: klona(componentDefinition.defaultProps || {}),
      styles: klona(componentDefinition.defaultStyles || {}),
      scripts: [],
    };

    store._addInstanceAt({ instance: newInstance, targetId: payload.targetId, position: payload.position });
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

  function selectComponent(instanceId: number | null) {
    store.selectComponent(instanceId);
  }

  function updateComponentProps(payload: { instanceId: number; newValues: Record<string, any> }) {
    store.updateComponentProps(payload);
  }

  function updateComponentStyles(payload: { instanceId: number; newValues: Record<string, any> }) {
    store.updateComponentStyles(payload);
  }

  function deleteComponent(instanceId: number) {
    store.deleteComponent(instanceId);
  }

  function addScript(instanceId: number) {
    store.addScript(instanceId);
  }

  function updateScript(payload: { instanceId: number; script: ComponentScript }) {
    store.updateScript(payload);
  }

  function deleteScript(payload: { instanceId: number; scriptId: string }) {
    store.deleteScript(payload);
  }

  function setComponentInstances(newInstances: CanvasInstanceState[]) {
    store.setComponentInstances(newInstances);
  }

  return {
    renderedComponents,
    selectedComponent,
    draggableComponents,
    selectedComponentInstanceId: computed(() => store.selectedComponentInstanceId),
    addComponent,
    addComponentAt,
    cloneComponent,
    selectComponent,
    updateComponentProps,
    updateComponentStyles,
    deleteComponent,
    setComponentInstances,
    addScript,
    updateScript,
    deleteScript,
  };
}