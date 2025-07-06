import type { ExportableComponent } from '../types';
import { actionRegistry } from '@/features/ScriptActions/model/registry';

export function generateJs(components: ExportableComponent[]): string {
  if (components.length === 0) {
    return '';
  }

  const componentData = components.map(c => ({
    instanceId: c.instanceId,
    scripts: c.scripts || [],
  }));

  const handlerMapString = `{
    ${actionRegistry.map(action => `'${action.type}': ${action.handler}`).join(',\n    ')}
  }`;

  const executionData = JSON.stringify(componentData, null, 2);

  return `
<script type="module">
    document.addEventListener('DOMContentLoaded', () => {
        
        class EventBus {
            constructor() { this.listeners = new Map(); }
            on(event, handler) {
                if (!this.listeners.has(event)) { this.listeners.set(event, new Set()); }
                this.listeners.get(event).add(handler);
                return () => this.off(event, handler);
            }
            off(event, handler) {
                const eventListeners = this.listeners.get(event);
                if (eventListeners) { eventListeners.delete(handler); }
            }
            emit(event, payload) {
                const eventListeners = this.listeners.get(event);
                if (eventListeners) {
                    eventListeners.forEach(h => { try { h(payload); } catch (e) { console.error(e); }});
                }
            }
        }

        const eventBus = new EventBus();
        const handlerMap = ${handlerMapString};
        const allComponentData = ${executionData};

        const executeActions = (actions, rootElement) => {
            actions.forEach(action => {
                const handler = handlerMap[action.type];
                if (handler) {
                    const context = { action, rootElement, eventBus };
                    try {
                        handler(context);
                    } catch(e) {
                        console.error(\`Error executing action "\${action.type}":\`, e);
                    }
                } else {
                    console.warn(\`Unknown action type: \${action.type}\`);
                }
            });
        };

        allComponentData.forEach(data => {
            const rootElement = document.getElementById(\`wb-inst-\${data.instanceId}\`);
            if (!rootElement) {
                console.warn(\`Root element for instance \${data.instanceId} not found\`);
                return;
            }

            if (!data.scripts || data.scripts.length === 0) {
                return;
            }

            data.scripts.forEach(script => {
                if (script.trigger.type === 'onMount') {
                    executeActions(script.actions, rootElement);
                }
                else if (script.trigger.type === 'onClick') {
                    const targetElement = script.trigger.selector 
                        ? rootElement.querySelector(script.trigger.selector) 
                        : rootElement;
                    
                    if (targetElement) {
                        targetElement.addEventListener('click', (event) => {
                            event.preventDefault();
                            executeActions(script.actions, rootElement);
                        });
                    } else {
                        console.warn(\`Trigger selector "\${script.trigger.selector}" not found in instance \${data.instanceId}\`);
                    }
                }
            });
        });
    });
</script>
`;
}