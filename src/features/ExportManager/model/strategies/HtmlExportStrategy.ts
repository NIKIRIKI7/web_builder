import type { ExportStrategy, ExportableComponent } from '../types';
import { generateAllCss } from '../services/CssGenerator';
import { generateJs } from '../services/JsGenerator';
import { renderComponentsToHtml } from '../services/ComponentRenderer';
import { buildHtml } from '../services/HtmlBuilder';
import { downloadFile } from '@/shared/lib/utils';

export class HtmlExportStrategy implements ExportStrategy {
  async export(components: ExportableComponent[]): Promise<void> {
    if (!components.length) {
      const emptyHtml = buildHtml({ title: 'My Exported Page', css: '', js: '', bodyHtml: '<!-- Empty page -->' });
      downloadFile('my-page.html', emptyHtml);
      return;
    }

    const { allCss, classMap } = await generateAllCss(components);
    const bodyHtml = await renderComponentsToHtml(components, classMap);
    const js = generateJs(components);
    const fullHtml = buildHtml({
      title: 'My Exported Page',
      css: allCss,
      bodyHtml,
      js,
    });

    downloadFile('my-page.html', fullHtml);
  }
}