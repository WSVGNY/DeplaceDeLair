const csv = require('csv-parser')
const fs = require('fs')
import { Team } from "../competition/Team";
import { TeamStore } from "../competition/TeamStore";
import * as XLSX from 'xlsx';
import { Result } from "../competition/Result";

interface ITeam {
    name: string;
    essai1_distance: number;
    essai1_temps: number;
    essai2_distance: number;
    essai2_temps: number;
    essai3_distance: number;
    essai3_temps: number;
}

export class TeamManager {

    public static loadTeamsFromFile(store: TeamStore): void {
        const workbook = XLSX.readFile("../teams.xlsx")
        const json = XLSX.utils.sheet_to_json(workbook.Sheets["teams"])
        const retrievedTeams: ITeam[] = json as ITeam[]

        for (const iTeam of retrievedTeams){
            store.teams.push(new Team(iTeam.name))
        }
    }

    public static getTeamsFromFile(): ITeam[] {
        const workbook = XLSX.readFile("../teams.xlsx")
        const json = XLSX.utils.sheet_to_json(workbook.Sheets["teams"])
        const retrievedTeams: ITeam[] = json as ITeam[]

        return retrievedTeams
    }

    private static updateTeamResults(localTeams: Team[], retrievedTeams: ITeam[]) {
        for (let localTeam of localTeams) {
            const nbTries: number = 3
            let retrievedTeam: ITeam = retrievedTeams.find((t: ITeam) => localTeam.name === t.name)
            let retrievedResults: Result[] = []

            if (retrievedTeam.essai1_distance || retrievedTeam.essai1_temps) {
                retrievedResults.push(new Result(1, retrievedTeam.essai1_distance, retrievedTeam.essai1_temps))
            }

            if (retrievedTeam.essai2_distance || retrievedTeam.essai2_temps) {
                retrievedResults.push(new Result(2, retrievedTeam.essai2_distance, retrievedTeam.essai2_temps))
            }

            if (retrievedTeam.essai3_distance || retrievedTeam.essai3_temps) {
                retrievedResults.push(new Result(3, retrievedTeam.essai3_distance, retrievedTeam.essai3_temps))
            }

            for (let i = 0; i < nbTries; i++) {
                if (localTeam.results[i] !== retrievedResults[i]) {
                    localTeam.results[i] = retrievedResults[i]
                }
            }
        }
    }

    public static startCompetition(store: TeamStore) {
        const retrievedTeams = TeamManager.getTeamsFromFile()
        TeamManager.updateTeamResults(store.teams, retrievedTeams)

        setTimeout(() => TeamManager.startCompetition(store), 1000);
    }


    // private static parseResults(results: any): Team[] {
    //     const retrievedTeams: Team[] = []

    //     for (const result of results) {
    //         if (!result.team) {

    //         }

    //     }

    //     for (let i = 0; i < results.length; i++) {
    //         if (!results[i].time) {
    //             results[i].time = -1
    //         }

    //         if (!results[i].distance) {
    //             results[i].distance = -1
    //         }

    //         if (isNaN(results[i].time)) {
    //             continue
    //         }
    //         results[i].time = +results[i].time

    //         if (isNaN(results[i].distance)) {
    //             continue
    //         }
    //         results[i].distance = +results[i].distance

    //         retrievedTeams.push(new Team(results[i].team, results[i].time, results[i].distance))
    //     }

    //     return retrievedTeams
    // }

    // public static loadTeams(store: TeamStore) {
    //     // Read local team CSV
    //     const results = []
    //     fs.createReadStream('../teams.csv')
    //         .pipe(csv())
    //         .on('data', (data) => results.push(data))
    //         .on('end', () => {
    //             const retrievedTeams: Team[] = TeamManager.parseResults(results)
    //             store.teams = retrievedTeams
    //             store.currentTeam = store.teams.find(team => !team.completed)
    //         });
    // }

    // public static checkForTeamUpdate(store: TeamStore) {
    //     console.log('Waiting for team ' + store.currentTeam.name + ' to play.')

    //     // Read local team CSV
    //     const results = []
    //     fs.createReadStream('../teams.csv')
    //         .pipe(csv())
    //         .on('data', (data) => results.push(data))
    //         .on('end', () => {
    //             TeamManager.updateTeams(store, results)
    //         });
    //     setTimeout(() => TeamManager.checkForTeamUpdate(store), 1000);
    // }

    

    // private static updateTeams(store: TeamStore, results: any) {
    //     let teamHasPlayed: boolean = false
    //     const retrievedTeam: Team = TeamManager.parseResults(results).find((team: Team) => team.name == store.currentTeam.name)

    //     if (store.currentTeam.time !== retrievedTeam.time) {
    //         store.currentTeam.time = retrievedTeam.time
    //         teamHasPlayed = true
    //     }

    //     if (store.currentTeam.distance !== retrievedTeam.distance) {
    //         store.currentTeam.distance = retrievedTeam.distance
    //         teamHasPlayed = true
    //     }

    //     if (teamHasPlayed) {
    //         console.log('Team ' + store.currentTeam.name + ' has played!.')
    //         store.currentTeam.completed = true
    //         store.currentTeam = store.teams.find(team => !team.completed)
    //         return
    //     }
    // }
}
