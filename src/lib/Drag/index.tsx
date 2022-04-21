/**
  * @Notes:
  * @Author: Icon
  * @Date: 2022/4/11
  * @Time: 15:39
  * @Interface: /src\lib\Drag\index.tsx
*/
import React, {useRef, useEffect, useState} from 'react';
import useStretch from '@/hooks/useStretch';
import './_style.css';

export interface IProps {
  i: string | number;
  className?: string;
  w: number;
  h: number;
  x: number;
  y: number;
  onDragStart?: (d: any) => void;
  onDrag?: (d: any) => void;
  onDragEnd?: (d: any) => void;
  onChange?: (d: any) => void;
}

export interface Distance {
  x: number;
  y: number;
}
const Index: React.FC<IProps> = (props) => {
  const { className, x=0, y=0, w=0, h=0, onDragStart, onDrag, onDragEnd, onChange } = props;
  const nodeRef = useRef(null);
  const distance = useStretch(nodeRef);
  const [position, setPosition] = useState<Distance>({ x, y });

  useEffect(() => {
    setPosition(prevState => {
      const newPosition = {
        x: prevState.x += distance.x,
        y: prevState.y += distance.y,
      }
      if (distance?.type === 'mousedown') {
        onDragStart?.(newPosition)
      } else if(distance?.type === 'mousemove') {
        onDrag?.(newPosition)
      } else if(distance?.type === 'mouseup') {
        onDragEnd?.(newPosition)
      }
      onChange?.(newPosition)
      return newPosition;
    })
  }, [distance])

  useEffect(() => {
    setPosition({ x, y })
  }, [props])

  return (
    <div
      ref={nodeRef}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: w,
        height: h,
      }}
      className={`dragItem ${className}`}
    />
  )
}

export default Index;
