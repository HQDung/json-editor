import React from 'react';

const BooleanView = ({ value, onChange }) => {

  const emitChange = (e) => {
    onChange(e.target.parentElement.parentElement.getAttribute('data-key'), e.target.checked);
  }

  return <span>
    <input type="checkbox" checked={value} onChange={emitChange}/>
    {value.toString()}
  </span>
};

export default React.memo(BooleanView);