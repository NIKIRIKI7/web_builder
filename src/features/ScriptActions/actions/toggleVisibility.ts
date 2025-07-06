import type { ActionDefinition } from '../model/types';

export const toggleVisibilityAction: ActionDefinition = {
  type: 'toggleVisibility',
  label: 'Toggle Visibility',
  fields: [
    { name: 'targetInstanceId', label: 'targetComponentId', type: 'number' }
  ],
  handler: `
    (context) => {
      const targetId = context.action.params?.targetInstanceId;
      if (!targetId) return;
      const targetElement = document.getElementById(\`wb-inst-\${targetId}\`);
      if (targetElement) {
        const isHidden = targetElement.style.display === 'none';
        targetElement.style.display = isHidden ? '' : 'none';
      } else {
        console.warn(\`Action "toggleVisibility": Target element with ID \${targetId} not found\`);
      }
    }
  `
};