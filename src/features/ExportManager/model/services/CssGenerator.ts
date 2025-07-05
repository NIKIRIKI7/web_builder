import type { ExportableComponent } from '../types';
import { getComponentDefinition } from '@/entities/UiComponent/model/registry';
import { stylesObjectToString } from '@/shared/lib/utils';

function generateDynamicCss(components: ExportableComponent[]): { css: string, classMap: Map<number, string> } {
  const classMap = new Map<number, string>();
  const cssRules: string[] = [];

  for (const component of components) {
    if (Object.keys(component.styles).length === 0) continue;
    const className = `wb-c-${component.instanceId}`;
    const cssRule = `.${className} { ${stylesObjectToString(component.styles)} }`;
    classMap.set(component.instanceId, className);
    cssRules.push(cssRule);
  }

  return {
    css: cssRules.join('\n'),
    classMap,
  };
}

async function aggregateStaticCss(components: ExportableComponent[]): Promise<string> {
  if (!components.length) return '';
  const uniqueIds = [...new Set(components.map(c => c.componentDefinition.id))];
  const definitions = await Promise.all(uniqueIds.map(id => getComponentDefinition(id)));
  return definitions
    .filter(def => def.staticCss)
    .map(def => `/* --- Styles for ${def.name} --- */\n${def.staticCss}`)
    .join('\n\n');
}

export async function generateAllCss(components: ExportableComponent[]): Promise<{ allCss: string, classMap: Map<number, string> }> {
  const { css: dynamicCss, classMap } = generateDynamicCss(components);
  const staticCss = await aggregateStaticCss(components);
  const globalWrapperCss = `body { margin: 0; background-color: #f0f2f5; }`;
  const allCss = [globalWrapperCss, staticCss, dynamicCss].join('\n');
  return { allCss, classMap };
}