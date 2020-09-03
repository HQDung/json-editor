import React from 'react';

const CodeView = ({ data }) => {

  const isPrimitive = (value) => {
    return typeof (value) === 'string'
      || typeof (value) === 'number'
      || typeof (value) === 'boolean'
  }

  const renderArray = (array) => <React.Fragment>
    <span>[</span>
    <ul>
      {array.map((value, idx) =>
        <li key={idx}>
          {isPrimitive(value) ? renderPrimitiveValue(value) :
            isArray(value) ? renderArray(value) : processData(value)}
          {idx !== array.length - 1 ? ',' : ''}
        </li>
      )}
    </ul>
    <span>]</span>
  </React.Fragment>

  const isArray = (value) => Array.isArray(value)

  const renderPrimitiveValue = (value) => {
    const type = typeof value;
    switch (type) {
      case 'boolean':
        return value.toString();
      case 'string':
        return `"${value.toString()}"`;
      default:
        return value;
    }
  }

  const processData = (object) => {
    return object === null ? 'null' : <React.Fragment>
      <span>{`{`}</span>
      <ul>
        {Object.keys(object).map((item, idx) => {
          return <li key={`${idx}_${item}`}>"{item}":&nbsp;
          {isPrimitive(object[item]) ? renderPrimitiveValue(object[item]) :
              isArray(object[item]) ? renderArray(object[item]) : processData(object[item])
            }
            {idx !== Object.keys(object).length - 1 ? ',' : ''}
          </li>
        })}
      </ul>
      <span>{`}`}</span>
    </React.Fragment>
  }

  return <div>
    {processData(data)}
  </div>
};

export default React.memo(CodeView);