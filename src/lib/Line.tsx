import React from 'react';
import { RefLine, Rect } from "refline.js";

interface Props {
  current: Rect;
  nodes: Rect[];
  scale: number;
}
export default function Line({ nodes, current, scale }: Props) {
  if (!current) return null;

  const refline = new RefLine({
    rects: nodes,
    current
  });

  // 获取水平、垂直参考线
  const lines = refline.getAllRefLines();

  return (
    <>
      {lines.map((line, i) => {
        return line.type === "vertical" ? (
          <div
            key={i}
            className="line"
            style={{
              left: line.left * scale,
              top: line.top * scale,
              width: 1,
              height: line.size * scale,
              borderLeft: "1px dashed red"
            }}
          ></div>
        ) : (
          <div
            key={i}
            className="line"
            style={{
              left: line.left * scale,
              top: line.top * scale,
              height: 1,
              width: line.size * scale,
              borderTop: "1px dashed red"
            }}
          ></div>
        );
      })}
    </>
  );
}
