import "../assets/stylesheets/reset.css";
import "../assets/stylesheets/image.css";
import TargetingBox from "./TargetingBox";
import React, { useRef, useState } from "react";
import { useInterval } from "../helpers";

export default function Image() {
  const [boxDisplay, setBoxDisplay] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [elapsedTime, setElapsedTime] = useState(0);
  const boxPosition = useRef()

  function changeBoxDisplay() {
    setBoxDisplay(!boxDisplay);
  }

  function changeMousePosition(e) {
    setMousePosition({x: e.clientX, y: e.clientY})
  }

  // the magic numbers are merely there for aesthethic reasons and can be edited without issues
  function getBoxPosition(e){
    const rect = e.target.getBoundingClientRect()

    let offsetX = e.clientX - rect.left + 15
    let offsetY = e.clientY - rect.top + 50

    const isNearBottom = offsetY > rect.height - 100
    const isNearRight = rect.right - offsetX < 175

    if (isNearRight) offsetX -= 200
    if (isNearBottom) offsetY -= 125

    boxPosition.current = {x: offsetX, y: offsetY}
  }

  function handleClick(e){
    changeMousePosition(e)
    getBoxPosition(e)
    changeBoxDisplay()
  }

  useInterval(() => {
    setElapsedTime(elapsedTime + 1);
  }, 1000);

  return (
    <div className="gameArea">
      <h1 className="timer">Elapsed Time: {elapsedTime}</h1>
      <img
        className="waldoImg"
        src="waldo.jpg"
        alt=""
        onClick={handleClick}
      />
      {boxDisplay && <TargetingBox position={boxPosition.current} />}
    </div>
  );
}
