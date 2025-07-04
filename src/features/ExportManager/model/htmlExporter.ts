import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { getDocumentCss } from '@/shared/lib/export/getCss';
import { stylesObjectToString } from '@/shared/lib/utils';
import type { FullRenderedComponent } from '@/features/Canvas/model/canvasStore';

/**
 * Генерирует полную HTML-строку на основе массива компонентов.
 * @param components - Массив компонентов для рендеринга.
 * @returns Промис, который разрешается в виде готовой HTML-строки.
 */
export async function exportToHtml(components: FullRenderedComponent[]): Promise<string> {
    const renderedComponentsHtml = await Promise.all(
        components.map(async (component) => {
            const app = createSSRApp(component.componentInfo.component, component.props);
            const renderedHtml = await renderToString(app);
            return `
      <div style="${stylesObjectToString(component.styles)}">
        ${renderedHtml}
      </div>`;
        })
    );

    const allCss = getDocumentCss();

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Exported Page</title>
    <style>
        ${allCss}
        body { margin: 0; background-color: #f0f2f5; }
    </style>
</head>
<body>
    ${renderedComponentsHtml.join('\n')}
</body>
</html>`;
}