import { useCanvasStore, type CanvasInstanceState, type ComponentScript } from './canvasStore';
import { getComponentDefinition } from '@/entities/UiComponent/model/registry';
import { klona } from 'klona/lite';

export function useCanvasManager() {
  const store = useCanvasStore();

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

  function setDraggableOrder(newOrder: CanvasInstanceState[]) {
    store.setComponentInstances(newOrder);
  }

  return {
    addComponent,
    addComponentAt,
    cloneComponent,
    selectComponent: (id: number | null) => store.selectComponent(id),
    closeEditor: () => store.closeEditor(),
    updateComponentProps: (payload: { instanceId: number; newValues: Record<string, any> }) => store.updateComponentProps(payload),
    updateComponentStyles: (payload: { instanceId: number; newValues: Record<string, any> }) => store.updateComponentStyles(payload),
    deleteComponent: (id: number) => store.deleteComponent(id),
    setDraggableOrder,
    addScript: (id: number) => store.addScript(id),
    updateScript: (payload: { instanceId: number; script: ComponentScript }) => store.updateScript(payload),
    deleteScript: (payload: { instanceId: number; scriptId: string }) => store.deleteScript(payload),
  };
}