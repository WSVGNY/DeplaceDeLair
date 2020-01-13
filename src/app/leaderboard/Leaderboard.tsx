import * as React from 'react'
import { Typography, Box } from '@material-ui/core';
import { observer } from "mobx-react"
import FlipMove from 'react-flip-move';

@observer
export default class Leaderboard extends React.Component<{ store }, {}> {

    constructor(props: any) {
        super(props)
    }

    render() {
        var size = 3;
        var cells = [];

        for (let i = 0; i < 5; i++) {
            const position = i + 1

            cells.push(
                <Box m
                    key={this.props.store.teams[i].name}
                    height={60}
                    bgcolor="#ecf0f1"
                    borderRadius={5}
                    display="flex"
                    flexDirection="row">
                    <Box m p={1} width={1 / 6}> <Typography>{position}</Typography></Box>
                    <Box m p={1} width={1 / 2}> <Typography>{this.props.store.teams[i].name}</Typography></Box>
                    <Box m p={1} width={1 / 6}> <Typography>{this.props.store.teams[i].time}</Typography></Box>
                    <Box m p={1} width={1 / 6}> <Typography>{this.props.store.teams[i].distance}</Typography></Box>
                </Box>
            )
        }

        return (
            <FlipMove>
                {cells}
            </FlipMove>
        );
    }
}