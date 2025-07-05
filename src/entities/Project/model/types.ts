import type { CanvasInstanceState } from '@/features/Canvas/model/canvasStore';

export interface Project {
  id: string;
  name: string;
  createdAt: number;
  canvasState: {
    componentInstances: CanvasInstanceState[];
    selectedComponentInstanceId: number | null;
  }
}