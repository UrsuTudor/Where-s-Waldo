import React from "react";
import { stopTime } from "../helpers";
import '../assets/stylesheets/targettingBox.css'

export default function TargetingBox({
  imageBounds,
  position,
  foundCharacters,
  setFoundCharacters,
  onSubmit,
}) {
  async function getCharacterCoords(e, id) {
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
          position
        })
      });
      if (!res.ok) throw new Error("Network response failed.");

      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(`Unable to retrieve character coordiantes: ${error.message}` );
    }
  }

  function checkSelection(coordData) {
    if (coordData.is_valid_answer) {
      setFoundCharacters((prevFoundCharacter) => [
        ...prevFoundCharacter,
        coordData.character,
      ]);
    } else {
      alert(`Look more closely, ${coordData.character.character} isn't there!`);
      return
    }

    if (coordData.game_won){
      stopTime()
      alert('Congratulations, you have found them all!')
    }
  }

  function alreadyFound(character) {
    return foundCharacters.some((char) => char.character === character)
  }

  async function handleSelection(e, id) {
    e.preventDefault();

    const coordData = await getCharacterCoords(e, id)
    checkSelection(coordData);

    // this merely hides the box after submit
    onSubmit();
  }

  return (
    <form
      className="targettingBox"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <button className="red" type="submit" onClick={(e) => handleSelection(e, 1)} disabled={alreadyFound('Waldo') }>
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
