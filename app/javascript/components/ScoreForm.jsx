import React from "react";
import { useState } from "react";

export default function ScoreForm({time}) {
  const [name, setName] = useState('')

  async function postToLeaderboard(){
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
      alert(data.message)
    } catch (error) {
      throw new Error(`We were unable to post your score to the leaderboard: ${error.message}`)
    }
  }

  return (
    <form onSubmit={postToLeaderboard}>
      Your time: {time}
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">Post score</button>
    </form>
  );
}
