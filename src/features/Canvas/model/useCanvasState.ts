import { computed, watchEffect, ref, type Ref } from 'vue';
import { useCanvasStore, type FullRenderedComponent } from './canvasStore';
import { getComponentDefinition, getCachedComponentDefinition } from '@/entities/UiComponent/model/registry';

export function useCanvasState() {
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

  return {
    renderedComponents,
    selectedComponent,
    selectedComponentInstanceId: computed(() => store.selectedComponentInstanceId),
    isEditorOpen: computed(() => store.isEditorOpen),
  };
}
