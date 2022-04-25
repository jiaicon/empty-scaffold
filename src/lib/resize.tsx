import React from 'react';
import { Widget } from './typing';
import { RefLine } from "refline.js";
import { listen } from "dom-helpers";

// const handle = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
export type Handle = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';
interface IProps {
  node: Widget;
  nodes: Widget[];
  scale: number;
  distance: number;
  handle?: Handle[];
  onResizeStart?: (node: Widget, e: React.MouseEvent) => void;
  onResize?: (node: Widget, e: MouseEvent) => void;
  onResizeEnd?: (node: Widget, e: MouseEvent) => void;
}
const Index: React.FC<IProps> = (props) => {
  const { node, nodes, scale, handle=['ne', 'se', 'sw', 'nw'], distance, onResizeStart, onResize, onResizeEnd } = props;

  const handleNodeMouseDown = (dir: string, e: React.MouseEvent) => {
    const refline = new RefLine({
      rects: nodes,
    });

    const updater = refline.adsorbCreator({
      current: node,
      pageX: e.pageX,
      pageY: e.pageY,
      distance,
      scale,
    });

    onResizeStart?.(node, e)
    const un1 = listen(window as any, "mousemove", (e: MouseEvent) => {
      // 吸附计算
      const { delta } = updater({
        pageX: e.pageX,
        pageY: e.pageY
      });

      if (dir.indexOf('e') !== -1) {
        node.width += delta.left;
      }
      if (dir.indexOf('w') !== -1) {
        node.width -= delta.left;
        node.left += delta.left;
      }
      if (dir.indexOf('n') !== -1) {
        node.height -= delta.top;
        node.top += delta.top;
      }
      if (dir.indexOf('s') !== -1) {
        node.height += delta.top;
      }
      if (node.width <= 0) {
        node.width = 0
      }
      if (node.height <= 0) {
        node.height = 0
      }

      onResize?.({
        ...node,
      }, e)
    });
    const un2 = listen(window as any, "mouseup", (e: MouseEvent) => {
      un1();
      un2();
      onResizeEnd?.(node, e);
    });
  }

  return (
    <div
      className='resize'
      style={{
        position: 'absolute',
        transform: `rotate(${node.rotate || 0}deg)`,
        left: node.left,
        top: node.top,
        width: node.width,
        height: node.height,
        pointerEvents: 'none'
      }}
    >
      {
        handle.map(item => (
          <div
            key={item}
            className={`dragIcon dragIcon-${item}`}
            onMouseDown={(e: React.MouseEvent) => handleNodeMouseDown(item, e)}
          />
        ))
      }
    </div>
  )
}

export default Index;
