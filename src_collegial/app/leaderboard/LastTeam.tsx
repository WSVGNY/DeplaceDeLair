import * as React from 'react'
import { Typography, Box, Card } from '@material-ui/core'
import { observer } from "mobx-react"
import { TeamStore } from '../competition/TeamStore'
import { Team } from '../competition/Team'
import { AnimateOnChange } from 'react-animation'

@observer
export default class LastTeam extends React.Component<{ store: TeamStore }, {}> {

    constructor(props: any) {
        super(props)
    }

    render() {
        if (this.props.store.teams.length === 0) {
            return (<Box></Box>)
        }

        const lastTeam: Team = this.props.store.lastTeam
        const lastTeamName: string = (lastTeam) ? lastTeam.name : "-"
        const lastTeamResult = (lastTeam) ? lastTeam.lastResult : "-"

        return (
            <Box>
                <Typography align="left" component="div" variant="h4">
                    <Box color="#000000"> Équipe actuelle</Box>
                </Typography>

                <Box width={1}
                    marginTop={2}
                    display="flex"
                    flexDirection="row"
                    borderRadius={5}
                    paddingTop={1}
                    paddingBottom={1}
                    bgcolor='#ffffff'
                    boxShadow={2}>

                    <Box width={2 / 3} paddingLeft={2}>
                        <AnimateOnChange
                            animationIn="bounceIn"
                            animationOut="bounceOut"
                            durationOut={500}
                        >
                            <Typography component={'span'}><Box fontSize={48} fontWeight="fontWeightLight" color="#008000">{lastTeamName}</Box></Typography>
                        </AnimateOnChange>
                    </Box>

                    <Box width={1 / 3} paddingRight={2}>
                        <AnimateOnChange
                            animationIn="bounceIn"
                            animationOut="bounceOut"
                            durationOut={500}
                        >
                            <Typography component={'span'}><Box fontSize={48} fontWeight="fontWeightLight" color="#008000">{lastTeamResult}</Box></Typography>
                        </AnimateOnChange>
                    </Box>
                </Box>
            </Box>
        );
    }
}