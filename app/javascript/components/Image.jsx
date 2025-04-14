import "../assets/stylesheets/reset.css";
import "../assets/stylesheets/image.css";
import TargetingBox from "./TargetingBox";
import React, { useEffect, useRef, useState } from "react";
import { useInterval } from "../helpers";
import GreenMark from "./GreenMark";

export default function Image() {
  const [boxDisplay, setBoxDisplay] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const boxPosition = useRef();
  const imageBounds = useRef({});

  useEffect(() => {
    async function startTime() {
      try {
        const csrfToken = document.querySelector(
          "meta[name='csrf-token']"
        ).content;
        const res = await fetch("/api/v1/time/start_time", {
          method: "POST",
          headers: {
            "X-CSRF-Token": csrfToken,
          },
        });
        if (!res.ok) throw new Error("Network response failed.");
      } catch (error) {
        throw new Error(`The timer could not be started: ${error.message}`);
      }
    }
   
    startTime()
  }, []);

  // this method gets the bounds of the image element that will contain the targetting box and calculates the position of
  // the box based on it, taking into account possible overflows to the right or bottom of the container
  // the magic numbers are merely there for aesthethic reasons and can be edited without issues
  function getBoxPosition(e) {
    imageBounds.current = e.target.getBoundingClientRect();

    let offsetX = e.clientX - imageBounds.current.left + 15;
    let offsetY = e.clientY - imageBounds.current.top + 50;

    const isNearBottom = offsetY > imageBounds.current.height - 100;
    const isNearRight = imageBounds.current.right - offsetX < 175;

    if (isNearRight) offsetX -= 200;
    if (isNearBottom) offsetY -= 125;

    boxPosition.current = { x: offsetX, y: offsetY };
  }

  function handleClick(e) {
    getBoxPosition(e);
    setBoxDisplay(!boxDisplay);
  }

  useInterval(() => {
    setElapsedTime(elapsedTime + 1);
  }, 1000);

  return (
    <div className="gameArea">
      <h1 className="timer">Elapsed Time: {elapsedTime}</h1>
      <img className="waldoImg" src="waldo.jpg" alt="" onClick={handleClick} />
      {boxDisplay && (
        <TargetingBox
          imageBounds={imageBounds.current}
          position={boxPosition.current}
          foundCharacters={foundCharacters}
          setFoundCharacters={setFoundCharacters}
          onSubmit={() => {
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

      <a href="https://www.flaticon.com/free-icons/yes" title="yes icons">
        Tick icon created by juicy_fish - Flaticon
      </a>
    </div>
  );
}
