import { observable } from 'mobx'

class Team {
  @observable public name: string
  @observable public time: number
  @observable public distance: number
  @observable public completed: boolean

  constructor(name: string, time: number, distance: number) {
    this.name = name
    this.time = time
    this.distance = distance
    this.completed = false
  }
}

export default Team
