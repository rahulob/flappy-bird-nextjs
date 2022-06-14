import { gameOver, setBirdPosition } from './features/app-slice'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { store, constants } from './store'


export default function Bird() {
  const birdPosition = useSelector((state) => state.birdPosition)
  const gameStarted = useSelector((state) => state.gameStarted)
  const [dieAudio, setAudio] = useState(null)
  useEffect(() => {
    setAudio(new Audio('/sound-effects/die.wav'))
    // only run once on the first render on the client
  }, [])

  useEffect(() => {
    let timeId
    if (gameStarted)
      if (birdPosition < constants.WINDOW_HEIGHT)
        timeId = setInterval(() => {
          store.dispatch(setBirdPosition(constants.GRAVITY))
        }, 24)
      else {
        store.dispatch(gameOver())
        dieAudio.play()
      }
    return () => clearInterval(timeId)
  }, [gameStarted, birdPosition]);
  return (
    <BirdBox top={birdPosition} left={constants.BIRD_OFFSET} />
  )
}

const BirdBox = styled.div`
position: absolute;
top: ${(props) => props.top}px;
left: ${(props) => props.left}px;
background-color: red;
background: no-repeat center/100% url('/img/bird1.png');
width: ${constants.BIRD_SIZE}px;
height: ${constants.BIRD_SIZE}px
`