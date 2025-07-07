// eslint-disable-next-line no-unused-vars
type EventHandler = (_payload: unknown) => void;

class EventBus {
  private listeners: Map<string, Set<EventHandler>>;

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, handler: EventHandler): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);

    return () => this.off(event, handler);
  }

  off(event: string, handler: EventHandler): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(handler);
    }
  }

  emit(event: string, payload: unknown): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(handler => {
        try {
          handler(payload);
        } catch (e) {
          console.error(`Error in event handler for "${event}":`, e);
        }
      });
    }
  }
}

export const eventBus = new EventBus();