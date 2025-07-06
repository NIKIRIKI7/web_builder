export interface Command<T = any> {
  type: string;
  payload: T;
}

export interface CommandHandler<T = any> {
  execute(payload: T): void;
}