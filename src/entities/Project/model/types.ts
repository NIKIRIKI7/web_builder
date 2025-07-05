export interface Project {
  id: string;
  name: string;
  createdAt: number;
  canvasState: Record<string, any>;
}