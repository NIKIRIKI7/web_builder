import type { Component } from 'vue';

interface ControlDefinition {
  type: string;
  component: Component;
}

class ControlRegistry {
  private controls = new Map<string, Component>();

  public register(control: ControlDefinition): void {
    if (this.controls.has(control.type)) {
      console.warn(`Editor control for type "${control.type}" is already registered. Overwriting.`);
    }
    this.controls.set(control.type, control.component);
  }

  public getControl(type: string): Component | undefined {
    return this.controls.get(type);
  }
}

export const controlRegistry = new ControlRegistry();