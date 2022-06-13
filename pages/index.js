import { Provider } from 'react-redux'
import GameBox from '../components/GameBox'
import { constants, store } from "../components/store"

export default function Home() {
  return (
    <Provider store={store}>
      <GameBox />
    </Provider>
  )
}
