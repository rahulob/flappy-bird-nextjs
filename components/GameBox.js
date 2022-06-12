import styled from 'styled-components'
import Pipes from './Pipes'
import { startGame, setBirdPosition } from './features/app-slice'
import { store, constants } from './store'
import { useSelector } from 'react-redux'
import Bird from './Bird'

export default function GameBox(props) {
  const birdPosition = useSelector((state) => state.birdPosition)
  const score = useSelector((state) => state.score)
  const gameStarted = useSelector(state => state.gameStarted)

  function jump() {
    const JUMP = constants.JUMP
    if (!gameStarted) store.dispatch(startGame())
    if (birdPosition - JUMP >= 0)
      // setBirdPosition(birdPosition => birdPosition - JUMP)
      store.dispatch(setBirdPosition(-JUMP))
    else store.dispatch(setBirdPosition(0))
  }
  return (
    <Box {...props} onClick={jump}>
      <Score>{score}</Score>
      <Bird height={props.height} />
      <Pipes height={200} position={props.width} wh={props.height} />
      {/* <Pipes height={200} position={props.width + 300} wh={props.height} /> */}
    </Box>
  )
}

const Box = styled.div`
user-select: none; /* supported by Chrome and Opera */
-webkit-user-select: none; /* Safari */
-khtml-user-select: none; /* Konqueror HTML */
-moz-user-select: none; /* Firefox */
-ms-user-select: none; 
overflow: hidden;
position: relative;
background-color: white;
width: ${(props) => props.width}px;
height: ${(props) => props.height}px
`
const Score = styled.div`
position: absolute;
font-size: 3rem;
z-index: 1;
top: 30px;
right: 50%;
`
const Img = styled.img`
width: ${(props) => props.width}px;
height: ${(props) => props.height}px
`