import React, { useState, useEffect } from "react";
import { stopTime } from "../helpers";
import '../assets/stylesheets/targettingBox.css'

export default function TargetingBox({
  imageBounds,
  clickCoords,
  foundCharacters,
  setFoundCharacters,
  setBoxDisplay,
  setDisplayMessage,
  setMessage
}) {
  // setting it to false until it is calculated for conditional rendering
  const [boxPosition, setBoxPosition] = useState(false)

  // calculates the position of the box based on the imageBounds, taking into account possible overflows to the right or 
  // bottom of the container
  // the magic numbers are only there for aesthethic reasons and can be edited without issues
  useEffect(() => {
    let offsetX = clickCoords.x + 15;
    let offsetY = clickCoords.y + 50;

    const isNearBottom = offsetY > imageBounds.height - 100;
    const isNearRight = imageBounds.right - offsetX < 175;

    if (isNearRight) offsetX -= 200;
    if (isNearBottom) offsetY -= 125;

    setBoxPosition({x: offsetX, y: offsetY})
  }, [])

  // sends the answer to the database and return the response
  async function sendAnswer(id) {
    try {
      const csrfToken = document.querySelector("meta[name='csrf-token']").content;

      const res = await fetch(`/api/v1/coordinates/checkAnswer`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          id,
          imageBounds,
          clickCoords
        })
      });
      if (!res.ok) throw new Error("Network response failed.");

      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(`Unable to retrieve character coordiantes: ${error.message}` );
    }
  }

  function checkSelection(playerAnswer) {
    if (playerAnswer.is_valid_answer) {
      setFoundCharacters((prevFoundCharacter) => [
        ...prevFoundCharacter,
        playerAnswer.character,
      ]);
      setDisplayMessage(false)
    } else {
      setMessage(`Look more closely, ${playerAnswer.character.character} isn't there!`)
      setDisplayMessage(true)
      return
    }

    if (playerAnswer.game_won){
      stopTime()
    }
  }

  function alreadyFound(character) {
    return foundCharacters.some((char) => char.character === character)
  }

  async function handleSelection(e, id) {
    e.preventDefault();

    const playerAnswer = await sendAnswer(id)
    checkSelection(playerAnswer);

    // this merely hides the box after submit
    setBoxDisplay();
  }

  return (
    boxPosition && 
    <form
      className="targettingBox"
      style={{
        left: boxPosition.x,
        top: boxPosition.y,
      }}
    >
      <button aria-label="waldo button" className="red" type="submit" onClick={(e) =>  handleSelection(e, 1)} disabled={alreadyFound('Waldo')
      }>
        Waldo
      </button>
      <button className="white" type="submit" onClick={(e) => handleSelection(e, 2)} disabled={alreadyFound('Wenda')}>
        Wenda
      </button>
      <button className="red" type="submit" onClick={(e) => handleSelection(e, 3)} disabled={alreadyFound('Odlaw')}>
        Odlaw
      </button>
      <button className="blue" type="submit" onClick={(e) => handleSelection(e, 4)} disabled={alreadyFound('Wizard')}>
        Wizard Whitebeard
      </button>
    </form>
  );
}
