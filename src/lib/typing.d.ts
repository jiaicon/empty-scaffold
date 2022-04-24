import type { AdsorbLine } from 'refline.js';

export interface Widget {
  key: string | number;
  width: number;
  height: number;
  top: number;
  left: number;
  rotate?: number;
  offset?: number;
}

export interface DragGrid {
  scale?: number;
  nodes: Widget[];
  onDragStart?: (node: Widget[]) => void;
  onDrag?: (node: Widget[]) => void;
  onDragEnd?: (node: Widget[]) => void;
}
