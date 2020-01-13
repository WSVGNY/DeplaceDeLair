import * as React from 'react'
import { Typography, Box } from '@material-ui/core'
import { observer } from "mobx-react"
import Team from '../teams/Team'
import { TeamStore } from '../teams/TeamStore'
import FlipMove from 'react-flip-move';

@observer
export default class Leaderboard extends React.Component<{ store: TeamStore }, {}> {

    constructor(props: any) {
        super(props)
    }

    private retreiveLeaders(): Team[] {
        const sortedTeams = Object.assign([], this.props.store.teams);
        return sortedTeams.sort((t1, t2) => {
            if (t1.time > t2.time) {
                return 1;
            }

            if (t1.time < t2.time) {
                return -1;
            }

            return 0;
        }).slice(0, 5)
    }

    render() {
        if (this.props.store.teams.length === 0) {
            return (<h1>empty</h1>)
        }

        const cells = []
        const leaders = this.retreiveLeaders()

        for (let i = 0; i < leaders.length; i++) {
            const position = i + 1

            cells.push(
                <Box m={2}
                    key={leaders[i].name}
                    height={60}
                    bgcolor="#ecf0f1"
                    borderRadius={5}
                    display="flex"
                    flexDirection="row">
                    <Box p={1} width={1 / 6}> <Typography>{position}</Typography></Box>
                    <Box p={1} width={1 / 2}> <Typography>{leaders[i].name}</Typography></Box>
                    <Box p={1} width={1 / 6}> <Typography>{leaders[i].time}</Typography></Box>
                    <Box p={1} width={1 / 6}> <Typography>{leaders[i].distance}</Typography></Box>
                </Box>
            )
        }

        return (
            <div>
                <FlipMove>
                    {cells}
                </FlipMove>

                <Typography component="div" variant="h4">
                    <Box color="text.secondary">{this.props.store.currentTeam.name}</Box>
                </Typography>
            </div>
        );
    }
}