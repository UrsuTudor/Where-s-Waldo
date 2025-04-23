import React from "react"
import Leaderboard from "./Leaderboard"
import Image from "./Image"
import { useState } from "react"
import '../assets/stylesheets/home.css'

export default function Home(){
  const [onHomePage, setOnHomePage] = useState(true)
  const [gameId, setGameId] = useState(0)

  function changeOnHomePage(){
    if(onHomePage){
      setGameId(prev => prev + 1)
    }
    setOnHomePage(!onHomePage)
  }

  return (
    
      onHomePage ?
      <div className="homeContainer">
        <h1 className="title">Where is Waldo?</h1>
        <h2 className="subtitle">Try to find Waldo, his friends and...his enemies(?) </h2>
        <button onClick={changeOnHomePage}>Play</button>
        <Leaderboard/>
      </div>
      : <Image key={gameId} changeOnHomePage={changeOnHomePage}/>
  )
}
