import React, { Fragment } from 'react';
import DragCore from './core';
import { Widget } from './typing';
import { RefLine } from "refline.js";
import { listen } from "dom-helpers";

const direction = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
interface IProps {
  node: Widget;
  nodes: Widget[];
  scale: number;
  onResizeStart?: (node: Widget, e: React.MouseEvent) => void;
  onResize?: (node: Widget, e: MouseEvent) => void;
  onResizeEnd?: (node: Widget, e: MouseEvent) => void;
}
const Index: React.FC<IProps> = (props) => {
  const { node, nodes, scale, onResizeStart, onResize, onResizeEnd } = props;

  const handleNodeMouseDown = (dir: string, e: React.MouseEvent) => {
    const refline = new RefLine({
      rects: nodes,
    });

    const updater = refline.adsorbCreator({
      current: node,
      pageX: e.pageX,
      pageY: e.pageY,
      distance: 1,
      scale,
    });

    onResizeStart?.(node, e)

    const un1 = listen(window as any, "mousemove", (e: MouseEvent) => {
      // 吸附计算
      const { delta } = updater({
        pageX: e.pageX,
        pageY: e.pageY
      });

      let width = node.width;
      let height = node.height;
      let left = node.left;
      let top = node.top;


      console.log(dir, delta)
      if (dir.indexOf('e') !== -1) {
        width += delta.left;
      }
      if (dir.indexOf('w') !== -1) {
        width -= delta.left;
        left += delta.left;
      }
      if (dir.indexOf('n') !== -1) {
        height -= delta.top;
        top += delta.top;
      }
      if (dir.indexOf('s') !== -1) {
        height += delta.top;
      }

      // 增加偏移量，得到最终拖拽坐标
      node.width += delta.left;
      node.height += delta.top;

      onResize?.({
        ...node,
        width,
        height,
        left,
        top
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
        direction.map(item => (
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
