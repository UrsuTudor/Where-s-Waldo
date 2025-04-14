import React from "react"
import Leaderboard from "./Leaderboard"
import Image from "./Image"
import { useState } from "react"

export default function Home(){
  const [homePage, setHomePage] = useState(true)

  function changeHomePage(){
    setHomePage(!homePage)
  }

  return (
    
      homePage ?
      <div>
        <h1>This be home for now</h1>
        <button onClick={changeHomePage}>Play</button>
        <Leaderboard/>
      </div>
      : <Image />
  )
}
