import React, { useRef, useState, useEffect } from 'react';

const TreeViewChildNode = ({ keyName, children }) => {
  const [parentKey, setParentKey] = useState('');
  const elmRef = useRef();

  useEffect(() => {
    setParentKey(getParentKey());
  }, []);

  const getParentKey = () => elmRef.current.parentElement.parentElement.getAttribute('data-key');

  const getElmKey = () => {
    if(parentKey) return `${parentKey}.${keyName}`;
    return keyName;
  }

  return <div
    ref={elmRef}
    className="child"
    data-key={getElmKey()}>
    {children}
  </div>
}

export default React.memo(TreeViewChildNode);