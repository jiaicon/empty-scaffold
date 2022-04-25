import React, { useEffect, useState, useMemo } from "react";
import Background from "./Background";
import { cloneDeep } from "lodash";
import { AdsorbLine } from "refline.js";
import DragCore from './core';
import ResizeCore from './resize';
import { Widget, DragGrid } from './typing';
import Line from "./Line";
import "./styles.css";

const adsorbLines: AdsorbLine[] = [

];

const Index: React.FC<DragGrid> = (props) => {
  const { scale = 1, distance=4, handle, onDragStart, onDrag, onDragEnd } = props;
  const [current, setCurrent] = useState<Widget | null>(null);
  const [nodes, setNodes] = useState<Widget[]>([]);

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
    setCurrent(node);
    onDrag?.(_nodes);
  }

  const _onDragEnd = (node: Widget, e: MouseEvent) => {
    // setCurrent(null);
    onDragEnd?.(nodes);
  }

  useEffect(() => {
    setNodes(props.nodes || []);
  }, [props.nodes])
  const resizeDom = useMemo(() => {
    return current ? (
      <ResizeCore
        node={current}
        scale={scale}
        distance={distance}
        nodes={nodes}
        handle={handle}
        onResizeStart={_onDragStart}
        onResize={_onDrag}
        onResizeEnd={_onDragEnd}
      />
    ) : null
  }, [cloneDeep(current)])
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
              distance={distance}
              nodes={nodes}
              key={node.key}
              onDragStart={_onDragStart}
              onDrag={_onDrag}
              onDragEnd={_onDragEnd}
            />
          )
        })}
      </div>
      <div className="resize" style={{ pointerEvents: 'none' }}>
        {resizeDom}
      </div>
      {/* 显示参考线 */}
      <Line nodes={nodes} scale={scale} current={current as any} />
    </div>
  )
}

export default Index;
