// C:\Users\mcniki\Documents\stormprojects\Vue\web_builder\src\features\ExportManager\model\htmlExporter.ts
import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import type { FullRenderedComponent } from '@/features/Canvas/model/canvasStore';
import { generateCssFromComponents } from '@/shared/lib/export/generateCssFromComponents';
import { getComponentConfig } from '@/entities/UiComponent/model/registry';
import { generateRuntimeScripts } from '@/shared/lib/sandbox/scriptExecutor';

async function aggregateStaticCss(components: FullRenderedComponent[]): Promise<string> {
    if (!components.length) return '';

    const uniqueIds = [...new Set(components.map(c => c.componentInfo.id))];
    const configs = await Promise.all(uniqueIds.map(id => getComponentConfig(id)));

    const allStaticCss = configs
        .filter(config => config.staticCss)
        .map(config => `/* --- Styles for ${config.name} --- */\n${config.staticCss}`);

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
    <!-- Canvas is empty -->
</body>
</html>`;
    }

    const { allCss: dynamicCss, classMap } = generateCssFromComponents(components);

    const renderedComponentsHtml = await Promise.all(
        components.map(async (component) => {
            const app = createSSRApp(component.componentInfo.component, component.props);
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
        /* --- Global Styles --- */
        ${globalWrapperCss}

        /* --- Static Component Styles (Auto-aggregated) --- */
        ${allStaticComponentCss}

        /* --- Dynamically Generated Styles --- */
        ${dynamicCss}
    </style>
</head>
<body>
    ${renderedComponentsHtml.join('\n')}
    ${allScripts}
</body>
</html>`;
}