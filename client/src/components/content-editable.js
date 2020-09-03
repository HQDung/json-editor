import React from 'react';

const ContentEditable = ({ html, onChange }) => {

  const emitChange = (e) => {
    onChange(e.target.parentElement.getAttribute('data-key'), e.target.innerText);
  }

  return <span
    className="editable"
    onBlur={emitChange}
    contentEditable
    dangerouslySetInnerHTML={{ __html: html }} />
};

export default React.memo(ContentEditable);