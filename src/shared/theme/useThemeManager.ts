import { readonly, ref, watchEffect } from 'vue';

import { defaultTheme } from './defaults/default-theme';

import type { Theme } from './types';
import type { Ref } from 'vue';

const activeTheme = ref<Theme>(defaultTheme);

function applyTheme(theme: Theme): void {
  const root = document.documentElement;

  for (const [key, value] of Object.entries(theme.colors)) {
    const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    if (typeof value === 'string') {
      root.style.setProperty(cssVarName, value);
    }
  }

  for (const [key, value] of Object.entries(theme.layout)) {
    const cssVarName = `--layout-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    if (typeof value === 'string') {
      root.style.setProperty(cssVarName, value);
    }
  }
}

watchEffect(() => {
  if (activeTheme.value) {
    applyTheme(activeTheme.value);
  }
});

interface UseThemeManagerReturn {
  theme: Readonly<Ref<Theme>>;
  setTheme: (theme: Theme) => void;
}

export function useThemeManager(): UseThemeManagerReturn {
  function setTheme(theme: Theme): void {
    activeTheme.value = theme;
  }

  return {
    theme: readonly(activeTheme),
    setTheme,
  };
}