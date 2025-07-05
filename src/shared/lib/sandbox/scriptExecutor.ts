import type { FullRenderedComponent } from '@/features/Canvas/model/canvasStore';

/**
 * Генерирует итоговый JS-код для вставки в HTML.
 * Включает в себя движок песочницы и привязку всех пользовательских скриптов.
 * @param components - Массив отрендеренных компонентов.
 * @returns {string} - HTML-тег <script> с полным кодом.
 */
export function generateRuntimeScripts(components: FullRenderedComponent[]): string {
    const scriptsToRun = components.flatMap(c =>
        (c.scripts || []).map(s => ({
            instanceId: c.instanceId,
            props: c.props,
            script: s,
        }))
    );

    if (scriptsToRun.length === 0) return '';

    const executionData = JSON.stringify(scriptsToRun, null, 2);

    return `
<script type="module">
const createSandboxApi = (rootElement, props) => ({
    querySelector: (selector) => rootElement.querySelector(selector),
    querySelectorAll: (selector) => rootElement.querySelectorAll(selector),
    addClass: (element, className) => element.classList.add(className),
    removeClass: (element, className) => element.classList.remove(className),
    toggleClass: (element, className) => element.classList.toggle(className),
    getProp: (propName) => props[propName],
});

document.addEventListener('DOMContentLoaded', () => {
    const allScripts = ${executionData};

    allScripts.forEach(data => {
        try {
            const rootElement = document.getElementById(\`wb-inst-\${data.instanceId}\`);
            if (!rootElement) {
                console.warn(\`Root element for component #\${data.instanceId} not found.\`);
                return;
            }

            const targetElement = data.script.targetSelector && data.script.targetSelector.trim() !== ''
                ? rootElement.querySelector(data.script.targetSelector) 
                : rootElement;
            
            if (!targetElement) {
                console.warn(\`Script target "\${data.script.targetSelector}" not found in component #\${data.instanceId}\`);
                return;
            }

            const sandboxApi = createSandboxApi(rootElement, data.props);
            
            // Создаем функцию в безопасном окружении, передавая ей аргументы
            // 'element' и 'api'. Глобальные переменные (window, document) будут недоступны.
            const sandboxedFunction = new Function('element', 'api', data.script.code);

            targetElement.addEventListener(data.script.eventName, (event) => {
                // Вызываем код, передавая элемент и наш безопасный API
                sandboxedFunction(targetElement, sandboxApi);
            });

        } catch (e) {
            console.error(\`Error setting up script "\${data.script.id}" for component #\${data.instanceId}: \`, e);
        }
    });
});
</script>
`;
}