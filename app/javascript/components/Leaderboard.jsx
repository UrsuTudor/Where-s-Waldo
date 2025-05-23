import "../assets/stylesheets/leaderboard.css";
import React, { useState, useEffect } from "react"

export default function Leaderboard(){
  const [scores, setScores] = useState([])

  useEffect(() => {
    async function getScores(){
      try{
        const res = await fetch(`/api/v1/leaderboard/scores`)
        if (!res.ok) throw new Error("Network response failed.")
  
        const data = await res.json()
        setScores(data)
      } catch(error) {
        throw new Error(`Unable to retrieve scores from the database: ${error.message}`)
      }
    }

    getScores()
  }, []
  )

  function format_time(completion_time){
    const formatted_minutes = Math.floor(completion_time / 60).toString().padStart(2, '0');
    const formatted_seconds = Math.floor(completion_time % 60).toString().padStart(2, '0')

    return `${formatted_minutes}:${formatted_seconds}`
  }

  return (
    <div className="table_container">
      <img className="backgroundImg" src="starry_sky.jpg" alt="a background image of a starry night sky" />
      <table aria-label="leaderboard table">
        <thead>
          <tr>
            <th className='colHeader' scope="col">Name</th>
            <th className="colHeader" scope="col">Completion time</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => {
            return (
              <tr key={score.id}>
                <th scope="row" className={index === 0 ? "firstRow" : null } >{score.user}</th>
                <td className={index === 0 ? "firstRow" : null} >{format_time(score.completion_time)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
