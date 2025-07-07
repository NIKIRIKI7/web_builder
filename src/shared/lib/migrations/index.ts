import type { Project } from '@/entities/Project/model/types';
import type { CanvasState } from '@/entities/Canvas/model/types';

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

const migrateV1toV2 = (state: ProjectStoreStateV1): MigratedProjectStoreState => {
  if (!state.projects) {
    state.projects = [];
  }
  const migratedProjects = state.projects.map((p) => ({
    ...p,
    updatedAt: p.createdAt,
  }));

  return {
    ...state,
    projects: migratedProjects,
    version: 2,
  };
};

const migrations = [
  null,
  migrateV1toV2,
];

export function runMigrations(persistedState: Record<string, unknown>): MigratedProjectStoreState {
  const stateVersion = (persistedState.version as number) || 1;

  if (stateVersion >= LATEST_PROJECT_STORE_VERSION) {
    return persistedState as unknown as MigratedProjectStoreState;
  }

  let migratedState = JSON.parse(JSON.stringify(persistedState));

  for (let i = stateVersion; i < LATEST_PROJECT_STORE_VERSION; i++) {
    const migrationFunc = migrations[i];
    if (migrationFunc) {
      migratedState = migrationFunc(migratedState);
    }
  }

  migratedState.version = LATEST_PROJECT_STORE_VERSION;
  return migratedState;
}