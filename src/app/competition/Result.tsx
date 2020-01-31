import { observable, computed } from 'mobx'

export class Result {

    @observable public id: string
    @observable public time: number
    @observable public distance: number

    constructor(id: string, time?: number, distance?: number) {
        this.id = id
        this.time = time
        this.distance = distance
    }

    @computed get comparable(): Result {
        const time = (this.time) ? this.time : 9999
        const distance = (this.distance) ? this.distance : -1

        return new Result(this.id, time, distance)
    }

    @computed get display(): string {
        return (this.time === undefined) ? this.distance.toFixed(1) + " cm" : this.time.toFixed(2) + " ms"
    }

    @computed get displayTime(): string {
        if (this.time === undefined) {
            return "-"
        }
        
        if (this.time === 0) {
            return "-"
        }

        return this.time.toFixed(2) + " ms"
    }

    @computed get displayDist(): string {
        if (this.time === undefined) {
            return this.distance.toFixed(1) + " cm"
        }

        if (this.time === 0) {
            return "0 cm"
        }

        return "Complet"
    }
}