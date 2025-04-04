import React from "react"
import { Link, Outlet } from "react-router-dom"
import Leaderboard from "./Leaderboard"

export default function Home(){
  return (
    <div>
      <h1>This be home for now</h1>
      <Leaderboard/>
    </div>
  )
}
