import * as React from 'react'
import Team from './Team'

class Leaderboard extends React.Component<{}, { teams: number[] }> {

    constructor(props: any) {
        super(props)
        this.state = { teams: [1, 2, 3] }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.teams.map(team => (
                        <li>
                            <div>{team}</div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Leaderboard