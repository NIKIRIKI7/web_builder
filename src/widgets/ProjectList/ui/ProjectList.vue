<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import type { Project } from '@/entities/Project/model/types';
import CreateProjectCard from '@/entities/Project/ui/CreateProjectCard.vue';
import ProjectCard from '@/entities/Project/ui/ProjectCard.vue';
import { useProjectStore } from '@/features/ProjectManager/model/projectStore';
import { useI18nManager } from '@/shared/i18n/useI18nManager';
import DashboardEmptyState from '@/widgets/DashboardEmptyState/ui/DashboardEmptyState.vue';
import { useModalStore } from '@/widgets/ModalManager/model/modalStore';

const projectStore = useProjectStore();
const modalStore = useModalStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18nManager();

const CreateProjectModal = defineAsyncComponent(() => import('@/widgets/CreateProjectModal/ui/CreateProjectModal.vue'));
const ConfirmModal = defineAsyncComponent(() => import('@/widgets/ConfirmModal/ui/ConfirmModal.vue'));

type CreatePayload = { name: string; canvasState?: Project['canvasState'] };

async function handleCreateProject() {
  try {
    const { name, canvasState } = await modalStore.open<CreatePayload>(CreateProjectModal);
    const newProject = projectStore.createProject(name, canvasState);
    await router.push({name: 'Builder', params: {projectId: newProject.id}});
  } catch (error) {
    if (error !== 'cancelled' && error !== 'Modal closed by user') {
      console.error('An unexpected error occurred during project creation:', error);
    }
  }
}

async function handleDeleteRequest(project: Project) {
  const message = t('dashboard.card.deleteConfirmation', { name: `<strong>${project.name}</strong>` });
  try {
    await modalStore.open(ConfirmModal, {
      title: t('dashboard.card.delete'),
      message: message,
    });

    projectStore.deleteProject(project.id);

    if (route.name === 'Builder' && route.params.projectId === project.id) {
      await router.push({name: 'Dashboard'});
    }
  } catch (error) {
    if (error !== 'cancelled' && error !== 'Modal closed by user') {
      console.error('An unexpected error occurred during project deletion:', error);
    }
  }
}
</script>

<template>
  <div class="project-list">
    <template v-if="projectStore.projects.length > 0">
      <div class="project-list__grid">
        <CreateProjectCard @create="handleCreateProject" />
        <ProjectCard
            v-for="project in projectStore.projects"
            :key="project.id"
            :project="project"
            @delete-request="handleDeleteRequest"
        />
      </div>
    </template>
    <DashboardEmptyState v-else @create="handleCreateProject" />
  </div>
</template>

<style scoped lang="scss">
.project-list {
  padding: 32px;
}

.project-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
</style>