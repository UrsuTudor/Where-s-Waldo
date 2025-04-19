import React from "react"
import Leaderboard from "./Leaderboard"
import Image from "./Image"
import { useState } from "react"

export default function Home(){
  const [onHomePage, setOnHomePage] = useState(true)

  function changeOnHomePage(){
    setOnHomePage(!onHomePage)
  }

  return (
    
      onHomePage ?
      <div>
        <h1>This be home for now</h1>
        <button onClick={changeOnHomePage}>Play</button>
        <Leaderboard/>
      </div>
      : <Image changeOnHomePage={changeOnHomePage}/>
  )
}
