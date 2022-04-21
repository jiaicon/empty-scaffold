/**
  * @Notes:
  * @Author: Icon
  * @Date: 2022/4/11
  * @Time: 14:56
  * @Interface: /src\lib\Stretch\item.tsx
*/
import React, {useRef, useEffect} from 'react';
import useStretch, { Distance } from '@/hooks/useStretch';

interface IProps {
  className?: string;
  direction: string;
  onChange?: (direction: string, distance: Distance) => void;
}
const Index: React.FC<IProps> = (props) => {
  const { className, direction, onChange } = props;
  const nodeRef = useRef(null);
  const distance = useStretch(nodeRef);

  useEffect(() => {
    onChange?.(direction, distance)
  }, [distance])
  return (
    <i
      ref={nodeRef}
      className={`dragIcon ${className} dragIcon-${direction}`}
    />
  )
}

export default Index;
