<script setup lang="ts">
import { computed } from 'vue';
import { useCanvasManager } from '@/features/Canvas/model/useCanvasManager';
import { exportPageAsHtml } from '@/features/ExportManager/model';
import { useThemeManager } from '@/shared/theme/useThemeManager';
import { themeOptions } from '@/shared/theme/defaults';
import type { Theme } from '@/shared/theme/types';
import { useI18nManager } from '@/shared/i18n/useI18nManager';
import { useLayoutStore } from '@/shared/layout/layoutStore';
import DropdownMenu from '@/shared/ui/DropdownMenu/DropdownMenu.vue';

const canvasManager = useCanvasManager();
const { theme, setTheme } = useThemeManager();
const { t, currentLocale, localeOptions } = useI18nManager();
const layoutStore = useLayoutStore();

const activeTheme = computed<Theme>({
  get: () => theme.value,
  set: (newTheme) => setTheme(newTheme),
});

function downloadFile(filename: string, content: string) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

async function handleExport() {
  const componentsToExport = canvasManager.renderedComponents.value;
  const htmlContent = await exportPageAsHtml(componentsToExport);
  downloadFile('my-page.html', htmlContent);
}
</script>

<template>
  <header class="the-header">
    <div class="the-header__logo">{{ t('header.title') }}</div>
    <div class="the-header__actions">
      <button
        v-if="layoutStore.isEditMode"
        class="the-header__layout-reset"
        @click="layoutStore.resetLayout()"
      >
        {{ t('header.resetLayout') }}
      </button>
      <button
        class="the-header__layout-toggle"
        :class="{'the-header__layout-toggle--active': layoutStore.isEditMode}"
        @click="layoutStore.toggleEditMode()"
      >
        {{ t('header.editLayout') }}
      </button>
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
      <button class="the-header__export-btn" @click="handleExport">
        {{ t('header.export') }}
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.the-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  height: var(--layout-header-height);
  padding: 0 24px;
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  z-index: $z-index-header;

  &__logo {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__layout-reset {
    padding: 8px 16px;
    background-color: transparent;
    color: var(--color-danger);
    border: 1px solid var(--color-danger);
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
      background-color: var(--color-danger);
      color: var(--color-text-secondary);
    }
  }

  &__layout-toggle {
    padding: 8px 16px;
    background-color: transparent;
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
      background-color: var(--color-bg-primary);
    }

    &--active {
      background-color: var(--color-accent);
      color: var(--color-text-secondary);
      border-color: var(--color-accent);
    }
  }

  &__export-btn {
    padding: 8px 16px;
    background-color: var(--color-accent);
    color: var(--color-text-secondary);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--color-accent-hover);
    }
  }
}
</style>