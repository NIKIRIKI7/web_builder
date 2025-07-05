import type { FullRenderedComponent } from '@/features/Canvas/model/canvasStore';

export function generateJs(components: FullRenderedComponent[]): string {
  if (components.length === 0) {
    return '';
  }

  const componentData = components.map(c => ({
    instanceId: c.instanceId,
    componentId: c.componentDefinition.id,
    props: c.props,
    scripts: c.scripts || [],
  }));

  const executionData = JSON.stringify(componentData, null, 2);

  return `
<script type="module">
    document.addEventListener('DOMContentLoaded', () => {
        const allComponentData = ${executionData};

        const toggleMenu = (rootElement) => {
            const nav = rootElement.querySelector('.simple-header__nav');
            const burgerBtn = rootElement.querySelector('.simple-header__burger-btn');
            if (nav && burgerBtn) {
                nav.classList.toggle('simple-header__nav--is-open');
                const isExpanded = nav.classList.contains('simple-header__nav--is-open');
                burgerBtn.setAttribute('aria-expanded', isExpanded);
            }
        };

        allComponentData.forEach(data => {
            try {
                const rootElement = document.getElementById(\`wb-inst-\${data.instanceId}\`);
                if (!rootElement) {
                  console.error(\`Root element #wb-inst-\${data.instanceId} not found.\`);
                  return;
                }

                if (data.componentId === 'simple-header-v1') {
                    const burgerBtn = rootElement.querySelector('.simple-header__burger-btn');
                    const navLinks = rootElement.querySelectorAll('.simple-header__link');

                    if (burgerBtn) {
                        burgerBtn.addEventListener('click', (e) => {
                          e.stopPropagation();
                          toggleMenu(rootElement);
                        });
                    }
                    navLinks.forEach(link => {
                       link.addEventListener('click', () => {
                           const nav = rootElement.querySelector('.simple-header__nav');
                           if(nav && nav.classList.contains('simple-header__nav--is-open')) {
                               toggleMenu(rootElement);
                           }
                       })
                    });
                }

                if (data.scripts && data.scripts.length > 0) {
                    data.scripts.forEach(script => {
                        const targetElement = script.targetSelector && script.targetSelector.trim() !== ''
                            ? rootElement.querySelector(script.targetSelector)
                            : rootElement;

                        if (!targetElement) {
                           console.warn(\`Target selector "\${script.targetSelector}" not found for component #\${data.instanceId}\`);
                           return;
                        }

                        targetElement.addEventListener(script.eventName, (event) => {
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
                                new Function('api', script.code)(api);
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