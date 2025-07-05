import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import type { FullRenderedComponent } from '@/features/Canvas/model/canvasStore';
import { generateCssFromComponents } from '@/shared/lib/export/generateCssFromComponents';
import { getComponentDefinition } from '@/entities/UiComponent/model/registry';
import { generateRuntimeScripts } from '@/shared/lib/sandbox/scriptExecutor';

async function aggregateStaticCss(components: FullRenderedComponent[]): Promise<string> {
  if (!components.length) return '';

  const uniqueIds = [...new Set(components.map(c => c.componentDefinition.id))];
  const definitions = await Promise.all(uniqueIds.map(id => getComponentDefinition(id)));

  const allStaticCss = definitions
    .filter(definition => definition.staticCss)
    .map(definition => `/* --- Styles for ${definition.name} --- */\n${definition.staticCss}`);

  return allStaticCss.join('\n\n');
}

export async function exportToHtml(components: FullRenderedComponent[]): Promise<string> {
  if (!components.length) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Exported Page</title>
</head>
<body>
</body>
</html>`;
  }

  const { allCss: dynamicCss, classMap } = generateCssFromComponents(components);

  const renderedComponentsHtml = await Promise.all(
    components.map(async (component) => {
      const app = createSSRApp(component.componentDefinition.component, component.props);
      const renderedHtml = await renderToString(app);
      const dynamicClassName = classMap.get(component.instanceId) || '';
      const elementId = `wb-inst-${component.instanceId}`;
      return `<div id="${elementId}" class="${dynamicClassName}">${renderedHtml}</div>`;
    })
  );

  const allStaticComponentCss = await aggregateStaticCss(components);
  const allScripts = generateRuntimeScripts(components);

  const globalWrapperCss = `body { margin: 0; background-color: #f0f2f5; }`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Exported Page</title>
    <style>
        ${globalWrapperCss}
        ${allStaticComponentCss}
        ${dynamicCss}
    </style>
</head>
<body>
    ${renderedComponentsHtml.join('\n')}
    ${allScripts}
</body>
</html>`;
}