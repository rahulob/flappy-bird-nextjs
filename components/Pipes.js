import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addScore } from './features/app-slice';
import { constants, store } from './store';


export default function Pipes(props) {
  const [position, setPosition] = useState(props.position)
  const gameStarted = useSelector((state) => state.gameStarted)

  useEffect(() => {
    let timeID;
    if (gameStarted && position + constants.PIPE_WIDTH > 0) {
      if (position + constants.PIPE_WIDTH <= constants.BIRD_SIZE + constants.BIRD_OFFSET &&
        position + constants.PIPE_WIDTH >= constants.BIRD_OFFSET + constants.BIRD_SIZE - constants.PIPE_VELOCITY)
        store.dispatch(addScore())
      timeID = setInterval(() => {
        setPosition(position => position - constants.PIPE_VELOCITY)
      }, 30)
    }
    else setPosition(props.position)
    return () => clearInterval(timeID)
  }, [gameStarted, position])

  return (
    <>
      <Pipe
        top={0}
        position={position}
        height={props.height} />

      <Pipe
        top={constants.PIPE_GAP + props.height}
        position={position}
        height={props.wh - constants.PIPE_GAP - props.height} />
    </>
  )
}

const Pipe = styled.div`
position: absolute;
background-color: green;
top: ${props => props.top}px;
left: ${props => props.position}px;
height: ${props => props.height}px;
width: ${constants.PIPE_WIDTH}px;
`