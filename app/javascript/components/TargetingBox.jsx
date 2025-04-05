import React from "react";

export default function TargetingBox({ position }) {
  function selectCharacter(e) {
    e.preventDefault();
  }

  return (
    <form
      className="targettingBox"
      style={{
        left: position.x,
        top: position.y,
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
