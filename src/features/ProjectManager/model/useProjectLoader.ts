import { watch, onBeforeUnmount, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectStore } from './projectStore';
import { useCanvasStore, type CanvasInstanceState } from '@/features/Canvas/model/canvasStore';
import { klona } from 'klona/lite';

type CanvasStoreState = {
  componentInstances: CanvasInstanceState[];
  selectedComponentInstanceId: number | null;
};

function isValidCanvasState(data: any): data is CanvasStoreState {
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

  const stopWatchingProjectId = watch(
    projectId,
    (newId) => {
      if (newId) {
        loadProjectData(newId);
      } else {
        canvasStore.resetState();
      }
    },
    { immediate: true }
  );

  const stopAutoSave = watch(
    () => canvasStore.$state,
    (newState) => {
      projectStore.updateProjectCanvas(projectId.value, newState);
    },
    { deep: true }
  );

  onBeforeUnmount(() => {
    stopWatchingProjectId();
    stopAutoSave();
    canvasStore.resetState();
  });
}