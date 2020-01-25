import { Team } from "./Team";
import { TeamStore } from "./TeamStore";
import { Result } from "./Result";
import * as XLSX from 'xlsx';

interface ITeam {
    name: string;
}

export class UpdateService {

    public static path: string

    public static loadTeamsFromFile(store: TeamStore): void {
        const retrievedTeams: ITeam[] = UpdateService.getTeamsFromFile()

        for (const iTeam of retrievedTeams) {
            const team = new Team(iTeam.name)
            team.results = UpdateService.getResultsFromFile(iTeam)
            store.teams.push(team)
        }
    }

    public static startCompetition(store: TeamStore) {
        const retrievedTeams = UpdateService.getTeamsFromFile()
        const lastPlayedTeam = UpdateService.updateTeamResults(store.teams, retrievedTeams)
        if (lastPlayedTeam) {
            store.lastTeam = lastPlayedTeam
        }

        setTimeout(() => UpdateService.startCompetition(store), 1000);
    }

    private static getTeamsFromFile(): ITeam[] {
        const workbook = XLSX.readFile(UpdateService.path)
        const json = XLSX.utils.sheet_to_json(workbook.Sheets["teams"])
        const retrievedTeams: ITeam[] = json as ITeam[]

        return retrievedTeams
    }

    private static getResultsFromFile(iTeam: ITeam): Result[] {
        const results: Result[] = []
        for (var prop in iTeam) {
            if (prop == "name") {
                continue
            }

            // Only accept numbers!
            if (isNaN(iTeam[prop])) {
                break
            }

            const resultId: string = prop[0]
            if (!results.find((res: Result) => res.id === resultId)) {
                results.push(new Result(resultId))
            }

            if (prop.endsWith("temps")) {
                const resultTime: number = iTeam[prop]
                results.find((res: Result) => res.id === resultId).time = resultTime
                continue
            }

            if (prop.endsWith("distance")) {
                const resultDistance: number = iTeam[prop]
                results.find((res: Result) => res.id === resultId).distance = resultDistance
            }
        }
        return results
    }

    // Returns the team that just played
    private static updateTeamResults(localTeams: Team[], retrievedTeams: ITeam[]): Team {
        for (const localTeam of localTeams) {
            const retrievedTeam: ITeam = retrievedTeams.find((t: ITeam) => localTeam.name === t.name)
            const retrievedResults: Result[] = UpdateService.getResultsFromFile(retrievedTeam)

            for (const result of retrievedResults) {
                const localResultIndex = localTeam.results.findIndex(x => x.id === result.id);

                // Add new result
                if (localResultIndex === -1) {
                    localTeam.results.push(result)
                    return localTeam
                }

                // Update existing result
                if (localTeam.results[localResultIndex].time !== result.time) {
                    localTeam.results[localResultIndex].time = result.time
                    return localTeam
                }

                if (localTeam.results[localResultIndex].distance !== result.distance) {
                    localTeam.results[localResultIndex].distance = result.distance
                    return localTeam
                }
            }
        }
    }
}
