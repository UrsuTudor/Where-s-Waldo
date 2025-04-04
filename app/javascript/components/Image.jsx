import "../assets/stylesheets/reset.css";
import "../assets/stylesheets/image.css";
import TargetingBox from "./TargetingBox";
import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "../helpers";

export default function Image() {
  const [boxDisplay, setBoxDisplay] = useState(false);
  const [mousePosition, setMousePosition] = useState({x: null, y: null})
  const [elapsedTime, setElapsedTime] = useState(0)

  function changeBoxDisplay(){
    setBoxDisplay(!boxDisplay)
  }

  function changeMousePosition(e){
    setMousePosition({x: e.clientX, y: e.clientY})
  }

  useInterval(() => {
    setElapsedTime(elapsedTime + 1)
  }, 1000)

  return (
    <div onClick={(e) => {
      changeBoxDisplay()
      changeMousePosition(e)
      }}>
      <h1>Elapsed Time: {elapsedTime}</h1>
      <img className="waldoImg" src="waldo.jpg" alt="" />
      {boxDisplay && <TargetingBox mousePosition={mousePosition}/>}
    </div>
  );
}
