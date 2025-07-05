<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectStore } from '@/features/ProjectManager/model/projectStore';
import { useModalStore } from '@/widgets/ModalManager/model/modalStore';
import ProjectCard from '@/entities/Project/ui/ProjectCard.vue';
import CreateProjectCard from '@/entities/Project/ui/CreateProjectCard.vue';
import { useI18nManager } from '@/shared/i18n/useI18nManager';

const projectStore = useProjectStore();
const modalStore = useModalStore();
const router = useRouter();
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
</script>

<template>
  <div class="project-list">
    <div class="project-list__grid">
      <CreateProjectCard @create="handleCreateProject" />
      <ProjectCard
        v-for="project in projectStore.projects"
        :key="project.id"
        :project="project"
      />
    </div>
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