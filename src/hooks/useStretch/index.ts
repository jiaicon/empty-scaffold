/**
 * Created by icon on 2021/1/15
 */
import {useEffect, useState, useCallback, MouseEventHandler} from 'react';
import { BasicTarget, getTargetElement } from '@/utils/dom';

export interface Distance {
  x: number;
  y: number;
  [key: string]: any;
}

export type Target = BasicTarget<HTMLElement | Document>;
export type DragListenController = (val: Distance) => boolean;

interface IDragConfig {
  shouldUpdate?: DragListenController;
  onDragStart?: (e: Event) => void;
  onDrag?: (e: Event) => void;
  onDragEnd?: (e: Event) => void;
}

let disX = 0;
let disY = 0;
// @ts-ignore
const useStretch = (target?: Target, config: IDragConfig ={}) => {
  const { 
    shouldUpdate = (e: Event) => true,
    onDragStart,
    onDrag,
    onDragEnd
   } = config;
  const [distance, setDistance] = useState<Distance & { type?: string }>({
    x: 0,
    y: 0,
  });
  const shouldUpdatePersist = useCallback(shouldUpdate, []);

  useEffect(() => {
    const el = getTargetElement(target);
    if (!el) return;
    function updateDistance(event: MouseEvent): void {
      event.preventDefault();
      const { pageX, pageY } = event;
      const X = pageX - disX;
      const Y = pageY - disY; //计算前后坐标的差值
      disX = pageX;
      disY = pageY;
      const dis = {
        type: 'mousemove',
        x: X,
        y: Y,
      }
      setDistance(dis);
      onDrag?.(event);
    }

    const listenerMouseUp = (ev: Event) => {
      document.removeEventListener('mousemove', updateDistance);
      setDistance({ x: 0, y: 0, type: 'mouseup' })
      onDragEnd?.(ev);
    }

    function listenerMouseDown(ev: any) {
      if (!ev) return;
      const { pageX, pageY } = ev;
      disX = pageX;
      disY = pageY;
      setDistance({ x: 0, y: 0, type: 'mousedown' })
      document.addEventListener('mousemove', updateDistance);
      onDragStart?.(ev)
    }

    el.addEventListener('mousedown', listenerMouseDown);
    document.addEventListener('mouseup', listenerMouseUp);
    return () => {
      el.removeEventListener('mousedown', listenerMouseDown);
      document.removeEventListener('mouseup', listenerMouseUp);
    };
  }, [target, shouldUpdatePersist]);

  return distance;
};

export default useStretch;
