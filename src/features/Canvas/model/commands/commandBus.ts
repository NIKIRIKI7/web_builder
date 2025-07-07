import type { Command, CommandHandler } from './types';

const handlers = new Map<string, CommandHandler>();

export function registerCommandHandler(type: string, handler: CommandHandler): void {
  if (handlers.has(type)) {
    console.warn(`Command handler for type "${type}" is already registered. Overwriting.`);
  }
  handlers.set(type, handler);
}

export function dispatchCommand<T>(command: Command<T>): void {
  const handler = handlers.get(command.type);
  if (handler) {
    try {
      void handler.execute(command.payload);
    } catch (e) {
      console.error(`Error executing command: ${command.type}`, e);
    }
  } else {
    console.warn(`No handler registered for command type: ${command.type}`);
  }
}