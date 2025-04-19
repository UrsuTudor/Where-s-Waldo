import React from "react";
import { useState } from "react";

export default function ScoreForm({time, changeOnHomePage}) {
  const [name, setName] = useState('')
  const [nameIsFocused, setNameIsFocused] = useState(false)

  async function postToLeaderboard(e){
    e.preventDefault()

    if(name.length < 3 || name.length > 18) {
      alert('Your name does not meet the specified requirements.')
      return
    }

    try {
      const csrfToken = document.querySelector("meta[name='csrf-token']").content;
      const res = await fetch('/api/v1/leaderboard/add_score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ "leaderboard_post": {
          "user": name,
        }
        })
      })
      if (!res.ok) throw new Error("Network response failed.");

      const data = await res.json();
      changeOnHomePage()
      alert(data.message)
    } catch (error) {
      throw new Error(`We were unable to post your score to the leaderboard: ${error.message}`)
    }
  }

  return (
    <form onSubmit={(e) => postToLeaderboard(e)}>
      Your time: {time}
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setNameIsFocused(!nameIsFocused)}
          onBlur={() => setNameIsFocused(!nameIsFocused)}
        />
        {nameIsFocused ? (
          <>
            {name.length < 3 && <p>Your name needs to have a length of at least 3 characters.</p>}
            {name.length > 18 && <p>Your name cannot have a length bigger than 18 characters.</p>}
          </>
        ) : null}
      </label>
      <button type="submit">Post score</button>
    </form>
  );
}
