import React from "react";

export default function GreenMark({x, y}) {
  return (
    <img
      src="yes.png"
      alt="A green tick marking that you have found one of the characters."
      style={{
        position: "absolute",
        left: x + 5,
        top: y,
        width: '30px'
      }}
    />
  );
}
