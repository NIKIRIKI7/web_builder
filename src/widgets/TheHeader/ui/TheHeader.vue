<script setup lang="ts">
import { computed } from 'vue';
import { useCanvasManager } from '@/features/Canvas/model/useCanvasManager';
import { exportPageAsHtml } from '@/features/ExportManager/model';
import { useThemeManager } from '@/shared/theme/useThemeManager';
import { themeOptions } from '@/shared/theme/defaults';
import type { Theme } from '@/shared/theme/types';
import DropdownMenu from '@/shared/ui/DropdownMenu/DropdownMenu.vue';

const canvasManager = useCanvasManager();
const { theme, setTheme } = useThemeManager();

const currentTheme = computed<Theme>({
  get() {
    return theme.value;
  },
  set(newTheme) {
    setTheme(newTheme);
  }
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
    <div class="the-header__logo">Web Builder</div>
    <div class="the-header__actions">
      <DropdownMenu
        v-model="currentTheme"
        :options="themeOptions"
        placeholder="Select Theme"
      />
      <button class="the-header__export-btn" @click="handleExport">
        Export to HTML
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