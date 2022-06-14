import styled from 'styled-components'
import Pipes from './Pipes'
import { startGame, setBirdPosition, resetGame } from './features/app-slice'
import { store, constants } from './store'
import { useSelector } from 'react-redux'
import Bird from './Bird'
import { useEffect, useState } from 'react'


export default function GameBox() {
  const [jumpAudio, setAudio] = useState(null)
  useEffect(() => {
    setAudio(new Audio('/sound-effects/jump.wav'))
    // only run once on the first render on the client
  }, [])
  const birdPosition = useSelector((state) => state.birdPosition)
  const score = useSelector((state) => state.score)
  const gameStarted = useSelector(state => state.gameStarted)
  const isGameOver = useSelector(state => state.isGameOver)

  function jump() {
    const JUMP = constants.JUMP
    if (isGameOver) {
      store.dispatch(resetGame())
      return
    }
    else if (!gameStarted) {
      // store.dispatch(resetGame())
      store.dispatch(startGame())
      return
    }
    else if (birdPosition - JUMP >= 0)
      store.dispatch(setBirdPosition(-JUMP))

    else store.dispatch(setBirdPosition(0))
    jumpAudio.pause();
    jumpAudio.currentTime = 0;
    jumpAudio.play()
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
background: no-repeat center/70% url('/img/gamestart.png');
text-align: center;
width: 100%;
height: 100%;
`
const GameOver = styled.div`
position: relative;
z-index: 10;
background: no-repeat center/70% url('/img/gameover.png');
text-align: center;
width: 100%;
height: 100%;
`
const Score = styled.div`
font-family: 'Gamja Flower', cursive;
color: white;
text-shadow: black 2px 2px;
position: absolute;
font-size: 3rem;
z-index:1;
right: 10%;
top: 0;
`