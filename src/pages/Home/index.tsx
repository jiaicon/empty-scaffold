import React, { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    console.log('hello')
  }, [])
  return (
    <div className="title">HELLO</div>
  )
}

export default Index;
