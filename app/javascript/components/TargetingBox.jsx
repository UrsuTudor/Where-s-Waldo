import React from "react";

export default function TargetingBox({ mousePosition }) {
  function selectCharacter(e) {
    e.preventDefault();
  }

  return (
    <form
      className="targettingBox"
      action="post"
      style={{
        left: mousePosition.x + 15,
        top: mousePosition.y,
      }}
    >
      <button type="submit" onClick={() => selectCharacter(e)}>
        Waldo
      </button>
      <button type="submit" onClick={() => selectCharacter(e)}>
        Wenda
      </button>
      <button type="submit" onClick={() => selectCharacter(e)}>
        Wizard Whitebeard
      </button>
      <button type="submit" onClick={() => selectCharacter(e)}>
        Odlaw
      </button>
    </form>
  );
}
