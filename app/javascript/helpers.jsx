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

export {useInterval}
