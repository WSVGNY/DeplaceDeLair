import * as React from 'react'

class Team extends React.Component<{name: string}, { distance: number, time: number }> {
  
  constructor(props : any) {
    super(props)
    this.state = { distance: 0, time: 0}
  }

  componentDidMount() {

  }

  componentWillUnmount() {
   
  }

  render() {
    return (
        <div>
            <h1>{this.props.name}</h1>
            <h2>distance: {this.state.distance} </h2>
            <h2>time: {this.state.time} </h2>
        </div>
    )
  }
}

export default Team
