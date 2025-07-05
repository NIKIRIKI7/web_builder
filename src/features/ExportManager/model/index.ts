import type { ExportableComponent } from './types';
import { generateAllCss } from './services/CssGenerator';
import { generateJs } from './services/JsGenerator';
import { renderComponentsToHtml } from './services/ComponentRenderer';
import { buildHtml } from './services/HtmlBuilder';

export async function exportPageAsHtml(components: ExportableComponent[]): Promise<string> {
  if (!components.length) {
    return buildHtml({ title: 'My Exported Page', css: '', js: '', bodyHtml: '<!-- Empty page -->'});
  }

  const { allCss, classMap } = await generateAllCss(components);
  const bodyHtml = await renderComponentsToHtml(components, classMap);
  const js = generateJs(components);

  return buildHtml({
    title: 'My Exported Page',
    css: allCss,
    bodyHtml: bodyHtml,
    js: js,
  });
}