import * as React from 'react'
import { Typography, Box, Paper } from '@material-ui/core'
import { observer } from "mobx-react"
import { Team } from '../competition/Team'
import { TeamStore } from '../competition/TeamStore'
import FlipMove from 'react-flip-move';

@observer
export default class Leaderboard extends React.Component<{ store: TeamStore }, {}> {

    constructor(props: any) {
        super(props)
    }

    private retreiveLeaders(): Team[] {
        const leaders: Team[] = []

        for (const team of this.props.store.teams) {
            if (!team.hasPlayed) {
                continue
            }

            leaders.push(team)
        }

        leaders.sort((t1: Team, t2: Team) => {
            if (t1.bestResult.time > t2.bestResult.time) {
                return 1;
            }

            if (t1.bestResult.time < t2.bestResult.time) {
                return -1;
            }

            return 0;
        })

        if (leaders.length > 5) {
            return leaders.slice(0,5)
        }

        return leaders
    }

    private header() {
        return (
            <Box
                borderRadius={5}
                bgcolor='#4B77BE'
                color="text.secondary"
                boxShadow={2}
                padding={1}
                display="flex"
                flexDirection="row"
                alignItems="center">
                <Box width={1 / 6}> <Typography component={'span'}> <Box fontWeight="fontWeightBold" >Position</Box></Typography></Box>
                <Box width={1 / 2}> <Typography component={'span'}> <Box fontWeight="fontWeightBold" >Nom d'equipe</Box></Typography></Box>
                <Box width={1 / 6}> <Typography component={'span'}><Box fontWeight="fontWeightBold" >Temps</Box></Typography></Box>
                <Box width={1 / 6}> <Typography component={'span'}><Box fontWeight="fontWeightBold" >Distance</Box></Typography></Box>
            </Box>)
    }

    render() {
        if (this.props.store.teams.length === 0) {
            return (<Typography>Load teams.</Typography>)
        }

        const cells = []
        const leaders = this.retreiveLeaders()

        for (let i = 0; i < 5; i++) {
            const position = i + 1
            let color = "#FFFFFF"
            const height = (i === 0) ? 80 : 50
            
            const name = (leaders[i]) ? leaders[i].name : "---"
            const time = (leaders[i]) ? leaders[i].bestResult.time : "---"
            const dist = (leaders[i]) ? leaders[i].bestResult.distance : "---"

            cells.push(
                <Box marginBottom={1}
                    marginTop={1}
                    borderRadius={5}
                    bgcolor={color}
                    boxShadow={2}
                    key={i}
                    height={height}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    padding={1}>
                    <Box width={1 / 6}> <Typography component={'span'}><Box paddingRight={2} fontSize={24} fontWeight="fontWeightBold">{position}</Box></Typography></Box>
                    <Box width={1 / 2}> <Typography component={'span'}><Box fontSize={24} fontWeight="fontWeightLight">{name}</Box></Typography></Box>
                    <Box width={1 / 6}> <Typography component={'span'}><Box fontSize={24}>{time}</Box></Typography></Box>
                    <Box width={1 / 6}> <Typography component={'span'}><Box fontSize={24}>{dist}</Box></Typography></Box>
                </Box>
            )
        }

        return (
            <div>
                {this.header()}
                <FlipMove>
                    {cells}
                </FlipMove>
            </div>
        );
    }
}