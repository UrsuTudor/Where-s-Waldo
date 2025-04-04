import "../assets/stylesheets/reset.css";
import "../assets/stylesheets/image.css";
import TargetingBox from "./TargetingBox";
import React, { useState } from "react";

export default function Image() {
  const [boxDisplay, setBoxDisplay] = useState(false);
  const [mousePosition, setMousePosition] = useState({x: null, y: null})

  function changeBoxDisplay(){
    setBoxDisplay(!boxDisplay)
  }

  function changeMousePosition(e){
    setMousePosition({x: e.clientX, y: e.clientY})
  }

  return (
    <div onClick={(e) => {
      changeBoxDisplay()
      changeMousePosition(e)
      }}>
      <img className="waldoImg" src="waldo.jpg" alt="" />
      {boxDisplay && <TargetingBox mousePosition={mousePosition}/>}
    </div>
  );
}
