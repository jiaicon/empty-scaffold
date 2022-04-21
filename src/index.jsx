import React from 'react';
import ReactDom from 'react-dom';
import Stretch from '@/lib/Stretch';
import Drag from '@/lib/Drag';
import DragAndStretch from '@/lib/DragAndStretch';
import './global.less';

ReactDom.render(
  <DragAndStretch
    layouts={[
      {
        i: 111111111,
        x: 100,
        y: 50,
        w: 300,
        h: 300
      },
      {
        i: 2222222222,
        x: 450,
        y: 50,
        w: 300,
        h: 300
      },
      {
        i: 33333333,
        x: 300,
        y: 400,
        w: 300,
        h: 300
      }
    ]}
  />,
  document.getElementById('root')
)
