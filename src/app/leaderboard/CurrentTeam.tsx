import * as React from 'react'
import { Typography, Box, Card, Paper } from '@material-ui/core'
import { observer } from "mobx-react"
import { Team } from '../competition/Team'
import { TeamStore } from '../competition/TeamStore'
import FlipMove from 'react-flip-move';

@observer
export default class CurrentTeam extends React.Component<{ store: TeamStore }, {}> {

    constructor(props: any) {
        super(props)
    }

    render() {
        const currentTeamName = (this.props.store.currentTeam) ? this.props.store.currentTeam.name : ''
        // const nextTeamName = this.props.store.teams.find((team) => team.name !== currentTeamName && !team.completed)

        return (
            <Box paddingRight={4}>
                <Typography align="left" component="div" variant="h4">
                    <Box color="text.secondary" > Dernière Performance:  {currentTeamName}</Box>
                </Typography>

                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                >
                    <Box marginRight={1} width={1/3} borderRadius={5}
                        paddingTop={2}
                        paddingBottom={2}
                        bgcolor='#ffffff'
                        color="text.secondary"
                        boxShadow={2}>

                        <Typography align="center">-- : -- : --</Typography>
                    </Box>

                    <Box marginRight={1} width={1 / 3} borderRadius={5}
                        paddingTop={1}
                        paddingBottom={1}
                        bgcolor='#ffffff'
                        color="text.secondary"
                        boxShadow={2}>

                        <Typography align="center">-- : -- : --</Typography>
                    </Box>

                    <Box marginRight={1} width={1 / 3} borderRadius={5}
                        paddingTop={1}
                        paddingBottom={1}
                        bgcolor='#ffffff'
                        color="text.secondary"
                        boxShadow={2}>

                        <Typography align="center">-- : -- : --</Typography>
                    </Box>
                </Box>
            </Box>
        );
    }
}