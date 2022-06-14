import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  score: 0,
  gameStarted: false,
  isGameOver: false,
  birdPosition: 300,
  pipePosition: 500
}
const Slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    addScore: state => {
      state.score += 1
    },
    startGame: state => {
      state.gameStarted = true
    },
    gameOver: state => {
      state.gameStarted = false
      state.isGameOver = true
    },
    setBirdPosition: (state, action) => {
      if (action.payload === 0) state.birdPosition = 0
      else state.birdPosition += action.payload
      // console.log(state.birdPosition);
    },
    setPipePosition: (state, action) => {
      state.pipePosition = action.payload
      // console.log(state.birdPosition);
    },
    resetGame: state => state = initialState
  }
})

export const { addScore, startGame, setBirdPosition, gameOver, resetGame, setPipePosition } = Slice.actions
export default Slice.reducer;