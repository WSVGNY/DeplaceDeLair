import { Team } from "./Team";
import { observable } from "mobx"

export class TeamStore {
    @observable teams: Team[] = []
    @observable currentTeam: Team;

    constructor() { }
}

var store = new TeamStore()

export default store