import type { UiComponentDefinition, UiComponentPreview, EditorConfiguration } from './types';
import { allPreviews, configLoaders } from '..';

export const libraryPreviews: UiComponentPreview[] = allPreviews;

const definitionCache = new Map<string, UiComponentDefinition>();
const editorConfigCache = new Map<string, EditorConfiguration>();

async function loadModule(id: string) {
  const loader = configLoaders[id as keyof typeof configLoaders];
  if (!loader) {
    throw new Error(`Component config loader for id "${id}" not found.`);
  }
  return await loader();
}

export async function getComponentDefinition(id: string): Promise<UiComponentDefinition> {
  if (definitionCache.has(id)) {
    return definitionCache.get(id)!;
  }
  const module = await loadModule(id);
  const configKey = Object.keys(module).find(key => key.endsWith('Definition'));
  if (!configKey) {
    throw new Error(`Could not find a '*Definition' export in module for component id "${id}".`);
  }
  const definition = module[configKey as keyof typeof module] as UiComponentDefinition;
  definitionCache.set(id, definition);
  return definition;
}

export async function getEditorConfig(id: string): Promise<EditorConfiguration> {
  if (editorConfigCache.has(id)) {
    return editorConfigCache.get(id)!;
  }
  const module = await loadModule(id);
  const configKey = Object.keys(module).find(key => key.endsWith('EditorConfig'));
  if (!configKey) {
    throw new Error(`Could not find a '*EditorConfig' export in module for component id "${id}".`);
  }
  const editorConfig = module[configKey as keyof typeof module] as EditorConfiguration;
  editorConfigCache.set(id, editorConfig);
  return editorConfig;
}

export function getCachedComponentDefinition(id: string): UiComponentDefinition | undefined {
  return definitionCache.get(id);
}