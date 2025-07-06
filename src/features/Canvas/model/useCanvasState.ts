import { computed, watchEffect, ref, type Ref } from 'vue';
import { useCanvasStore, type FullRenderedComponent, type CanvasInstanceState } from './canvasStore';
import { getComponentDefinition, getCachedComponentDefinition } from '@/entities/UiComponent/model/registry';

async function processInstances(instances: CanvasInstanceState[]): Promise<FullRenderedComponent[]> {
  const definitionsToLoad = new Set<string>();

  function findDefs(insts: CanvasInstanceState[]) {
    for (const instance of insts) {
      if (!getCachedComponentDefinition(instance.componentId)) {
        definitionsToLoad.add(instance.componentId);
      }
      if (instance.children) {
        findDefs(instance.children);
      }
    }
  }

  findDefs(instances);

  if (definitionsToLoad.size > 0) {
    await Promise.all(
      [...definitionsToLoad].map(id => getComponentDefinition(id).catch(err => {
        console.error(`Failed to load definition for component ID "${id}":`, err);
      }))
    );
  }

  async function buildRenderedTree(insts: CanvasInstanceState[]): Promise<FullRenderedComponent[]> {
    const renderedList: FullRenderedComponent[] = [];
    for (const instance of insts) {
      const componentDefinition = getCachedComponentDefinition(instance.componentId);
      if (componentDefinition) {
        const renderedComponent: FullRenderedComponent = {
          instanceId: instance.instanceId,
          componentDefinition: componentDefinition,
          props: instance.props,
          styles: instance.styles,
          scripts: instance.scripts || [],
          children: instance.children ? await buildRenderedTree(instance.children) : [],
        };
        renderedList.push(renderedComponent);
      }
    }
    return renderedList;
  }

  return buildRenderedTree(instances);
}

function findComponentInTree(tree: FullRenderedComponent[], instanceId: number): FullRenderedComponent | null {
  for (const component of tree) {
    if (component.instanceId === instanceId) {
      return component;
    }
    if (component.children) {
      const found = findComponentInTree(component.children, instanceId);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export function useCanvasState() {
  const store = useCanvasStore();
  const renderedComponents: Ref<FullRenderedComponent[]> = ref([]);

  watchEffect(async () => {
    renderedComponents.value = await processInstances(store.componentInstances);
  });

  const selectedComponent = computed((): FullRenderedComponent | null => {
    if (store.selectedComponentInstanceId === null) {
      return null;
    }
    return findComponentInTree(renderedComponents.value, store.selectedComponentInstanceId);
  });

  return {
    renderedComponents,
    selectedComponent,
    selectedComponentInstanceId: computed(() => store.selectedComponentInstanceId),
    isEditorOpen: computed(() => store.isEditorOpen),
  };
}