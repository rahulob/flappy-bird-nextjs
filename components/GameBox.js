import { useState, useEffect } from 'react'
import styled from 'styled-components'


const GRAVITY = 5
const BIRD_SIZE = 40
const JUMP = 100

export default function GameBox(props) {
  const [birdPosition, setBirdPosition] = useState(100)

  // effect for adding gravity and stoping it from going under the box
  useEffect(() => {
    let timeId
    if (birdPosition < props.height - BIRD_SIZE)
      timeId = setInterval(() => {
        setBirdPosition(birdPosition => birdPosition + GRAVITY)
      }, 24)
    return () => clearInterval(timeId)
  });
  function jump() {
    if (birdPosition - JUMP >= 0)
      setBirdPosition(birdPosition => birdPosition - JUMP)
    else setBirdPosition(0)
  }
  return (
    <Box {...props} onClick={jump}>
      <Bird top={birdPosition} />
      <Obstacle top={0} position={200} height={100} />
    </Box>
  )
}

const Box = styled.div`
position: relative;
background-color: white;
width: ${(props) => props.width}px;
height: ${(props) => props.height}px
`
const Bird = styled.div`
position: absolute;
top: ${(props) => props.top}px;
background-color: red;
width: ${BIRD_SIZE}px;
height: ${BIRD_SIZE}px
`
const Obstacle = styled.div`
position: absolute;
background-color: green;
top: ${props => props.top}px;
left: ${props => props.position}px;
height: ${props => props.height}px;
width: 50px;
`

// import { useRef, useEffect } from 'react'
// import { Player, Pipe, Background } from "./classes.js"
// full logic of the game will be wriiten here
// function Canvas(props) {
//   const canvasRef = useRef(null)
//   let gameOver = false;

//   useEffect(() => {
//     const canvas = canvasRef.current
//     const c = canvas.getContext('2d')
//     canvas.height = 700
//     canvas.width = 500

//     const background = new Background(c)
//     const player = new Player(canvas)
//     const x = canvas.width, y = 300
//     const pipes = [new Pipe(canvas, x), new Pipe(canvas, x + y)]
//     // const offset = 50
//     function animate() {
//       const req = requestAnimationFrame(animate)
//       // if (gameOver) cancelAnimationFrame(req)
//       c.fillStyle = 'white'
//       c.fillRect(0, 0, canvas.width, canvas.height)
//       background.update()
//       player.update()
//       pipes.forEach((pipe) => {
//         pipe.update()
//         if (pipe.x <= player.x + player.w && pipe.x + pipe.w >= player.x)
//           if (player.y + player.h >= pipe.y2 || player.y <= pipe.y2 - pipe.gap);// Lose function here
//       })
//     }
//     animate()
//     addEventListener('keydown', ({ code }) => {
//       if (code === 'Space') {
//         if (player.y - 100 < 0) player.y = 0
//         else player.y -= 100
//         player.velocity = 1
//       }
//     })
//     addEventListener('keyup', ({ code }) => {
//       if (code === 'Space') {
//         player.velocity = 3
//       }
//       // else gameOver = true
//     })
//   }, [])

//   return <canvas ref={canvasRef} {...props} />
// }
