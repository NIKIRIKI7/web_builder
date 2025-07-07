import { klona } from 'klona/lite';

import { getComponentDefinition } from '@/entities/UiComponent/model/registry';

import { useCanvasStore, type CanvasInstanceState } from '../canvasStore';

import type { CommandHandler } from './types';

interface AddComponentPayload {
  componentId: string;
}

export const AddComponentHandler: CommandHandler<AddComponentPayload> = {
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

    canvasStore._addInstance(newInstance);
    canvasStore.selectComponent(newInstance.instanceId);
  },
};