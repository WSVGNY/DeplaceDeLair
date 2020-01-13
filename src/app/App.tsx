import { hot } from 'react-hot-loader/root'
import * as React from 'react'
import Box from '@material-ui/core/Box'
import Leaderboard from './leaderboard/Leaderboard'
import store from './CompetitionStore';
import { Grid, Typography } from '@material-ui/core';


function doSomething() {
  console.log("1 second");
  setTimeout(doSomething, 5000);
}

setTimeout(doSomething, 5000);

const App = () => (
  <Box m={12}>
    <Grid container
      direction="column"
      alignItems="center"
      justify="center">

      <Typography component="div" variant="h2">
        <Box fontWeight="fontWeightMedium" color="text.primary">Deplace de l'air</Box>
      </Typography>

      <Typography component="div" variant="h4">
        <Box color="text.secondary">Classement</Box>
      </Typography>

      <Box width={1 / 2}
            m={8}>
        <Leaderboard store={store} />
        <button onClick={() => {
          store.teams.splice(0, 1)
          // console.log(store.teams[0].distance)
        }}>Click me!</button>
      </Box>
    </Grid>
  </Box>
)

export default hot(App)
