import React from 'react';
import ContentEditable from './content-editable';
import TreeViewChildNode from './tree-view-child-node';

const TreeView = ({ data, onChange, onSubmit }) => {

  const isPrimitive = (value) => {
    return typeof (value) === 'string'
      || typeof (value) === 'number'
      || typeof (value) === 'boolean'
  }

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

  const isArray = (value) => Array.isArray(value)

  const renderPrimitiveValue = (key, value) => {
    if (value === null) return 'null';
    const type = typeof (value);
    switch (type) {
      case 'boolean':
        return <ContentEditable html={value.toString()} onChange={onChange} />;
      default:
        return <ContentEditable html={value} onChange={onChange} />;
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