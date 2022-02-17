import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import Home from './pages/Home';
import './global.less';

const Index = () => {
  useEffect(() => {
    console.log('hello')
  }, [])
  return (
    <div className="title">HELLO</div>
  )
}

ReactDom.render(
  <Home />,
  document.getElementById('root')
)
