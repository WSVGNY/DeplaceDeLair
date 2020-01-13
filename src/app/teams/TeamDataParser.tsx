import Team from "./Team";
import { TeamStore } from "./TeamStore";
const csv = require('csv-parser')
const fs = require('fs')

function parseResults(results: any): Team[] {
  const retrievedTeams: Team[] = []
  
  for(let i = 0; i < results.length; i++) {
    if (!results[i].time) {
      results[i].time = 0
    }

    if (!results[i].distance) {
      results[i].distance = 0
    }

    if (isNaN(results[i].time)) {
      continue
    }
    results[i].time = +results[i].time

    if (isNaN(results[i].distance)) {
      continue
    }
    results[i].distance = +results[i].distance

    retrievedTeams.push(new Team(results[i].team, results[i].time, results[i].distance))
  }

  return retrievedTeams
}

export default function updateTeams(store: TeamStore, results: any) {
  const retrievedTeams: Team[] = parseResults(results)

  if (!store.teams.length) {
    store.teams = retrievedTeams
    store.currentTeam = store.teams.find(team => !team.completed)
    return
  }

  retrievedTeams.forEach(retrievedTeam => {
    store.teams.forEach(team => {
      if (team.name === retrievedTeam.name) {
        
        // Update current team
        if (team.name == store.currentTeam.name){
          team.completed = true
          store.currentTeam = store.teams.find(team => !team.completed)
          return
        }

        if (team.time !== retrievedTeam.time) {
          team.time = retrievedTeam.time
        }

        if (team.distance !== retrievedTeam.distance) {
          team.distance = retrievedTeam.distance
        }
      }
    });
  });
}
