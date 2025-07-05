import { defaultTheme } from './default-theme';
import { darkTheme } from './dark-theme';

export const allThemes = {
  default: defaultTheme,
  dark: darkTheme,
};

export const themeOptions = [
  { label: 'Light Theme', value: defaultTheme },
  { label: 'Dark Theme', value: darkTheme },
];