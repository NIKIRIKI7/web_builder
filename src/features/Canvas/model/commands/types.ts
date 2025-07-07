export interface Command<T = unknown> {
  type: string;
  payload: T;
}

export interface CommandHandler<T = unknown> {
  // eslint-disable-next-line no-unused-vars
  execute(_payload: T): void;
}