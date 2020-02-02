import * as React from 'react'
import { Typography, Box } from '@material-ui/core'
import { observer } from "mobx-react"
import { TeamStore } from '../competition/TeamStore'
import { Team } from '../competition/Team'
import { AnimateOnChange } from 'react-animation'

@observer
export default class NextTeam extends React.Component<{ store: TeamStore }, {}> {

    constructor(props: any) {
        super(props)
    }

    render() {
        if (this.props.store.teams.length === 0) {
            return (<Box></Box>)
        }

        const nextTeam: Team = this.props.store.nextTeam
        const nextTeamName: string = (nextTeam) ? nextTeam.name : "aucune"

        return (
            <Box>
                <Typography align="left" component="div" variant="h4">
                    <Box color="#000000"> Prochaine équipe</Box>
                </Typography>

                <Box width={1}
                    marginTop={2}
                    borderRadius={5}
                    paddingTop={1}
                    paddingBottom={1}
                    bgcolor='#ffffff'
                    boxShadow={2}>


                    <AnimateOnChange
                        animationIn="bounceIn"
                        animationOut="bounceOut"
                        durationOut={500}
                    >
                        <Typography component={'span'}><Box paddingLeft={2} fontSize={48} fontWeight="fontWeightLight" color="#FF8C00">{nextTeamName}</Box></Typography>

                    </AnimateOnChange>
                </Box>
            </Box>
        );
    }
}