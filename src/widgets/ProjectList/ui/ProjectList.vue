<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProjectStore } from '@/features/ProjectManager/model/projectStore';
import { useModalStore } from '@/widgets/ModalManager/model/modalStore';
import ProjectCard from '@/entities/Project/ui/ProjectCard.vue';
import CreateProjectCard from '@/entities/Project/ui/CreateProjectCard.vue';
import DashboardEmptyState from '@/widgets/DashboardEmptyState/ui/DashboardEmptyState.vue';
import { useI18nManager } from '@/shared/i18n/useI18nManager';

const projectStore = useProjectStore();
const modalStore = useModalStore();
const router = useRouter();
const route = useRoute();
const { t } = useI18nManager();

const PromptModal = defineAsyncComponent(() => import('@/widgets/PromptModal/ui/PromptModal.vue'));

async function handleCreateProject() {
  try {
    const name = await modalStore.open<string>(PromptModal, {
      title: t('dashboard.createProject'),
      label: t('dashboard.prompts.newProjectTitle'),
      initialValue: t('dashboard.prompts.newProjectDefaultName')
    });

    const newProject = projectStore.createProject(name);
    router.push({ name: 'Builder', params: { projectId: newProject.id } });

  } catch (error) {
    // User cancelled
  }
}

function handleDeleteProject(projectIdToDelete: string) {
  projectStore.deleteProject(projectIdToDelete);

  if (route.name === 'Builder' && route.params.projectId === projectIdToDelete) {
    router.push({ name: 'Dashboard' });
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
          @delete="handleDeleteProject"
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