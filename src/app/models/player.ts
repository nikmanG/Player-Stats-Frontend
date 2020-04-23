import { Team } from './team';

export interface Player {
    id: number;
    uuid: string;
    name: string;
    teams: Team;
}