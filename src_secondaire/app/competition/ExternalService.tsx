import { Team } from "./Team";
import { TeamStore } from "./TeamStore";
import { Result } from "./Result";
import * as XLSX from 'xlsx';
const path = require('path');

interface ITeam {
    equipe: string;
}

// Excel file names
const TEAM_SHEET_NAME = "equipes"
const TEAM_COLUMN_NAME = "equipe"
const TIME_COLUMN_NAME = "temps"
const DISTANCE_COLUMN_NAME = "distance"

export class ExternalService {

    public static path: string

    public static loadTeamsFromFile(store: TeamStore): void {
        const retrievedTeams: ITeam[] = ExternalService.getTeamsFromFile()

        for (const iTeam of retrievedTeams) {
            const team = new Team(iTeam.equipe)
            team.results = ExternalService.getResultsFromFile(iTeam)
            store.teams.push(team)
        }
    }

    public static startCompetition(store: TeamStore) {
        const retrievedTeams = ExternalService.getTeamsFromFile()
        const lastPlayedTeam = ExternalService.updateTeamResults(store.teams, retrievedTeams)
        if (lastPlayedTeam) {
            store.lastTeam = lastPlayedTeam
        }

        setTimeout(() => ExternalService.startCompetition(store), 1000);
    }

    private static getTeamsFromFile(): ITeam[] {
        const workbook = XLSX.readFile(ExternalService.path)
        const json = XLSX.utils.sheet_to_json(workbook.Sheets[TEAM_SHEET_NAME])
        const retrievedTeams: ITeam[] = json as ITeam[]

        return retrievedTeams
    }

    private static getResultsFromFile(iTeam: ITeam): Result[] {
        const results: Result[] = []
        for (var prop in iTeam) {
            if (prop == TEAM_COLUMN_NAME) {
                continue
            }

            // Excel format : id_resultname
            const resultId: string = prop[0]

            // Only accept numeric values
            if (isNaN(+iTeam[prop])) {
                console.log(`Invalid value: column (${prop}) for team (${iTeam.equipe})`)

                continue
            }

            if (!results.find((res: Result) => res.id === resultId)) {
                results.push(new Result(resultId))
            }

            if (prop.endsWith(TIME_COLUMN_NAME)) {
                const resultTime: number = +iTeam[prop]
                results.find((res: Result) => res.id === resultId).time = resultTime

                continue
            }

            if (prop.endsWith(DISTANCE_COLUMN_NAME)) {
                const resultDistance: number = +iTeam[prop]
                results.find((res: Result) => res.id === resultId).distance = resultDistance
            }
        }

        return results
    }

    // Returns the team that just played
    private static updateTeamResults(localTeams: Team[], retrievedTeams: ITeam[]): Team {
        for (const localTeam of localTeams) {
            const retrievedTeam: ITeam = retrievedTeams.find((t: ITeam) => localTeam.name === t.equipe)
            const retrievedResults: Result[] = ExternalService.getResultsFromFile(retrievedTeam)

            for (const result of retrievedResults) {
                const localResultIndex = localTeam.results.findIndex(x => x.id === result.id);

                // Add new result
                if (localResultIndex === -1) {
                    localTeam.results.push(result)
                    return localTeam
                }

                // Update existing result
                let hasUpdated: boolean = false;

                if (localTeam.results[localResultIndex].time !== result.time) {
                    localTeam.results[localResultIndex].time = result.time
                }

                if (localTeam.results[localResultIndex].distance !== result.distance) {
                    localTeam.results[localResultIndex].distance = result.distance
                }

                if (hasUpdated) {
                    return localTeam
                }
            }
        }
    }

    public static exportResults(store: TeamStore): void {
        // Results output path
        const year = "" + new Date().getFullYear()
        const outputPath = ExternalService.path.slice(0, ExternalService.path.lastIndexOf(path.sep)).concat(path.sep + "deplacedelair_secondaire_resultats_" + year)

        // Results data
        const leaders: Team[] = store.allLeaders
        const data = [["Equipe", "Resultat"]]
        for (const leader of leaders) {
            data.push([leader.name, leader.bestResult.display])
        }

        // Write Excel workbook
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        const worksheetName = "resultats"
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
        XLSX.writeFile(workbook, outputPath.concat('.xlsx'));
    }
}