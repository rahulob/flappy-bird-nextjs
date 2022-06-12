import { createSlice } from '@reduxjs/toolkit'

const Slice = createSlice({
  name: 'slice',
  initialState: {
    score: 0,
    gameStarted: false,
    birdPosition: 270
  },
  reducers: {
    addScore: state => {
      state.score += 1
    },
    startGame: state => {
      state.gameStarted = true
    },
    setBirdPosition: (state, action) => {
      if (action.payload === 0) state.birdPosition = 0
      else state.birdPosition += action.payload
      // console.log(state.birdPosition);
    },
  }
})

export const { addScore, startGame, setBirdPosition } = Slice.actions
export default Slice.reducer;