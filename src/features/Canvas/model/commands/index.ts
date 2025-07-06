import { registerCommandHandler } from './commandBus';
import { AddComponentHandler } from './AddComponentHandler';
import { AddComponentAtHandler } from './AddComponentAtHandler';
import { UpdatePropsHandler } from './UpdatePropsHandler';
import { UpdateStylesHandler } from './UpdateStylesHandler';
import { DeleteComponentHandler } from './DeleteComponentHandler';
import { CloneComponentHandler } from './CloneComponentHandler';
import { SelectComponentHandler } from './SelectComponentHandler';
import { CloseEditorHandler } from './CloseEditorHandler';
import { AddScriptHandler } from './AddScriptHandler';
import { UpdateScriptHandler } from './UpdateScriptHandler';
import { DeleteScriptHandler } from './DeleteScriptHandler';
import { SetComponentOrderHandler } from './SetComponentOrderHandler';

export function initializeCommandHandlers() {
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