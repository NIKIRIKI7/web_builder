export interface Command<T = unknown> {
  type: string;
  payload: T;
}

export interface CommandHandler<T = unknown> {
  execute(_payload: T): Promise<void> | void;
}