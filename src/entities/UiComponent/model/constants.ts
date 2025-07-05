export const EDITOR_TARGET = {
  PROPS: 'props',
  STYLES: 'styles',
  SCRIPT: 'script',
} as const;

export type EditorTarget = typeof EDITOR_TARGET[keyof typeof EDITOR_TARGET];