import type { FullRenderedComponent } from '@/features/Canvas/model/canvasStore';

export function generateRuntimeScripts(components: FullRenderedComponent[]): string {
  const scriptsToRun = components.flatMap(c =>
    (c.scripts || []).map(s => ({
      instanceId: c.instanceId,
      props: c.props,
      script: s,
    }))
  );

  if (scriptsToRun.length === 0) {
    return '';
  }

  const executionData = JSON.stringify(scriptsToRun, null, 2);

  return `
<script type="module">
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
                    console.warn(\`Target element "\${data.script.targetSelector}" not found in component #\${data.instanceId}.\`);
                    return;
                }

                targetElement.addEventListener(data.script.eventName, (event) => {
                    const api = {
                        getProp(propName) {
                            return data.props[propName];
                        },
                        toggleClass(selector, className) {
                            const element = rootElement.querySelector(selector);
                            if (element) {
                                element.classList.toggle(className);
                            }
                        },
                        event: event
                    };

                    try {
                        new Function('api', data.script.code)(api);
                    } catch (e) {
                        console.error(\`Error executing script for component #\${data.instanceId}: \${e.message}\`);
                    }
                });
            } catch (e) {
                console.error(\`Error setting up script "\${data.script.id}" for component #\${data.instanceId}: \`, e);
            }
        });
    });
</script>
`;
}