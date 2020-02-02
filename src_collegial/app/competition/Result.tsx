import { observable, computed } from 'mobx'

export class Result {

    @observable public id: string
    @observable public puissance: number

    constructor(id: string, puissance?: number) {
        this.id = id
        this.puissance = puissance
    }

    @computed get display(): string {
        return this.puissance.toFixed(0) + " mV"
    }
}