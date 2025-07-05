import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import type { FullRenderedComponent } from '@/features/Canvas/model/canvasStore';

export async function renderComponentsToHtml(
  components: FullRenderedComponent[],
  classMap: Map<number, string>
): Promise<string> {
  const renderedHtmlPromises = components.map(async (component) => {
    const app = createSSRApp(component.componentDefinition.component, component.props);
    const renderedHtml = await renderToString(app);
    const dynamicClassName = classMap.get(component.instanceId) || '';
    const elementId = `wb-inst-${component.instanceId}`;
    return `<div id="${elementId}" class="${dynamicClassName}">${renderedHtml}</div>`;
  });

  const renderedComponentsHtml = await Promise.all(renderedHtmlPromises);
  return renderedComponentsHtml.join('\n');
}