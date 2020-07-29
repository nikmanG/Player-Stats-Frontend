import { Team } from './team';

export interface League {
    id: number;
    leagueType: string;
    name: string;
    teams: Team[];
}