import { Team } from './team';

export interface QuidditchTeam {
    id: number;
    pointsFor: number;
    pointsAgainst: number;
    team: Team;
}