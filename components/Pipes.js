import React from 'react'
import styled from 'styled-components'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addScore, gameOver, setPipePosition } from './features/app-slice';
import { constants, store } from './store';


export default function Pipes(props) {
  const height2 = constants.WINDOW_HEIGHT - constants.PIPE_GAP - props.height
  const pipePosition = useSelector((state) => state.pipePosition)
  const birdPosition = useSelector(state => state.birdPosition)
  const gameStarted = useSelector((state) => state.gameStarted)

  useEffect(() => {
    let timeID;
    if ((birdPosition < props.height ||
      birdPosition + constants.BIRD_SIZE > props.height + constants.PIPE_GAP) &&
      pipePosition <= constants.BIRD_OFFSET + constants.BIRD_SIZE &&
      pipePosition + constants.PIPE_WIDTH >= constants.BIRD_OFFSET + 10) // here i used 10 just to offset the image collision a little bit to visualise correctly
    {
      store.dispatch(gameOver())
    }
    else if (gameStarted && pipePosition + constants.PIPE_WIDTH > 0) {
      if (pipePosition + constants.PIPE_WIDTH <= constants.BIRD_SIZE + constants.BIRD_OFFSET &&
        pipePosition + constants.PIPE_WIDTH >= constants.BIRD_OFFSET + constants.BIRD_SIZE - constants.PIPE_VELOCITY)
        store.dispatch(addScore())

      timeID = setInterval(() => {
        store.dispatch(setPipePosition(pipePosition - constants.PIPE_VELOCITY))
      }, 24)
    }
    else store.dispatch(setPipePosition(constants.WINDOW_WIDTH))
    return () => clearInterval(timeID)
  }, [gameStarted, pipePosition])

  return (
    <>
      <Pipe1
        top={0}
        position={pipePosition}
        height={props.height} />

      <Pipe
        top={constants.PIPE_GAP + props.height}
        position={pipePosition}
        height={height2} />
    </>
  )
}

const Pipe = styled.div`
position: absolute;
background: no-repeat center/100% url('/img/pipe2.png');
background-position: top;
top: ${props => props.top}px;
left: ${props => props.position}px;
height: ${props => props.height}px;
width: ${constants.PIPE_WIDTH}px;
`
const Pipe1 = styled(Pipe)`
background: no-repeat center/100% url('/img/pipe1.png');
background-position: bottom;
`