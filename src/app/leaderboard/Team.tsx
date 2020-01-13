import { observable } from 'mobx'

class Team {
  @observable public name: string
  @observable public time: number
  @observable public distance: number

  constructor(name : string) {
    this.name = name
    this.time = 0
    this.distance = 0
  }
}

export default Team
