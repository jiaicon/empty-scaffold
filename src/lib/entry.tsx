import React, { useEffect, useState } from "react";
import Background from "./Background";
import { find } from "lodash";
import { RefLine, AdsorbLine } from "refline.js";
import { listen } from "dom-helpers";
import DragCore from './core';
import ResizeCore from './resize';
import { Widget, DragGrid } from './typing';
import Line from "./Line";
import "./styles.css";

// 最大吸附距离
const distance = 4;

const adsorbLines: AdsorbLine[] = [

];

const Index: React.FC<DragGrid> = (props) => {
  const { scale = 1, onDragStart, onDrag, onDragEnd } = props;
  const [current, setCurrent] = useState<Widget | null>(null);
  const [nodes, setNodes] = useState<Widget[]>([
    {
      key: "node1",
      left: 100,
      top: 280,
      width: 158,
      height: 65,
      rotate: 0
    },
    {
      key: "node2",
      left: 200,
      top: 200,
      width: 158,
      height: 65
    },
    {
      key: "node3",
      left: 300,
      top: 80,
      width: 150,
      height: 65
    },
    {
      key: "node4",
      left: 50,
      top: 100,
      width: 150,
      height: 65
    }
  ]);

  const handleNodeMouseDown = (key: string | number, e: React.MouseEvent) => {
    const node = find(nodes, {
      key
    }) as any;

    const refline = new RefLine({
      rects: nodes,
      adsorbVLines: adsorbLines,
      adsorbHLines: adsorbLines
    });

    const updater = refline.adsorbCreator({
      current: node,
      pageX: e.pageX,
      pageY: e.pageY,
      distance,
      scale,
    });

    const un1 = listen(window as any, "mousemove", (e) => {
      // 吸附计算
      const { delta } = updater({
        pageX: e.pageX,
        pageY: e.pageY
      });

      // 增加偏移量，得到最终拖拽坐标
      node.left += delta.left;
      node.top += delta.top;

      setCurrent(node);
      setNodes([...nodes])
    });
    const un2 = listen(window as any, "mouseup", () => {
      un1();
      un2();

      setCurrent(null)
    });
  }

  const _onDragStart = (node: Widget, e: React.MouseEvent) => {
    setCurrent(node);
    onDragStart?.(nodes);
  }

  const _onDrag = (node: Widget, e: MouseEvent) => {
    // 替换node
    const _nodes = nodes.map(n => {
      if (n.key === node.key) {
        return node;
      }
      return n;
    })
    setNodes(_nodes);
    onDrag?.(_nodes);
  }

  const _onDragEnd = (node: Widget, e: MouseEvent) => {
    // setCurrent(null);
    // onDragEnd?.(nodes);
  }

  useEffect(() => {
    // setNodes(props.nodes || []);
  }, [props.nodes])

  return (
    <div className="container">
      <Background />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          transformOrigin: "left top",
          transform: `scale(${scale})`
        }}
      >
        {/* 显示自定义水平吸附线 */}
        {adsorbLines.map((line) => {
          return (
            <div
              data-type="h"
              key={line.key}
              style={{
                position: "absolute",
                left: 0,
                top: line.offset,
                right: 0,
                height: 1,
                background: "red"
              }}
            ></div>
          );
        })}
        {/* 显示自定义垂直吸附线 */}
        {adsorbLines.map((line) => {
          return (
            <div
              data-type="v"
              key={line.key}
              style={{
                position: "absolute",
                left: line.offset,
                bottom: 0,
                top: 0,
                width: 1,
                background: "red"
              }}
            ></div>
          );
        })}
        {nodes.map((node) => {
          return (
            <DragCore
              node={node}
              scale={scale}
              nodes={nodes}
              key={node.key}
              onDragStart={_onDragStart}
              onDrag={_onDrag}
              onDragEnd={_onDragEnd}
            />
          )
        })}
      </div>
      <div className="resize">
        {
          current ? (
            <ResizeCore
              node={current}
              scale={scale}
              nodes={nodes}
              onResizeStart={_onDragStart}
              onResize={_onDrag}
              onResizeEnd={_onDragEnd}
            />
          ) : null
        }
      </div>
      {/* 显示参考线 */}
      <Line nodes={nodes} scale={scale} current={current as any} />
    </div>
  )
}

export default Index;
