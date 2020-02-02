import { Team } from "./Team";
import { observable, computed } from "mobx"

export class TeamStore {
    @observable teams: Team[] = []
    @observable lastTeam: Team;

    constructor() { }

    @computed get nextTeam(): Team {
        if (!this.lastTeam) {
            return this.teams.find((team: Team) => !team.hasPlayed)
        }

        return this.teams.find((team: Team) => !team.completed && team.name !== this.lastTeam.name)
    }

    @computed get allLeaders(): Team[] {
        const leaders: Team[] = []
        
        for (const team of this.teams) {
            if (!team.hasPlayed) {
                continue
            }

            leaders.push(team)
        }

        leaders.sort((t1: Team, t2: Team) => {
            return t2.bestResult.puissance - t1.bestResult.puissance
        })

        return leaders
    }

    // Returns top 5 for leaderboard
    @computed get leaders(): Team[] {
        const leaders: Team[] = this.allLeaders

        if (leaders.length > 5) {
            return leaders.slice(0,5)
        }

        return leaders
    }
}

var store = new TeamStore()

export default store