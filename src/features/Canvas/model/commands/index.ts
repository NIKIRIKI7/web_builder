import { AddComponentAtHandler } from './AddComponentAtHandler';
import { AddComponentHandler } from './AddComponentHandler';
import { AddScriptHandler } from './AddScriptHandler';
import { CloneComponentHandler } from './CloneComponentHandler';
import { CloseEditorHandler } from './CloseEditorHandler';
import { registerCommandHandler } from './commandBus';
import { DeleteComponentHandler } from './DeleteComponentHandler';
import { DeleteScriptHandler } from './DeleteScriptHandler';
import { SelectComponentHandler } from './SelectComponentHandler';
import { SetComponentOrderHandler } from './SetComponentOrderHandler';
import { UpdatePropsHandler } from './UpdatePropsHandler';
import { UpdateScriptHandler } from './UpdateScriptHandler';
import { UpdateStylesHandler } from './UpdateStylesHandler';

export function initializeCommandHandlers(): void {
  registerCommandHandler('ADD_COMPONENT', AddComponentHandler);
  registerCommandHandler('ADD_COMPONENT_AT', AddComponentAtHandler);
  registerCommandHandler('UPDATE_PROPS', UpdatePropsHandler);
  registerCommandHandler('UPDATE_STYLES', UpdateStylesHandler);
  registerCommandHandler('DELETE_COMPONENT', DeleteComponentHandler);
  registerCommandHandler('CLONE_COMPONENT', CloneComponentHandler);
  registerCommandHandler('SELECT_COMPONENT', SelectComponentHandler);
  registerCommandHandler('CLOSE_EDITOR', CloseEditorHandler);
  registerCommandHandler('ADD_SCRIPT', AddScriptHandler);
  registerCommandHandler('UPDATE_SCRIPT', UpdateScriptHandler);
  registerCommandHandler('DELETE_SCRIPT', DeleteScriptHandler);
  registerCommandHandler('SET_COMPONENT_ORDER', SetComponentOrderHandler);
}