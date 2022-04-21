import React from 'react'

export const synchronizeLayoutWithChildren = (children: React.ReactElement) => {
  const layout: any[] = [];
  React.Children.forEach(children, (child: React.ReactElement<any>) => {
    if (child?.key == null) return;
    const g = child.props["data-grid"] || child.props._grid;
    layout.push(cloneLayoutItem({ ...g, i: child.key }));
  })
  console.log(layout)
  return layout;
};

export const cloneLayoutItem = (layout: any) => {
  return {
    w: layout.w,
    h: layout.h,
    x: layout.x,
    y: layout.y,
    i: layout.i,
  }
}

export const getLayoutItem = (layout: any[], key: string) => {
  for (let i = 0, len = layout.length; i < len; i++) {
    if (layout[i].i === key) return layout[i];
  }
}
