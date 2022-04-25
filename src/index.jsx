import React from 'react';
import ReactDom from 'react-dom';
import Entry from './lib/entry';
import './global.less';

const nodes = [
  {
    key: "node1",
    left: 100,
    top: 280,
    width: 158,
    height: 80,
    rotate: 180
  },
  {
    key: "node2",
    left: 200,
    top: 200,
    width: 158,
    height: 80
  },
  {
    key: "node3",
    left: 300,
    top: 80,
    width: 150,
    height: 80
  },
  {
    key: "node4",
    left: 50,
    top: 100,
    width: 150,
    height: 80
  }
]
ReactDom.render(
  <Entry
    nodes={nodes}
  />,
  document.getElementById('root')
)
