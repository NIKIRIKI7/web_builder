import type { ExportableComponent } from '../types';

export function generateJs(components: ExportableComponent[]): string {
  if (components.length === 0) {
    return '';
  }

  const componentData = components.map(c => ({
    instanceId: c.instanceId,
    clientScript: c.componentDefinition.clientScript || null,
    props: c.props,
    scripts: c.scripts || [],
  }));

  const executionData = JSON.stringify(componentData, null, 2);

  return `
<script type="module">
    document.addEventListener('DOMContentLoaded', () => {
        const allComponentData = ${executionData};

        const createSandboxApi = (data, rootElement) => ({
            getProp(propName) {
                return data.props[propName];
            },
            toggleClass(selector, className) {
                const element = rootElement.querySelector(selector);
                if (element) {
                    element.classList.toggle(className);
                }
            }
        });

        allComponentData.forEach(data => {
            try {
                const rootElement = document.getElementById(\`wb-inst-\${data.instanceId}\`);
                if (!rootElement) {
                  console.error(\`Root element #wb-inst-\${data.instanceId} not found.\`);
                  return;
                }

                if (data.clientScript) {
                    try {
                        new Function('rootElement', data.clientScript)(rootElement);
                    } catch (e) {
                        console.error(\`Error executing client script for component #\${data.instanceId}: \${e.message}\`);
                    }
                }

                if (data.scripts && data.scripts.length > 0) {
                    const api = createSandboxApi(data, rootElement);
                    data.scripts.forEach(script => {
                        const targetElement = script.targetSelector && script.targetSelector.trim() !== ''
                            ? rootElement.querySelector(script.targetSelector)
                            : rootElement;

                        if (!targetElement) {
                           console.warn(\`Target selector "\${script.targetSelector}" not found for component #\${data.instanceId}\`);
                           return;
                        }

                        targetElement.addEventListener(script.eventName, (event) => {
                            try {
                                new Function('api', 'event', script.code)(api, event);
                            } catch (e) {
                                console.error(\`Error executing script for component #\${data.instanceId}: \${e.message}\`);
                            }
                        });
                    });
                }
            } catch (e) {
                console.error(\`Error setting up component #\${data.instanceId}: \`, e);
            }
        });
    });
</script>
`;
}