export interface Command<T = unknown> {
  type: string;
  payload: T;
}

export interface CommandHandler<T = unknown> {
  execute(payload: T): void;
}