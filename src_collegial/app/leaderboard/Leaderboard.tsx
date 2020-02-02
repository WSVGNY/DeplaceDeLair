import * as React from 'react'
import FlipMove from 'react-flip-move';
import { Typography, Box, Button } from '@material-ui/core'
import { observer } from "mobx-react"
import { TeamStore } from '../competition/TeamStore'

@observer
export default class Leaderboard extends React.Component<{ store: TeamStore }, {}> {

    constructor(props: any) {
        super(props)
    }

    private header() {
        return (
            <Box
                borderRadius={5}
                bgcolor='#000000'
                color="#FFFFFF"
                boxShadow={2}
                padding={1}
                display="flex"
                flexDirection="row"
                alignItems="center">
                <Box width={1 / 6}> <Typography component={'span'}> <Box paddingLeft={2}>Position</Box></Typography></Box>
                <Box width={4 / 6}> <Typography component={'span'}> <Box>Équipe</Box></Typography></Box>
                <Box width={1 / 6}> <Typography component={'span'}><Box>Puissance</Box></Typography></Box>
            </Box>)
    }

    render() {
        if (this.props.store.teams.length === 0) {
            return (<Box></Box>)
        }

        const cells = []
        const leaders = this.props.store.leaders

        for (let i = 0; i < 5; i++) {
            const position = i + 1
            let color = "#FFFFFF"
            const height = (i === 0) ? 80 : 50

            const name = (leaders[i]) ? leaders[i].name : "-"
            const puissance = (leaders[i]) ? leaders[i].bestResult.display : "-"
            const key = (leaders[i]) ? leaders[i].name : i

            cells.push(
                <Box marginBottom={1}
                    marginTop={1}
                    borderRadius={5}
                    bgcolor={color}
                    boxShadow={2}
                    key={key}
                    height={height}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    padding={1}>
                    <Box width={1 / 6}> <Typography component={'span'}><Box paddingLeft={4} fontSize={24} fontWeight="fontWeightBold">{position}</Box></Typography></Box>
                    <Box width={4 / 6}> <Typography component={'span'}><Box fontSize={24} fontWeight="fontWeightLight">{name}</Box></Typography></Box>
                    <Box width={1 / 6}> <Typography component={'span'}><Box fontSize={24} fontWeight="fontWeightLight">{puissance}</Box></Typography></Box>
                </Box>
            )
        }

        return (
            <Box>
                {this.header()}
                <FlipMove>
                    {cells}
                </FlipMove>
            </Box>
        );
    }
}