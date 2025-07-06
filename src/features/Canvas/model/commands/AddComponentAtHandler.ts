import { useCanvasStore, type CanvasInstanceState } from '../canvasStore';
import { getComponentDefinition } from '@/entities/UiComponent/model/registry';
import { klona } from 'klona/lite';
import type { CommandHandler } from './types';

interface AddComponentAtPayload {
  componentId: string;
  targetId: number;
  position: 'before' | 'after';
}

export const AddComponentAtHandler: CommandHandler<AddComponentAtPayload> = {
  async execute(payload) {
    const canvasStore = useCanvasStore();
    const componentDefinition = await getComponentDefinition(payload.componentId);
    if (!componentDefinition) return;

    const newInstance: CanvasInstanceState = {
      instanceId: Date.now(),
      componentId: payload.componentId,
      props: klona(componentDefinition.defaultProps || {}),
      styles: klona(componentDefinition.defaultStyles || {}),
      scripts: [],
      children: [],
    };

    canvasStore._addInstanceAt({ instance: newInstance, targetId: payload.targetId, position: payload.position });
    canvasStore.selectComponent(newInstance.instanceId);
  },
};