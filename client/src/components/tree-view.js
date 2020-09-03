import React from 'react';
import { isPrimitive, isArray } from '../utils/common';
import ContentEditable from './content-editable';
import TreeViewChildNode from './tree-view-child-node';
import BooleanView from './boolean-view';

const TreeView = ({ data, onChange, onSubmit }) => {

  const renderArray = (array) => <React.Fragment>
    <span>[{array.length}]</span>
    <div className="nested">
      {array.map((value, idx) =>
        <TreeViewChildNode key={idx} keyName={idx}>
          <span className="array-idx">{idx}</span>:&nbsp;
          {isPrimitive(value) ? renderPrimitiveValue(idx, value) :
            isArray(value) ? renderArray(value) : processData(value)}
        </TreeViewChildNode>
      )}
    </div>
  </React.Fragment>

  const renderPrimitiveValue = (key, value) => {
    const type = typeof (value);
    switch (type) {
      case 'boolean':
        return <BooleanView value={value} onChange={onChange} />;
      default:
        return <ContentEditable value={value} onChange={onChange} />;
    }
  }

  const toggle = (event) => {
    const contentNestedSelector = event.target.parentElement.querySelector(".nested");
    if (contentNestedSelector) contentNestedSelector.classList.toggle("hidden");
    event.target.classList.toggle("collapsed");
  }

  const renderNode = (clickable, name) => <React.Fragment>
    <span className={clickable ? "node" : ""} onClick={toggle}>{name}</span>:&nbsp;
    </React.Fragment>;

  const processData = (object) => {
    return <React.Fragment>
      <span>Object{`{${Object.keys(object).length}}`}</span>
      <div className="nested">
        {Object.keys(object).map((key, idx) => {
          const value = object[key];
          const isNodeClickable = !isPrimitive(value) && value !== null;
          return <TreeViewChildNode
            key={`${idx}_${key}`}
            keyName={key}>
            {renderNode(isNodeClickable, key)}
            {!isNodeClickable ? renderPrimitiveValue(key, value) :
              isArray(value) ? renderArray(value) : processData(value)
            }
          </TreeViewChildNode>
        })}
      </div>
    </React.Fragment>
  }

  return <div>
    {processData(data)}
    <button className="submit-btn" onClick={onSubmit}>Save</button>
  </div>
};

export default React.memo(TreeView);