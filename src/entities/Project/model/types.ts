import type { CanvasState } from '@/entities/Canvas/model/types';

export interface Project {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  canvasState: CanvasState;
  thumbnail: string | null;
}