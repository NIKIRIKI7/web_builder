<script setup lang="ts">
import { computed } from 'vue';
import ProjectList from '@/widgets/ProjectList/ui/ProjectList.vue';
import DropdownMenu from '@/shared/ui/DropdownMenu/DropdownMenu.vue';
import { useThemeManager } from '@/shared/theme/useThemeManager';
import { themeOptions } from '@/shared/theme/defaults';
import type { Theme } from '@/shared/theme/types';
import { useI18nManager } from '@/shared/i18n/useI18nManager';

const { t, currentLocale, localeOptions } = useI18nManager();
const { theme, setTheme } = useThemeManager();

const activeTheme = computed<Theme>({
  get: () => theme.value,
  set: (newTheme) => setTheme(newTheme),
});
</script>

<template>
  <div class="dashboard-page">
    <header class="dashboard-page__header">
      <h1 class="dashboard-page__title">{{ t('dashboard.title') }}</h1>
      <div class="dashboard-page__controls">
        <DropdownMenu
          v-model="currentLocale"
          :options="localeOptions"
          :placeholder="t('header.languageSelector')"
        />
        <DropdownMenu
          v-model="activeTheme"
          :options="themeOptions"
          :placeholder="t('header.themeSelector')"
        />
      </div>
    </header>
    <main class="dashboard-page__content">
      <ProjectList />
    </main>
  </div>
</template>

<style scoped lang="scss">
.dashboard-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--color-bg-primary);
}

.dashboard-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  padding: 20px 32px;
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
}

.dashboard-page__title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.dashboard-page__controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.dashboard-page__content {
  flex-grow: 1;
  overflow-y: auto;
}
</style>