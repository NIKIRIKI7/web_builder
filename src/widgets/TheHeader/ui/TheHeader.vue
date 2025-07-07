<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCanvasState } from '@/features/Canvas/model/useCanvasState';
import type { FullRenderedComponent } from '@/entities/Canvas/model/types';
import { exportPage } from '@/features/ExportManager/model';
import { HtmlExportStrategy } from '@/features/ExportManager/model/strategies/HtmlExportStrategy';
import type { ExportableComponent } from '@/features/ExportManager/model/types';
import { useThemeManager } from '@/shared/theme/useThemeManager';
import { themeOptions } from '@/shared/theme/defaults';
import type { Theme } from '@/shared/theme/types';
import { useI18nManager } from '@/shared/i18n/useI18nManager';
import { useLayoutStore } from '@/shared/layout/layoutStore';
import { usePreviewStore } from '@/shared/preview/previewStore';
import DropdownMenu from '@/shared/ui/DropdownMenu/DropdownMenu.vue';
import {
  DesktopIcon,
  TabletIcon,
  MobileIcon,
  ArrowLeftIcon,
} from '@/shared/ui/icons';

const canvasState = useCanvasState();
const { theme, setTheme } = useThemeManager();
const { t, currentLocale, localeOptions } = useI18nManager();
const layoutStore = useLayoutStore();
const previewStore = usePreviewStore();
const route = useRoute();

const isBuilderPage = computed(() => route.name === 'Builder');

const activeTheme = computed<Theme>({
  get: () => theme.value,
  set: (newTheme) => setTheme(newTheme),
});

const deviceIconMap = {
  desktop: DesktopIcon,
  tablet: TabletIcon,
  mobile: MobileIcon,
};

function mapToExportableComponents(
  components: FullRenderedComponent[],
): ExportableComponent[] {
  const flatList: ExportableComponent[] = [];

  function traverse(nodes: FullRenderedComponent[]) {
    for (const node of nodes) {
      const exportableNode: ExportableComponent = {
        instanceId: node.instanceId,
        props: node.props,
        styles: node.styles,
        scripts: node.scripts,
        componentDefinition: {
          id: node.componentDefinition.id,
          name: node.componentDefinition.name,
          component: node.componentDefinition.component,
          staticCss: node.componentDefinition.staticCss,
          runtimeScript: node.componentDefinition.runtimeScript,
        },
      };
      flatList.push(exportableNode);

      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    }
  }

  traverse(components);
  return flatList;
}

async function handleExport() {
  const componentsToExport = mapToExportableComponents(
    canvasState.renderedComponents.value,
  );
  const htmlStrategy = new HtmlExportStrategy();
  await exportPage(componentsToExport, htmlStrategy);
}
</script>

<template>
  <header class="the-header">
    <div class="the-header__left">
      <RouterLink
        v-if="isBuilderPage"
        :to="{ name: 'Dashboard' }"
        class="the-header__back-btn"
        :title="t('header.backToProjects')"
      >
        <ArrowLeftIcon />
      </RouterLink>
      <div class="the-header__logo">{{ t("header.title") }}</div>
    </div>

    <div class="the-header__center">
      <template v-if="isBuilderPage">
        <button
          v-for="device in previewStore.deviceOptions"
          :key="device.id"
          class="the-header__preview-btn"
          :class="{
            'the-header__preview-btn--active':
              previewStore.activeDevice === device.id,
          }"
          @click="previewStore.setDevice(device.id)"
        >
          <component :is="deviceIconMap[device.id]" />
        </button>
      </template>
    </div>

    <div class="the-header__right">
      <template v-if="isBuilderPage">
        <button
          v-if="layoutStore.isEditMode"
          class="the-header__action-btn the-header__action-btn--danger"
          @click="layoutStore.resetLayout()"
        >
          {{ t("header.resetLayout") }}
        </button>
        <button
          class="the-header__action-btn"
          :class="{ 'the-header__action-btn--active': layoutStore.isEditMode }"
          @click="layoutStore.toggleEditMode()"
        >
          {{ t("header.editLayout") }}
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
        <button
          class="the-header__action-btn the-header__action-btn--primary"
          @click="handleExport"
        >
          {{ t("header.export") }}
        </button>
      </template>
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

  &__left,
  &__right {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1 1 0;
  }

  &__left {
    justify-content: flex-start;
  }

  &__right {
    justify-content: flex-end;
  }

  &__center {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  &__back-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-primary);
    padding: 4px;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--color-bg-primary);
    }

    svg {
      width: 22px;
      height: 22px;
    }
  }

  &__logo {
    font-size: 20px;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  &__preview-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: var(--color-text-primary);
    border: 1px solid transparent;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
    opacity: 0.6;

    &:hover {
      background-color: var(--color-bg-primary);
      opacity: 1;
    }

    &--active {
      opacity: 1;
      color: var(--color-accent);
      background-color: var(--color-bg-primary);
    }
  }

  &__action-btn {
    padding: 8px 16px;
    background-color: transparent;
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
      background-color: var(--color-bg-primary);
    }

    &--active {
      background-color: var(--color-accent);
      color: var(--color-text-secondary);
      border-color: var(--color-accent);
    }

    &--danger {
      color: var(--color-danger);
      border-color: var(--color-border);
      &:hover {
        background-color: var(--color-danger);
        color: var(--color-text-secondary);
        border-color: var(--color-danger);
      }
    }

    &--primary {
      background-color: var(--color-accent);
      color: var(--color-text-secondary);
      border-color: var(--color-accent);
      &:hover {
        background-color: var(--color-accent-hover);
      }
    }
  }
}
</style>