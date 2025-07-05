import type { FullRenderedComponent } from '@/features/Canvas/model/canvasStore';
import { stylesObjectToString } from '@/shared/lib/utils';

/**
 * Генерирует CSS-строку и маппинг классов для всех компонентов.
 * @param components - Массив компонентов для рендеринга.
 * @returns {{ allCss: string, classMap: Map<number, string> }}
 */
export function generateCssFromComponents(components: FullRenderedComponent[]): { allCss: string, classMap: Map<number, string> } {
    const classMap = new Map<number, string>();
    const cssRules: string[] = [];

    for (const component of components) {
        if (Object.keys(component.styles).length === 0) {
            continue;
        }

        const className = `wb-c-${component.instanceId}`;
        const cssRule = `.${className} { ${stylesObjectToString(component.styles)} }`;

        classMap.set(component.instanceId, className);
        cssRules.push(cssRule);
    }

    return {
        allCss: cssRules.join('\n'),
        classMap,
    };
}