import type { CanvasState } from '@/entities/Canvas/model/types';
import type { Project } from '@/entities/Project/model/types';

export const LATEST_PROJECT_STORE_VERSION = 2;

interface ProjectV1 {
  id: string;
  name: string;
  createdAt: number;
  canvasState: CanvasState;
  thumbnail: string | null;
}

interface ProjectStoreStateV1 {
  version?: number;
  projects: ProjectV1[];
}

interface MigratedProjectStoreState {
  version: number;
  projects: Project[];
}

function isMigratedProjectStoreState(state: unknown): state is MigratedProjectStoreState {
  return (
      typeof state === 'object' &&
      state !== null &&
      'version' in state &&
      typeof (state as { version: unknown }).version === 'number' &&
      'projects' in state &&
      Array.isArray((state as { projects: unknown }).projects)
  );
}

const migrateV1toV2 = (stateV1: ProjectStoreStateV1): MigratedProjectStoreState => {
  const migratedProjects = (stateV1.projects || []).map((p) => ({
    ...p,
    updatedAt: p.createdAt,
  }));

  return {
    version: 2,
    projects: migratedProjects,
  };
};

export function runMigrations(persistedState: Record<string, unknown>): MigratedProjectStoreState {
  const stateVersion = typeof persistedState.version === 'number' ? persistedState.version : 1;

  if (stateVersion >= LATEST_PROJECT_STORE_VERSION) {
    if (isMigratedProjectStoreState(persistedState)) {
      return persistedState;
    }
  }

  let stateToMigrate: unknown = persistedState;

  switch (stateVersion) {
    case 1:
      stateToMigrate = migrateV1toV2(stateToMigrate as ProjectStoreStateV1);
      break;
    default:
      if (isMigratedProjectStoreState(stateToMigrate)) {
        return stateToMigrate;
      }
  }

  if (isMigratedProjectStoreState(stateToMigrate)) {
    return stateToMigrate;
  }

  console.error('Migration failed: could not produce a valid state. Resetting to default.');
  return { version: LATEST_PROJECT_STORE_VERSION, projects: [] };
}