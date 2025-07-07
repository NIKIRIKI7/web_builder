import { darkTheme } from './dark-theme';
import { defaultTheme } from './default-theme';

export const allThemes = {
  default: defaultTheme,
  dark: darkTheme,
};

export const themeOptions = [
  { label: 'Light Theme', value: defaultTheme },
  { label: 'Dark Theme', value: darkTheme },
];