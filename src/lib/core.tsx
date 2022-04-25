import "./styles.css";
import React from "react";
import { RefLine } from "refline.js";
import { listen } from "dom-helpers";
import { Widget } from './typing';

interface IProps {
  node: Widget;
  nodes: Widget[];
  scale: number;
  distance: number,
  children?: React.ReactChild;
  className?: string;
  onDragStart?: (node: Widget, e: React.MouseEvent) => void;
  onDrag?: (node: Widget, e: MouseEvent) => void;
  onDragEnd?: (node: Widget, e: MouseEvent) => void;
}

const Index: React.FC<IProps> = (props) => {
  const { scale = 1, distance, node, nodes, children, className, onDragStart, onDrag, onDragEnd } = props;

  const handleNodeMouseDown = (key: string | number, e: React.MouseEvent) => {
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

    onDragStart?.(node, e)

    const un1 = listen(window as any, "mousemove", (e: MouseEvent) => {
      // 吸附计算
      const { delta } = updater({
        pageX: e.pageX,
        pageY: e.pageY
      });

      // 增加偏移量，得到最终拖拽坐标
      node.left += delta.left;
      node.top += delta.top;

      onDrag?.(node, e)
    });
    const un2 = listen(window as any, "mouseup", (e: MouseEvent) => {
      un1();
      un2();
      onDragEnd?.(node, e);
    });
  }

  return (
    <div
      className={`node ${className}`}
      onMouseDown={(e: React.MouseEvent) => handleNodeMouseDown(node.key, e)}
      style={{
        transform: `rotate(${node.rotate || 0}deg)`,
        left: node.left,
        top: node.top,
        width: node.width,
        height: node.height
      }}
    >
      {children && children}
    </div>
  )
}

export default Index;
