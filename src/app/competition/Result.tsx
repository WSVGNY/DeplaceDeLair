import { observable } from 'mobx'

export class Result {

    @observable public id: number
    // @observable public success: boolean
    @observable public time: number
    @observable public distance: number

    constructor(id: number, time: number, distance: number) {
        this.id = id
        this.time = time
        this.distance = distance
    }
}