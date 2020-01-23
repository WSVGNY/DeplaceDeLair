import { hot } from 'react-hot-loader/root'
import { Grid, Typography, Button } from '@material-ui/core';
import * as React from 'react'
import Box from '@material-ui/core/Box'
import Leaderboard from './leaderboard/Leaderboard'
import store from './competition/TeamStore';
import { TeamManager } from './teams/TeamManager'
import CurrentTeam from './leaderboard/CurrentTeam';
const fs = require('fs')
const csv = require('csv-parser')
const ipcRenderer = require('electron').ipcRenderer

const App = () => (
  <div>
    <Button onClick={() => TeamManager.loadTeamsFromFile(store)}>Load teams</Button>
    <Button onClick={() => TeamManager.startCompetition(store)}>Start competition</Button>

    <div
      style={{
        width: '60%',
        position: 'absolute', left: '50%',
        transform: 'translate(-50%)',
        marginTop: '2%'
      }}
    >

      <Typography align="left" component="div" variant="h1">
        <Box fontWeight="fontWeightBold" color="#000000">Déplace de l'air</Box>
      </Typography>

      <Typography align="left" component="div" variant="h3">
        <Box color="text.secondary" marginBottom={4}>Édition 2020</Box>
      </Typography>

      <Box display="flex"
        flexDirection="column">
        <Box >
          <Leaderboard store={store} />
        </Box>

        <Box display="flex"
          flexDirection="row"
          marginTop={4}>

          <Box width={2 / 3}>
            <CurrentTeam store={store} />
          </Box>

          <Box
            width={1 / 3} 
            // bgcolor='#27ae60'
            color="text.secondary"
            // boxShadow={2}
            >

            <Typography align="center" component="div" variant="h4">
              <Box color="text.secondary">Prochaine equipe</Box>
            </Typography>

            <Typography align="center" component="div" variant="h4">
              <Box color="#FFFFFF">toi</Box>
            </Typography>
          </Box>
        </Box>


      </Box>

    </div>
  </div >
)

export default hot(App)
