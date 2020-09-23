import React, { useState, useEffect, useRef } from 'react';
import LightenDarkenColor from '../util';

function Canvas({ drawConfig }) {
  const canvasRef = useRef(null)
  const [isPainting, setIsPainting] = useState(false);
  let line = [];
  const [prevPos, setPrevPos] = useState({ offsetX: 0, offsetY: 0 });

  const onMouseDown=({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsPainting(true);
    setPrevPos({ offsetX, offsetY });
  }

  const onMouseMove=({ nativeEvent })=> {
    if (isPainting) {
      const { offsetX, offsetY } = nativeEvent;
      const offSetData = { offsetX, offsetY };
      const position = {
        start: { ...prevPos },
        stop: { ...offSetData },
      };
      line = line.concat(position);
      paint(prevPos, offSetData, drawConfig.color);
    }
  }

  const endPaintEvent=()=> {
    if (isPainting) {
      setIsPainting(false);
    }
  }

  const paint = (prevPos, currPos, strokeStyle) => {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    //ctx.globalAlpha = 1
    //console.log(drawConfig.mode)
    if (drawConfig.mode === 'eraser') {
      //console.log('erasing')
      ctx.globalCompositeOperation = "destination-out";
      ctx.arc(offsetX,offsetY,drawConfig.eraserRadius,0,Math.PI*2,false);
      ctx.fill();
    } else if (drawConfig.mode === 'pen') {
      ctx.globalCompositeOperation = "source-over";
      //console.log('painting', strokeStyle)
      ctx.beginPath();
      ctx.strokeStyle = strokeStyle;
      ctx.moveTo(x, y);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    } else if (drawConfig.mode === 'highlight') {
      ctx.globalCompositeOperation = "destination-over";
      //console.log('painting', strokeStyle)
      //ctx.globalAlpha = 0.5
      ctx.beginPath();
      ctx.lineWidth = 7
      const newStrokeColur = LightenDarkenColor(strokeStyle, 65);
      ctx.strokeStyle = newStrokeColur;
      ctx.moveTo(x, y);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
    setPrevPos({ offsetX, offsetY });

  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width  = window.innerWidth;
    canvas.height = 800;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.lineWidth = drawConfig.lineWidth || 5;
  }, [drawConfig.lineWidth, drawConfig.mode])

    return (
        <canvas
        ref={canvasRef}

        style={{ background: 'black', marginTop: '120px' }}
        onMouseDown={onMouseDown}
        onMouseLeave={endPaintEvent}
        onMouseUp={endPaintEvent}
        onMouseMove={onMouseMove}
        />
    );
}

export default Canvas;