import { hot } from 'react-hot-loader/root'
import * as React from 'react'
import Counter from './Counter'
import Team from './Team'
import Leaderboard from './Leaderboard'

const App = () => (
  <div>
    <h1>Hello, world.</ h1>
    <h1>Manager</ h1>
    {/* <Team name="team one"/> */}
  </div>
)

export default hot(App)
