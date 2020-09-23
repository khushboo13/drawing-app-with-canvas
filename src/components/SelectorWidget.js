import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faEraser, faHighlighter } from '@fortawesome/free-solid-svg-icons'
import './SelectorWidget.css'

function SelectorWidget({ updateDrawConfig, drawConfig }) {
  const [showEraserSizes, setShowEraserSizes] = useState(false)
  const [showPenSizes, setShowPenSizes] = useState(false)
  const [color, setColor] = useState(drawConfig.color)

  useEffect(() => {
    if (drawConfig.mode === 'eraser') {
      setShowEraserSizes(true);
      setShowPenSizes(false);
    }
    if (drawConfig.mode === 'pen') {
      setShowPenSizes(true);
      setShowEraserSizes(false);
    }
  }, [drawConfig.mode]);
  const updateSize = (e) => {
    const id = e.target.id || (e.target.firstChild && e.target.firstChild.id) || (e.target.parentElement && e.target.parentElement.id)
    console.log(id)
    const modeWithSize = id.split('-');
    if (modeWithSize[0] === 'eraser') {
      updateDrawConfig({ eraserRadius: modeWithSize[1] })
    }
    if (modeWithSize[0] === 'pen') {
      updateDrawConfig({ lineWidth: modeWithSize[1] })
    }

  }
  const updateMode = (e) => {
    const mode = e.target.id || (e.target.firstChild && e.target.firstChild.id) || (e.target.parentElement && e.target.parentElement.id)
    switch (mode) {
      case 'pen':
        setShowPenSizes(true);
        setShowEraserSizes(false);
        updateDrawConfig({ mode: 'pen', lineWidth: '3' });
        break;
      case 'eraser':
        setShowEraserSizes(true);
        setShowPenSizes(false);
        updateDrawConfig({ mode: 'eraser', eraserRadius: '1' });
        break;
      case "highlight":
        setShowPenSizes(false);
        setShowEraserSizes(false);
        updateDrawConfig({ mode: 'highlight' });
        break;
      default:
        break;
    }
  }
  return (
    <div>
      <div className='toolbarContainer'>
        <div className='items' onClick={updateMode}>
          <div name="pen" className={drawConfig.mode === "pen" ? "selected" : ""}>
            <FontAwesomeIcon id="pen" icon={faPen} />
          </div>
          <div name="eraser" className={drawConfig.mode === "eraser" ? "selected" : ""}>
            <FontAwesomeIcon id="eraser" icon={faEraser} />
          </div>
          <div name="highlight" className={drawConfig.mode === "highlight" ? "selected" : ""}>
            <FontAwesomeIcon id="highlight" icon={faHighlighter} />
          </div>
          <div style={{'padding': '10px'}}>
            <input id="color" type="color" value={drawConfig.color} onChange={(e) => updateDrawConfig({color: e.target.value})}/>
          </div>
        </div>
        {showEraserSizes ?
          <div className='toolbarSizes' >
            <div className='items' onClick={updateSize}>
              <div className={` ${drawConfig.mode === "eraser" && drawConfig.eraserRadius === "1" ? "selected" : ""}`}>
                <FontAwesomeIcon id='eraser-1' icon={faEraser}/>
              </div>
              <div className={`md ${drawConfig.mode === "eraser" && drawConfig.eraserRadius === "3" ? "selected" : ""}`}>
                <FontAwesomeIcon id='eraser-3' icon={faEraser}/>
              </div>
              <div className={`lg ${drawConfig.mode === "eraser" && drawConfig.eraserRadius === "5" ? "selected" : ""}`}>
                <FontAwesomeIcon id='eraser-5' icon={faEraser}/>
              </div>
            </div>
          </div>
          : null
        }
        {showPenSizes ?
          <div className="toolbarSizes penToolbar">
            <div className='items' onClick={updateSize}>
              <div className={`sm ${drawConfig.mode === "pen" && drawConfig.lineWidth == "1" ? "selected" : ""}`}>
                <FontAwesomeIcon id="pen-1" icon={faPen} />
              </div>
              <div  className={`md ${drawConfig.mode === "pen" && drawConfig.lineWidth == "4" ? "selected" : ""}`}>
                <FontAwesomeIcon id="pen-4" icon={faPen} />
              </div>
              <div  className={`lg ${drawConfig.mode === "pen" && drawConfig.lineWidth == "7" ? "selected" : ""}`}>
                <FontAwesomeIcon id="pen-7" icon={faPen} />
              </div>
              <div className={`xlg ${drawConfig.mode === "pen" && drawConfig.lineWidth == "10" ? "selected" : ""}`}>
                <FontAwesomeIcon id="pen-10" icon={faPen} />
              </div>
            </div>
          </div>
          : null
        }
      </div>
    </div>
  );
}

export default SelectorWidget;
