import React from "react";

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
      const res = await fetch(`/api/v1/checkAnswer?`, { 
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
      throw new Error("Unable to retrieve character coordiantes:", error);
    }
  }

  function checkSelection(coordData) {
    if (
      foundCharacters.some(
        (char) => char.character === coordData.character.character
      )
    ) {
      alert(`You have already found ${coordData.character.character}!`);
      return;
    }

    if (coordData.is_valid_answer) {
      setFoundCharacters((prevFoundCharacter) => [
        ...prevFoundCharacter,
        coordData.character,
      ]);
      return;
    }

    alert(`Look more closely, ${coordData.character.character} isn't there!`);
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
