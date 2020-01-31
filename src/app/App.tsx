import * as React from 'react'
import store from './competition/TeamStore';
import Leaderboard from './leaderboard/Leaderboard'
import LastTeam from './leaderboard/LastTeam';
import NextTeam from './leaderboard/NextTeam';
import { hot } from 'react-hot-loader/root'
import { Typography, Box } from '@material-ui/core';
import { UpdateService } from './competition/UpdateService';

// Images
import polymtlLogo from './polymtl.png';
import competitionLogo from './logo.png';

// Retrieve the excel sheet path from electron app
const { ipcRenderer } = require('electron')
ipcRenderer.on('path', function (event, arg) {
    UpdateService.path = arg[0]
    UpdateService.loadTeamsFromFile(store)
    UpdateService.startCompetition(store)
});

const App = () => {
    return (
        <div style={{ width: '80%', position: 'absolute', left: '50%', transform: 'translate(-50%)', marginTop: '25px' }}>
            <Box display="flex" flexDirection="row">
                <Box width={1 / 6} >
                    <img src={competitionLogo} style={{width: '100%', right: '0', bottom: '0'}} />
                </Box>
                <Box width={4 / 6} >
                    <Typography align="center" component="div" variant="h1">
                        <Box fontWeight="fontWeightBold" color="#FFFFFF">Déplace de l'air</Box>
                    </Typography>

                    <Typography align="center" component="div" variant="h4">
                        <Box color="text.secondary" marginBottom={4}>Volet Secondaire</Box>
                    </Typography>
                </Box>
                <Box width={1 / 6} alignContent="center" >
                    <img src={polymtlLogo} style={{width: '100%', right: '0', top: '0'}} />
                </Box>
            </Box>

            <Box display="flex" flexDirection="column" marginTop={5}>
                <Box><Leaderboard store={store} /></Box>

                <Box display="flex" flexDirection="row" marginTop={5}>
                    <Box width={3 / 5} paddingRight={10}> <LastTeam store={store} /></Box>
                    <Box width={2 / 5}><NextTeam store={store} /></Box>
                </Box>
            </Box>
        </div>
    )
}

export default hot(App)
