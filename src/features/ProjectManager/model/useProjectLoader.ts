import { klona } from 'klona/lite';
import { type Ref, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';

import type { Project } from '@/entities/Project/model/types';
import { useCanvasStore } from '@/features/Canvas/model/canvasStore';
import { debounce } from '@/shared/lib/utils';

import { useProjectStore } from './projectStore';

function isValidCanvasState(data: unknown): data is Project['canvasState'] {
  if (!data || typeof data !== 'object') {
    return false;
  }
  const hasInstances =
      'componentInstances' in data && Array.isArray((data as Record<string, unknown>).componentInstances);
  const hasSelectedId =
      'selectedComponentInstanceId' in data &&
      (typeof (data as Record<string, unknown>).selectedComponentInstanceId === 'number' ||
          (data as Record<string, unknown>).selectedComponentInstanceId === null);
  return hasInstances && hasSelectedId;
}

export function useProjectLoader(projectId: Ref<string>): void {
  const projectStore = useProjectStore();
  const canvasStore = useCanvasStore();
  const router = useRouter();

  const loadProjectData = (id: string): void => {
    const project = projectStore.findProject(id);
    const stateToLoad = project?.canvasState;
    if (isValidCanvasState(stateToLoad)) {
      canvasStore.setState(klona(stateToLoad));
    } else {
      console.error(`Project with id ${id} not found or has invalid canvasState.`);
      canvasStore.resetState();
      void router.push({ name: 'Dashboard' });
    }
  };

  const updateThumbnail = debounce(() => {
    if (!projectId.value) return;

    const firstComponent = canvasStore.componentInstances[0];
    if (firstComponent && typeof firstComponent.styles?.backgroundColor === 'string') {
      projectStore.updateProjectThumbnail(projectId.value, firstComponent.styles.backgroundColor);
    } else {
      projectStore.updateProjectThumbnail(projectId.value, null);
    }
  }, 1000);

  const stopWatchingProjectId = watch(
      projectId,
      (newId) => {
        if (newId) {
          loadProjectData(newId);
          updateThumbnail();
        } else {
          canvasStore.resetState();
        }
      },
      { immediate: true }
  );

  const stopAutoSave = watch(
      () => canvasStore.componentInstances,
      (newState) => {
        if (projectId.value) {
          const fullState = {
            componentInstances: newState,
            selectedComponentInstanceId: canvasStore.selectedComponentInstanceId,
            isEditorOpen: canvasStore.isEditorOpen
          };
          projectStore.updateProjectCanvas(projectId.value, fullState);
          updateThumbnail();
        }
      },
      { deep: true }
  );

  onBeforeUnmount(() => {
    stopWatchingProjectId();
    stopAutoSave();
    canvasStore.resetState();
  });
}