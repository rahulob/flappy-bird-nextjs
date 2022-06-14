import React, { useState } from 'react'
import styled from 'styled-components'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addScore, gameOver, setPipePosition } from './features/app-slice';
import { constants, store } from './store';

function selectRandomHeight() {
  var max = (constants.WINDOW_HEIGHT - constants.PIPE_GAP - 50) / 50;
  var height = Math.floor(Math.random() * (max - 1 + 1) + 1) * 50
  return height
}

export default function Pipes() {
  const pipePosition = useSelector((state) => state.pipePosition)
  const birdPosition = useSelector(state => state.birdPosition)
  const gameStarted = useSelector((state) => state.gameStarted)
  const [hitSound, setHitSound] = useState(null)
  const [scoreSound, setScoreSound] = useState(null)
  const [height1, setHeight1] = useState(selectRandomHeight())

  useEffect(() => {
    setHitSound(new Audio('/sound-effects/hit.wav'))
    setScoreSound(new Audio('/sound-effects/point.wav'))
    // only run once on the first render on the client
  }, [])

  useEffect(() => {
    let timeID;
    if ((birdPosition < height1 ||
      birdPosition + constants.BIRD_SIZE > height1 + constants.PIPE_GAP) &&
      pipePosition <= constants.BIRD_OFFSET + constants.BIRD_SIZE &&
      pipePosition + constants.PIPE_WIDTH >= constants.BIRD_OFFSET + 10) // here i used 10 just to offset the image collision a little bit to visualise correctly
    {
      store.dispatch(gameOver())
      hitSound.play()
    }
    else if (gameStarted && pipePosition + constants.PIPE_WIDTH > 0) {
      if (pipePosition + constants.PIPE_WIDTH <= constants.BIRD_SIZE + constants.BIRD_OFFSET &&
        pipePosition + constants.PIPE_WIDTH >= constants.BIRD_OFFSET + constants.BIRD_SIZE - constants.PIPE_VELOCITY) {
        store.dispatch(addScore())
        scoreSound.play()
      }
      timeID = setInterval(() => {
        store.dispatch(setPipePosition(pipePosition - constants.PIPE_VELOCITY))
      }, 24)
    }
    else {
      setHeight1(selectRandomHeight())
      store.dispatch(setPipePosition(constants.WINDOW_WIDTH))
    }
    return () => clearInterval(timeID)
  }, [gameStarted, pipePosition])

  return (
    <>
      <Pipe1
        top={0}
        position={pipePosition}
        height={height1} />

      <Pipe
        top={constants.PIPE_GAP + height1}
        position={pipePosition}
        height={constants.WINDOW_HEIGHT - constants.PIPE_GAP} />
    </>
  )
}
const Pipe = styled.div.attrs(props => ({
  style: {
    top: props.top,
    left: props.position,
    height: props.height
  },
}))`
position: absolute;
background: no-repeat center/100% url('/img/pipe2.png');
background-position: top;
width: ${constants.PIPE_WIDTH}px;
`
const Pipe1 = styled(Pipe)`
background: no-repeat center/100% url('/img/pipe1.png');
background-position: bottom;
`