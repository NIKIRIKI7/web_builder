export interface Project {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  canvasState: Record<string, any>;
}