import type { ActionDefinition } from '../model/types';

export const alertAction: ActionDefinition = {
  type: 'alert',
  label: 'Show Alert',
  fields: [
    { name: 'message', label: 'alertMessage', type: 'textarea' }
  ],
  handler: `
    (context) => {
      const message = context.action.params?.message || 'Alert!';
      alert(message);
    }
  `
};