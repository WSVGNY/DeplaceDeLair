import { observable, computed } from 'mobx'
import { Result } from './Result'

const TRIES_COUNT: number = 3;

export class Team {
    @observable public name: string
    @observable public results: Result[]

    constructor(name: string) {
        this.name = name
        this.results = []
    }

    @computed get hasPlayed(): boolean {
        return this.results.length !== 0
    }

    @computed get completed(): boolean {
        return this.results.length === TRIES_COUNT
    }

    @computed get lastResult(): string {
        if (this.results.length === 0) {
            return "---"
        }

        return this.results[this.results.length - 1].display
        // return this.results.find((result: Result) => result.id === String(this.results.length)).display
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
            if (result.comparable.time < bestResult.comparable.time) {
                bestResult = result
            } else if (result.comparable.time === bestResult.comparable.time) {
                if (result.comparable.distance > bestResult.comparable.distance) {
                    bestResult = result
                }
            }
        }

        return bestResult
    }
}