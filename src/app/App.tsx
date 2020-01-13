import { hot } from 'react-hot-loader/root'
import { Grid, Typography } from '@material-ui/core';
import * as React from 'react'
import Box from '@material-ui/core/Box'
import Leaderboard from './leaderboard/Leaderboard'
import store from './teams/TeamStore';
import updateTeams from './teams/TeamDataParser'
const fs = require('fs')
const csv = require('csv-parser')

function checkForTeamUpdate() {
  const results = []
  fs.createReadStream('../teams.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      updateTeams(store, results)
    });
  setTimeout(checkForTeamUpdate, 5000);
}

setTimeout(checkForTeamUpdate);

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
      </Box>
    </Grid>
  </Box>
)

export default hot(App)
