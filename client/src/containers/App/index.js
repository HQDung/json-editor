import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { submitData } from '../../actions/app';
import CodeView from '../../components/code-view';
import TreeView from '../../components/tree-view';

import './style.scss';

function App() {
  const [jsonStr, setJsonStr] = useState('');
  const [errorMsgHidden, setErrorMsgHidden] = useState(true);
  const [saveDataMsgHidden, setSaveDataMsgHidden] = useState(true);
  const [view, setView] = useState('code');
  const [jsonObj, setJsonObj] = useState();
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);

  useEffect(() => {
    if(appState.data){
      setSaveDataMsgHidden(false);
      setTimeout(() => setSaveDataMsgHidden(true), 1000)
    }
  }, [appState])

  const onChangeJsonStr = e => {
    const string = e.target.value.trim();
    setJsonStr(string);
    setErrorMsgHidden(validateJsonStr(string));
  }

  const validateJsonStr = string => {
    try {
      const object = JSON.parse(string);
      setJsonObj(object);
    } catch (e) {
      return false;
    }
    return true;
  }

  const toggleView = (viewType) => setView(viewType);

  const updateObject = (object, newValue, path) => {
    let stack = path.split('.');
    while (stack.length > 1) {
      object = object[stack.shift()];
    }
    object[stack.shift()] = newValue;
  }

  const handleDataChange = (key, value) => {
    let newObj = { ...jsonObj };
    updateObject(newObj, value, key);
    setJsonObj(newObj);
    setJsonStr(JSON.stringify(newObj));
  }

  const handleSubmit = () => {
    dispatch(submitData(jsonObj))
  }

  return (
    <div className="main">
      <textarea
        placeholder="Enter json string..."
        rows={10}
        onChange={onChangeJsonStr}
        value={jsonStr}></textarea>
      {!errorMsgHidden && <p className="error">Incorrect Json format</p>}
      {jsonObj && errorMsgHidden && <div>
        <div className="buttons">
          <button onClick={() => toggleView("code")} className={`button ${view === 'code' && 'selected'}`}>Code</button>
          <button onClick={() => toggleView("tree")} className={`button ${view === 'tree' && 'selected'}`}>Tree</button>
        </div>
        {view === 'code' && <CodeView data={jsonObj} />}
        {view === 'tree' && <TreeView data={jsonObj} onChange={handleDataChange} onSubmit={handleSubmit} />}
        {!saveDataMsgHidden && <p className="success">Data saved</p>}
      </div>}
    </div>
  );
}

export default App;

