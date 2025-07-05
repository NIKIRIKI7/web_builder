<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useProjectStore } from '@/features/ProjectManager/model/projectStore';
import ProjectCard from '@/entities/Project/ui/ProjectCard.vue';
import CreateProjectCard from '@/entities/Project/ui/CreateProjectCard.vue';
import { useI18nManager } from '@/shared/i18n/useI18nManager';

const projectStore = useProjectStore();
const router = useRouter();
const { t } = useI18nManager();

function handleCreateProject() {
  const name = prompt(t('dashboard.prompts.newProjectTitle'), t('dashboard.prompts.newProjectDefaultName'));
  if (name && name.trim()) {
    const newProject = projectStore.createProject(name.trim());
    router.push({ name: 'Builder', params: { projectId: newProject.id } });
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