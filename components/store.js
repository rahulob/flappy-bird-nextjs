import { configureStore } from "@reduxjs/toolkit"
import Reducer from './features/app-slice'

export const store = configureStore({
  reducer: Reducer
})

export const constants = {
  BIRD_SIZE: 50,
  GRAVITY: 5,
  BIRD_OFFSET: 175,
  PIPE_GAP: 200,
  PIPE_WIDTH: 100,
  PIPE_VELOCITY: 6,
  JUMP: 100,
  WINDOW_HEIGHT: 600,
  WINDOW_WIDTH: 400,
}