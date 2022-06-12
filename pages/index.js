import { Provider } from 'react-redux'
import GameBox from '../components/GameBox'
import { store } from "../components/store"

export default function Home() {
  return (
    <Provider store={store}>
      <GameBox width={500} height={600} />
    </Provider>
  )
}
