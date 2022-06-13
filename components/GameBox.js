import styled from 'styled-components'
import Pipes from './Pipes'
import { startGame, setBirdPosition, resetGame } from './features/app-slice'
import { store, constants } from './store'
import { useSelector } from 'react-redux'
import Bird from './Bird'

export default function GameBox(props) {
  const birdPosition = useSelector((state) => state.birdPosition)
  const score = useSelector((state) => state.score)
  const gameStarted = useSelector(state => state.gameStarted)
  const isGameOver = useSelector(state => state.isGameOver)

  function jump() {
    const JUMP = constants.JUMP
    if (isGameOver) store.dispatch(resetGame())
    else if (!gameStarted) {
      // store.dispatch(resetGame())
      store.dispatch(startGame())
    }
    else if (birdPosition - JUMP >= 0)
      // setBirdPosition(birdPosition => birdPosition - JUMP)
      store.dispatch(setBirdPosition(-JUMP))
    else store.dispatch(setBirdPosition(0))
  }
  return (
    <Box onClick={jump}>
      {isGameOver ? <GameOver /> : null}
      {gameStarted || isGameOver ? <Score>{score}</Score> : null}
      {true ? <Bird /> : null}
      <Pipes height={200} />
      {!gameStarted && !isGameOver ? <GameStart /> : null}
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
background: no-repeat center/100% url('/img/background-day.png');
overflow: hidden;
position: relative;
width: ${constants.WINDOW_WIDTH}px;
height: ${constants.WINDOW_HEIGHT}px
`
const GameStart = styled.div`
background: no-repeat center/50% url('/img/gamestart.png');
text-align: center;
width: 100%;
height: 100%;
`
const GameOver = styled.div`
background: no-repeat center/70% url('/img/gameover.png');
text-align: center;
width: 100%;
height: 100%;
`
const Score = styled.div`
position: absolute;
font-size: 3rem;
z-index:1;
top: 30px;
right: 50%;
`