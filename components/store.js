import { configureStore } from "@reduxjs/toolkit"
import Reducer from './features/app-slice'

export const store = configureStore({
  reducer: Reducer
})

export const constants = {
  BIRD_SIZE: 30,
  GRAVITY: 5,
  BIRD_OFFSET: 200,
  PIPE_GAP: 150,
  PIPE_WIDTH: 100,
  PIPE_VELOCITY: 6,
  JUMP: 100,
}