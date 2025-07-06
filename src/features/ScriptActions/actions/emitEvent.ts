import type { ActionDefinition } from '../model/types';

export const emitEventAction: ActionDefinition = {
  type: 'emitEvent',
  label: 'Emit Custom Event',
  fields: [
    { name: 'eventName', label: 'eventName', type: 'text' }
  ],
  handler: `
    (context) => {
      const eventName = context.action.params?.eventName;
      if (eventName) {
        context.eventBus.emit(eventName, { 
          sourceInstanceId: context.rootElement.id.replace('wb-inst-', '') 
        });
      }
    }
  `
};