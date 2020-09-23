import React, {useState} from 'react';
import Canvas from './components/canvas';
import './App.css';
import SelectorWidget from './components/SelectorWidget';

function App() {
  const [drawConfig, setDrawConfig] = useState({
    color: '#EE92C2',
    lineWidth: 4,
    mode: 'pen',
    eraserRadius: 1
  })
  const updateDrawConfig = (update) => {
    setDrawConfig({...drawConfig, ...update })
  }
  return (
    <div className="App">
      <div className="main">
        <SelectorWidget updateDrawConfig={updateDrawConfig} drawConfig={drawConfig}/>
        <Canvas drawConfig={drawConfig} />
      </div>
    </div>
  );
}

export default App;
