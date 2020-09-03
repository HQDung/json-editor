import React from 'react';

const ContentEditable = ({ value, onChange }) => {

  const valueType = typeof (value);

  const emitChange = (e) => {
    const { innerText } = e.target;
    const emittedValue = valueType === 'number' ? parseFloat(innerText) : innerText;
    onChange(e.target.parentElement.getAttribute('data-key'), emittedValue);
  }

  return <span
    className="editable"
    onBlur={emitChange}
    contentEditable
    dangerouslySetInnerHTML={{ __html: value }}
    placeholder="null" />

};

export default React.memo(ContentEditable);