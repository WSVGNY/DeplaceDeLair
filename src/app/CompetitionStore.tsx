import Team from "./leaderboard/Team";
import { observable } from "mobx"

class CompetitionStore {
    @observable teams: Team[] = [new Team('sebastien'), new Team('william'), new Team('simon'), new Team('js'), new Team('aslnfalf'), new Team('aslasfafnfalf')]
    // @observable teams: string[] = ['sebastian', 'william', 'simon', 'js', 'aslnfalf']

}

var store = new CompetitionStore()

export default store