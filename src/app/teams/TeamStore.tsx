import Team from "./Team";
import { observable } from "mobx"

export class TeamStore {
    @observable teams: Team[] = []
    @observable currentTeam: Team = new Team('allo', 0, 0)
    // @observable nextTeam: Team

    constructor() { }
}

var store = new TeamStore()

export default store