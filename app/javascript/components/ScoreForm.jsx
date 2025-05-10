import React from "react";
import { useState } from "react";

export default function ScoreForm({time, changeOnHomePage}) {
  const [name, setName] = useState('')
  const [nameIsFocused, setNameIsFocused] = useState(false)
  const [submitErrorMessage, setSubmitErrorMessage] = useState("")
  const [displaySubmitErrorMessage, setDisplaySubmitErrorMessage] = useState(false)

  async function postToLeaderboard(e){
    e.preventDefault()

    if(name.length < 3 || name.length > 18) {
      setSubmitErrorMessage('Your name does not meet the specified requirements.')
      setDisplaySubmitErrorMessage(true)
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
    <form className="leaderboardForm"  aria-label="form for submitting your score" onSubmit={(e) => postToLeaderboard(e)}>
      <img className="backgroundImg" src="starry_sky.jpg" alt="a background image of a starry night sky" />
      <h1 className="formMsg">Congratulations, you've found them all!</h1>
      <label>
        <h1 className="finalTime"> Your time: {time} </h1>
        <div className="inputContainer">
          <span>Name:  </span> 
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setNameIsFocused(!nameIsFocused)}
            onBlur={() => setNameIsFocused(!nameIsFocused)}
            aria-label="Name for leaderboard"
          />
        </div>
        {displaySubmitErrorMessage && <p className="validationMsg" aria-label="message displayed due to a submission error">{submitErrorMessage}</p>}
        {nameIsFocused ? (
          <>
            {displaySubmitErrorMessage ? setDisplaySubmitErrorMessage(false) : null}
            {name.length < 3 && <p className="validationMsg" data-testid={"shortNameError"}>Your name needs to have a length of at least 3 characters.</p>}
            {name.length > 18 && <p className="validationMsg" data-testid={"longNameError"}>Your name cannot have a length bigger than 18 characters.</p>}
          </>
        ) : null}
      </label>
      <button className="boardSubmit" type="submit" aria-label="submit button">Post score</button>
    </form>
  );
}
