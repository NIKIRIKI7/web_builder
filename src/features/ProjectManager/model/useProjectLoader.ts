import { watch, onBeforeUnmount, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectStore } from './projectStore';
import { useCanvasStore } from '@/features/Canvas/model/canvasStore';
import { klona } from 'klona/lite';
import { debounce } from '@/shared/lib/utils';
import type { Project } from '@/entities/Project/model/types';

function isValidCanvasState(data: any): data is Project['canvasState'] {
  if (!data || typeof data !== 'object') {
    return false;
  }
  const hasInstances = 'componentInstances' in data && Array.isArray(data.componentInstances);
  const hasSelectedId = 'selectedComponentInstanceId' in data && (typeof data.selectedComponentInstanceId === 'number' || data.selectedComponentInstanceId === null);
  return hasInstances && hasSelectedId;
}

export function useProjectLoader(projectId: Ref<string>) {
  const projectStore = useProjectStore();
  const canvasStore = useCanvasStore();
  const router = useRouter();

  const loadProjectData = (id: string) => {
    const project = projectStore.findProject(id);
    const stateToLoad = project?.canvasState;
    if (isValidCanvasState(stateToLoad)) {
      canvasStore.setState(klona(stateToLoad));
    } else {
      console.error(`Project with id ${id} not found or has invalid canvasState.`);
      canvasStore.resetState();
      router.push({ name: 'Dashboard' });
    }
  };

  const updateThumbnail = debounce(() => {
    if (!projectId.value) return;

    const firstComponent = canvasStore.componentInstances[0];
    if (firstComponent && firstComponent.styles?.backgroundColor) {
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
          isEditorOpen: canvasStore.isEditorOpen,
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