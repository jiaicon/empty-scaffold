/**
  * @Notes:
  * @Author: Icon
  * @Date: 2022/4/11
  * @Time: 16:20
  * @Interface: /src\lib\Drag\core.tsx
*/
import React, { useEffect } from 'react';
import useStretch, { Target, Distance } from '@/hooks/useStretch';

export type MoveDelta = Distance;
interface IProps {
  nodeRef: Target;
  children: React.ReactElement;
  onChange: (distance: Distance) => void;
}
const Index: React.FC<IProps> = (props) => {
  const { nodeRef, children, onChange } = props;
  const distance = useStretch(nodeRef);

  useEffect(() => {
    onChange?.(distance)
  }, [distance])

  const child = React.Children.only(children);
  return children
}

export default Index;
