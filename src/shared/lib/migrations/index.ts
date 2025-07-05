export const LATEST_PROJECT_STORE_VERSION = 2;

const migrateV1toV2 = (state: any) => {
  if (!state.projects) {
    state.projects = [];
  }
  state.projects.forEach((p: any) => {
    if (!p.updatedAt) {
      p.updatedAt = p.createdAt;
    }
  });
  return state;
};

const migrations = [
  null,
  migrateV1toV2,
];

export function runMigrations(persistedState: any) {
  let stateVersion = persistedState.version || 1;

  if (stateVersion >= LATEST_PROJECT_STORE_VERSION) {
    return persistedState;
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