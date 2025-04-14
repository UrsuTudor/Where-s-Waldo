import { useEffect, useRef } from "react"

function useInterval(callback, delay){
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(()=> {
    function tick(){
      savedCallback.current()
    }

    let id = setInterval(tick, delay)

    return () => clearInterval(id)
  }, [])
}

async function startTime() {
  try {
    const csrfToken = document.querySelector(
      "meta[name='csrf-token']"
    ).content;
    const res = await fetch("/api/v1/time/start_time", {
      method: "POST",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });
    if (!res.ok) throw new Error("Network response failed.");
  } catch (error) {
    throw new Error(`The timer could not be started: ${error.message}`);
  }
}

async function stopTime (){
  try {
  const csrfToken = document.querySelector(
    "meta[name='csrf-token']"
  ).content;
  const res = await fetch("/api/v1/time/stop_time", {
    method: "POST",
    headers: {
      "X-CSRF-Token": csrfToken,
    },
  });
  if (!res.ok) throw new Error("Network response failed.");
} catch (error) {
  throw new Error(`The timer could not be stopped: ${error.message}`);
}}

export {useInterval, startTime, stopTime}
