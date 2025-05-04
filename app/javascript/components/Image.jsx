import "../assets/stylesheets/reset.css";
import "../assets/stylesheets/image.css";
import TargetingBox from "./TargetingBox";
import React, { useEffect, useRef, useState } from "react";
import { useInterval, startTime } from "../helpers";
import GreenMark from "./GreenMark";
import ScoreForm from "./ScoreForm";

export default function Image({changeOnHomePage}) {
  const [boxDisplay, setBoxDisplay] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const clickCoords = useRef({})
  const imageBounds = useRef({});

  useEffect(() => {
    startTime();
  }, []);

  function getClickCoords(e) {
    imageBounds.current = e.target.getBoundingClientRect();
    clickCoords.current = {x: e.clientX - imageBounds.current.left , y: e.clientY - imageBounds.current.top}
  }

  function handleClick(e) {
    getClickCoords(e);
    setBoxDisplay(!boxDisplay);
  }

  useInterval(
    () => { setElapsedTime((prevTime) => prevTime + 1)},
    foundCharacters.length < 4 ? 1000 : null
  );

  return (
    <div>
      <img className="backgroundImg" id="gameBackground" src="starry_sky.jpg" alt="a background image of a starry sky" />
      <div className="gameArea" aria-label="game area">
        <h1 className="timer">Elapsed Time: {elapsedTime}</h1>
        <img className={foundCharacters.length == 4 ? 'waldoImg dimmed' : 'waldoImg'}  src="waldo.jpg" alt="" onClick={handleClick} />
        {boxDisplay && (
          <TargetingBox
            imageBounds={imageBounds.current}
            clickCoords={clickCoords.current}
            foundCharacters={foundCharacters}
            setFoundCharacters={setFoundCharacters}
            setBoxDisplay={() => {
              setBoxDisplay(!boxDisplay);
            }}
          />
        )}
        {foundCharacters.map((character, i) => {
          return (
            <GreenMark
              key={i}
              x={character.x * imageBounds.current.width}
              y={character.y * imageBounds.current.height}
            />
          );
        })}

        {foundCharacters.length === 4
        && <ScoreForm time={elapsedTime} changeOnHomePage={changeOnHomePage}/>}
        <div className="linkContainer">
          <a href="https://www.flaticon.com/free-icons/yes" title="yes icons">
            Tick icon created by juicy_fish - Flaticon
          </a>
          <a href="https://www.freepik.com/free-photo/abstract-geometric-background-shapes-texture_20386203.htm#fromView=keyword&page=1&position=15&uuid=d73dfde6-4e2a-4653-b91e-fa429bf313cb&query=Black+Starry+Sky">Starry background by kues1 on Freepik</a>
          <a href="https://images7.alphacoders.com/925/thumb-1920-925903.jpg">Where's Waldo image from alphacoders</a>
        </div>
      </div>
    </div>
  );
}
