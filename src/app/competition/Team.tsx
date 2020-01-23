import { observable, computed } from 'mobx'
import { Result } from './Result'

export class Team {
    @observable public name: string
    @observable public results: Result[]
    // @observable public bestResult: Result
    @observable public completed: boolean

    constructor(name: string) {
        this.name = name
        this.results = []
        this.completed = false
    }

    @computed get hasPlayed(): boolean {
        return this.results.length === 3
    }

    @computed get bestResult(): Result {
        if (this.results.length === 0) {
            return undefined
        }

        if (this.results.length === 1) {
            return this.results[0]
        }

        let bestResult: Result = this.results[0]

        for (const result of this.results) {
            if (result.time) {
                if (result.time < bestResult.time) {
                    bestResult = result
                }
            } else {
                if (result.distance > bestResult.distance) {
                    bestResult = result
                }
            }
        }

        return bestResult
    }
}