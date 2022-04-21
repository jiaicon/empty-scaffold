/**
  * @Notes:
  * @Author: Icon
  * @Date: 2022/4/11
  * @Time: 16:01
  * @Interface: /src\lib\DragAndStretch\index.tsx
*/
import { Distance } from '@/hooks/useStretch';
import React, { useState, useEffect, useMemo } from 'react';
import Drag, { IProps as DragItemProps } from './../Drag';
import Stretch from './../Stretch';
import './_styles.less';

interface IProps {
  layouts: DragItemProps[];
}

const Index: React.FC<IProps> = (props) => {
  const [layouts, setLayouts] = useState<any[]>(props.layouts);
  const [active, setActive] = useState<DragItemProps | null>(null);


  useEffect(() => {
    setLayouts(props.layouts)
  }, [props.layouts])

  const onResize = (s: {
    w: number;
    h: number;
    x: number;
    y: number;
  }) => {
    if (!active) return;
    setLayouts((prevState) => {
      const newLayouts = prevState.map(item => {
        if (item.i === active.i) {
          return { ...active, ...s }
        }
        return item;
      })
      return newLayouts
    })
  }

  const stretchDom = useMemo(() => {
    if (!active) return null;
    return (
      <Stretch
        {...active}
        onResize={onResize}
      />
    )
  }, [active, layouts])


  const onDragStart = (layout: DragItemProps, d: Distance) => {
    setActive({ ...layout, ...d });
  }

  const onDrag = (layout: DragItemProps, d: Distance) => {
    setActive({ ...layout, ...d })
    console.log({ ...layout, ...d })
    // setLayouts((prevState) => {
    //   return prevState.map(item => {
    //     if (item.i === layout.i) {
    //       return { ...item, ...d }
    //     }
    //     return item;
    //   })
    // })
  }

  const dragDom = useMemo(() => {
    if (!layouts) {
      console.warn('<DragAndStretch /> 需要layouts作为数据源')
      return null;
    }
    return layouts.map(item => (
      <Drag
        key={item.i}
        {...item}
        onDragStart={(e) => { onDragStart(item, e) }}
        onDrag={(e) => { onDrag(item, e) }}
      />
    ))
  }, [layouts])

  return (
    <div
    >
      {dragDom}
      <div>
        {stretchDom}
      </div>
    </div>
  )
}

export default Index;
