import { setBirdPosition } from './features/app-slice'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { store, constants } from './store'


export default function Bird(props) {
  const birdPosition = useSelector((state) => state.birdPosition)
  const gameStarted = useSelector((state) => state.gameStarted)

  useEffect(() => {
    let timeId
    if (gameStarted && birdPosition < props.height - constants.BIRD_SIZE)
      timeId = setInterval(() => {
        store.dispatch(setBirdPosition(constants.GRAVITY))
      }, 24)
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
width: ${constants.BIRD_SIZE}px;
height: ${constants.BIRD_SIZE}px
`