import { ref, watchEffect, readonly } from 'vue';
import type { Theme } from './types';
import { defaultTheme } from './defaults/default-theme';

const activeTheme = ref<Theme>(defaultTheme);

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  for (const [key, value] of Object.entries(theme.colors)) {
    const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVarName, value);
  }

  for (const [key, value] of Object.entries(theme.layout)) {
    const cssVarName = `--layout-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    root.style.setProperty(cssVarName, value);
  }
}

watchEffect(() => {
  if (activeTheme.value) {
    applyTheme(activeTheme.value);
  }
});

export function useThemeManager() {
  function setTheme(theme: Theme) {
    activeTheme.value = theme;
  }

  return {
    theme: readonly(activeTheme),
    setTheme,
  };
}