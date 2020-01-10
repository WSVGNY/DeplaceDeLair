import { hot } from 'react-hot-loader/root'
import * as React from 'react'
import Counter from './Counter'
import Team from './Team'
import Leaderboard from './Leaderboard'

const App2 = () => (
  <div>
    <h1>Classement!</ h1>
    {/* <Team name="team one"/> */}
    <Leaderboard />
  </div>
)

export default hot(App2)
