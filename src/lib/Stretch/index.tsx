/**
 * Created by icon on 2021/1/5
 */
import React, { useState, useMemo, useEffect } from 'react';
import { Distance } from '@/hooks/useStretch';
import Handler from './handler';
import './styles.css';

export interface IProps {
  children?: React.ReactNode;
  className?: string;
  i: string | number;
  w: number;
  h: number;
  x: number;
  y: number;
  maxWidth?: number;
  maxHeight?: number;
  style?: any;
  onChange?: (d: {
    w: number;
    h: number;
    x: number;
    y: number;
  }) => void;
  onResizeStart?: (d: any) => void;
  onResize?: (d: any) => void;
  onResizeEnd?: (d: any) => void;
}

const direction = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

const Index: React.FC<IProps> = (props) => {
  const { className, maxWidth, maxHeight, style, onChange, onResizeStart, onResize, onResizeEnd } = props;

  const initialSize = useMemo(() => {
    return {
      width: props.w,
      height: props.h,
      left: props.x,
      top: props.y,
    }
  }, [props])

  const [boxSize, setBoxSize] = useState(initialSize);

  useEffect(() => {
    setBoxSize({
      width: props.w,
      height: props.h,
      left: props.x,
      top: props.y,
    })
  }, [props])

  const onChangeSize = (dir: string, dis: Distance) => {
    let width = boxSize.width;
    let height = boxSize.height;
    let left = boxSize.left;
    let top = boxSize.top;

    if (dir.indexOf('e') !== -1) {
      width += dis.x;
    }
    if (dir.indexOf('w') !== -1) {
      width -= dis.x;
      left += dis.x;
    }
    if (dir.indexOf('n') !== -1) {
      height -= dis.y;
      top += dis.y;
    }
    if (dir.indexOf('s') !== -1) {
      height += dis.y;
    }
    const bWidth = (maxWidth && width > maxWidth) ? maxWidth : width;
    const bHeight = (maxHeight && height > maxHeight) ? maxHeight : height;
    const state = {
      left,
      top,
      width: bWidth,
      height: bHeight,
    };
    const newState = { ...boxSize, ...state };
    
    if (dis?.type === 'mousedown') {
      onResizeStart?.(newState)
    } else if(dis?.type === 'mousemove') {
      onResize?.(newState)
    } else if(dis?.type === 'mouseup') {
      onResizeEnd?.(newState)
    }
    onChange?.({ x: newState.left, y: newState.top, w: newState.width, h: newState.height })
    setBoxSize(newState);
  }

  const BtnIcons = (
    <React.Fragment>
      {
        direction.map(item => (
          <Handler
            key={item}
            direction={item}
            onChange={onChangeSize}
            className={`dragIcon dragIcon-${item}`}
          />
        ))
      }
    </React.Fragment>
  );

  return (
    <div
      className={`__useStretch ${className}`}
      style={{
        ...style,
        position: 'absolute',
        ...boxSize,
      }}
    >
      {BtnIcons}
    </div>
  );
};

export default Index;
