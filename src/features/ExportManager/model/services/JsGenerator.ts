import type { ExportableComponent } from '../types';
import { actionRegistry } from '@/features/ScriptActions/model/registry';

export function generateJs(components: ExportableComponent[]): string {
  if (components.length === 0) {
    return '';
  }

  const componentData = components.map(c => ({
    instanceId: c.instanceId,
    componentId: c.componentDefinition.id,
    scripts: c.scripts || [],
    props: c.props,
  }));

  const runtimeScriptMap: Record<string, string> = {};
  components.forEach(c => {
    if (c.componentDefinition.runtimeScript && !runtimeScriptMap[c.componentDefinition.id]) {
      runtimeScriptMap[c.componentDefinition.id] = c.componentDefinition.runtimeScript;
    }
  });

  const handlerMapString = `{
    ${actionRegistry.map(action => `'${action.type}': ${action.handler}`).join(',\n    ')}
  }`;

  const executionData = JSON.stringify(componentData, null, 2);
  const runtimeScriptsString = JSON.stringify(runtimeScriptMap);

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
        const customScriptHandlers = ${handlerMapString};
        const allComponentData = ${executionData};
        const runtimeScriptsRaw = ${runtimeScriptsString};
        const runtimeInitializers = {};

        for (const key in runtimeScriptsRaw) {
          try {
            const scriptBody = runtimeScriptsRaw[key].replace(/^export default\\s*/, '');
            runtimeInitializers[key] = new Function('return ' + scriptBody)();
          } catch (e) {
            console.error('Failed to parse runtime script for ' + key, e);
          }
        }
        
        const executeCustomActions = (actions, rootElement) => {
            actions.forEach(action => {
                const handler = customScriptHandlers[action.type];
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

            // Initialize built-in component logic
            const initializer = runtimeInitializers[data.componentId];
            if (typeof initializer === 'function') {
                try {
                    initializer(rootElement, data.props);
                } catch(e) {
                    console.error(\`Error initializing component "\${data.componentId}":\`, e);
                }
            }

            // Initialize user-defined scripts
            if (data.scripts && data.scripts.length > 0) {
                data.scripts.forEach(script => {
                    if (script.trigger.type === 'onMount') {
                        executeCustomActions(script.actions, rootElement);
                    }
                    else if (script.trigger.type === 'onClick') {
                        const targetElement = script.trigger.selector 
                            ? rootElement.querySelector(script.trigger.selector) 
                            : rootElement;
                        
                        if (targetElement) {
                            targetElement.addEventListener('click', (event) => {
                                event.preventDefault();
                                executeCustomActions(script.actions, rootElement);
                            });
                        } else {
                            console.warn(\`Trigger selector "\${script.trigger.selector}" not found in instance \${data.instanceId}\`);
                        }
                    }
                });
            }
        });
    });
</script>
`;
}