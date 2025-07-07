import { klona } from 'klona/lite';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

import type { CanvasState } from '@/entities/Canvas/model/types';
import type { Project } from '@/entities/Project/model/types';
import { LATEST_PROJECT_STORE_VERSION, runMigrations } from '@/shared/lib/migrations';

export const useProjectStore = defineStore(
    'projects',
    () => {
      const version = ref(LATEST_PROJECT_STORE_VERSION);
      const projects: Ref<Project[]> = ref([]);

      function findProject(id: string): Project | undefined {
        return projects.value.find((p) => p.id === id);
      }

      function createProject(name: string, initialState?: CanvasState): Project {
        const now = Date.now();
        const newProject: Project = {
          id: `project_${now}`,
          name: name,
          createdAt: now,
          updatedAt: now,
          thumbnail: null,
          canvasState: initialState || {
            componentInstances: [],
            selectedComponentInstanceId: null,
            isEditorOpen: false
          }
        };
        projects.value.unshift(newProject);
        return newProject;
      }

      function updateProjectCanvas(projectId: string, canvasState: CanvasState): void {
        const project = findProject(projectId);
        if (project) {
          project.canvasState = klona(canvasState);
          project.updatedAt = Date.now();
        }
      }

      function updateProjectThumbnail(projectId: string, thumbnail: string | null): void {
        const project = findProject(projectId);
        if (project) {
          project.thumbnail = thumbnail;
        }
      }

      function deleteProject(id: string): void {
        projects.value = projects.value.filter((p) => p.id !== id);
      }

      return {
        version,
        projects,
        findProject,
        createProject,
        updateProjectCanvas,
        updateProjectThumbnail,
        deleteProject
      };
    },
    {
      persist: {
        serializer: {
          serialize: JSON.stringify,
          deserialize: (value: string) => {
            try {
              const parsed = JSON.parse(value) as Record<string, unknown>;
              return runMigrations(parsed);
            } catch (error) {
              console.error('Failed to parse or migrate persisted state', error);
              return { version: LATEST_PROJECT_STORE_VERSION, projects: [] };
            }
          }
        }
      }
    }
);