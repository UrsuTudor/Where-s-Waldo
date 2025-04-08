import React from "react";

export default function TargetingBox({
  imageBounds,
  position,
  setFoundCharacters,
}) {
  async function getCharacterCoords(e, id) {
    try {
      const url = `/api/v1/show/${id}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response failed.");

      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error("Unable to retrieve character coordiantes:", error);
    }
  }

  // todo: find a better way to normalize the criteria used when deciding whether or not the user has clicked on the right spot
  function checkSelection(characterCoords) {
    const normalizedXCriteria = (imageBounds.width / 100) * 1.5;
    const normalizedYCriteria = (imageBounds.height / 100) * 1.5;

    const closeOnRightBound =
      position.x - characterCoords.x * imageBounds.width < normalizedXCriteria;
    const closeOnLeftBound =
      characterCoords.x * imageBounds.width - position.x < normalizedXCriteria;
    const closeOnBottomBound =
      position.y - characterCoords.y * imageBounds.height < normalizedYCriteria;
    const closeOnTopBound =
      characterCoords.y * imageBounds.height - position.y < normalizedYCriteria;

    if (
      closeOnRightBound &&
      closeOnLeftBound &&
      closeOnBottomBound &&
      closeOnTopBound
    ) {
      setFoundCharacters((prevFoundCharacter) => {
        if (
          prevFoundCharacter.some(
            (char) => char.character === characterCoords.character
          )
        ) {
          alert("You have already found that character!");
          return prevFoundCharacter;
        } else {
          return [...prevFoundCharacter, characterCoords];
        }
      });
    }
  }

  async function handleSelection(e, id) {
    e.preventDefault();

    const characterCoords = await getCharacterCoords(e, id);
    checkSelection(characterCoords);
  }

  return (
    <form
      className="targettingBox"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <button type="submit" onClick={(e) => handleSelection(e, 1)}>
        Waldo
      </button>
      <button type="submit" onClick={(e) => handleSelection(e, 2)}>
        Wenda
      </button>
      <button type="submit" onClick={(e) => handleSelection(e, 3)}>
        Odlaw
      </button>
      <button type="submit" onClick={(e) => handleSelection(e, 4)}>
        Wizard Whitebeard
      </button>
    </form>
  );
}
