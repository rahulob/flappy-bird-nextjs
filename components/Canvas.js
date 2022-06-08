import React from 'react'
import { useRef, useEffect } from 'react'
import { Player, Pipe, Background } from "./classes.js"


/// full logic of the game will be wriiten here
export default function Canvas(props) {
  const canvasRef = useRef(null)
  let gameOver = false;

  useEffect(() => {
    const canvas = canvasRef.current
    const c = canvas.getContext('2d')
    canvas.height = 700
    canvas.width = 500

    const background = new Background(c)
    const player = new Player(canvas)
    const x = canvas.width, y = 300
    const pipes = [new Pipe(canvas, x), new Pipe(canvas, x + y)]
    // const offset = 50
    function animate() {
      const req = requestAnimationFrame(animate)
      // if (gameOver) cancelAnimationFrame(req)
      c.fillStyle = 'white'
      c.fillRect(0, 0, canvas.width, canvas.height)
      background.update()
      player.update()
      pipes.forEach((pipe) => {
        pipe.update()
        if (pipe.x <= player.x + player.w && pipe.x + pipe.w >= player.x)
          if (player.y + player.h >= pipe.y2 || player.y <= pipe.y2 - pipe.gap);// Lose function here
      })
    }
    animate()
    addEventListener('keydown', ({ code }) => {
      if (code === 'Space') {
        if (player.y - 100 < 0) player.y = 0
        else player.y -= 100
        player.velocity = 1
      }
    })
    addEventListener('keyup', ({ code }) => {
      if (code === 'Space') {
        player.velocity = 3
      }
      // else gameOver = true
    })
  }, [])

  return <canvas ref={canvasRef} {...props} />
}
