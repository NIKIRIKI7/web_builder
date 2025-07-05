import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import type { Project } from '@/entities/Project/model/types';
import { klona } from 'klona/lite';

export const useProjectStore = defineStore('projects', () => {
  const projects: Ref<Project[]> = ref([]);

  function findProject(id: string): Project | undefined {
    return projects.value.find(p => p.id === id);
  }

  function createProject(name: string) {
    const newProject: Project = {
      id: `project_${Date.now()}`,
      name: name,
      createdAt: Date.now(),
      canvasState: {
        componentInstances: [],
        selectedComponentInstanceId: null,
      },
    };
    projects.value.unshift(newProject);
    return newProject;
  }

  function updateProjectCanvas(projectId: string, canvasState: Project['canvasState']) {
    const project = findProject(projectId);
    if (project) {
      project.canvasState = klona(canvasState);
    }
  }

  function deleteProject(id: string) {
    projects.value = projects.value.filter(p => p.id !== id);
  }

  return {
    projects,
    findProject,
    createProject,
    updateProjectCanvas,
    deleteProject
  };
}, {
  persist: true,
});